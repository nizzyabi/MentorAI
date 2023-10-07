
import { StreamingTextResponse, LangChainStream } from "ai";
import { auth, currentUser } from "@clerk/nextjs";
import { Replicate } from "langchain/llms/replicate";
import { CallbackManager } from "langchain/callbacks";
import { NextResponse } from "next/server";

import { MemoryManager } from "@/lib/memory";
import { rateLimit } from "@/lib/rate-limit";
import prismadb from "@/lib/prismadb";
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { userProModal } from "@/hooks/use-pro-modal";
import { checkSubscription } from "@/lib/subscription";
import { ProModal } from "@/components/pro-modal";

export async function POST(
  request: Request,
  { params }: { params: { chatId: string } }
) {

  
  
  try {
    
    const { prompt } = await request.json();
    const user = await currentUser();
    const isPro = await checkSubscription();
    
    if (!user || !user.firstName || !user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    
    const freeTrial = await checkApiLimit();
    if (!freeTrial && !isPro) {
      
      return new NextResponse("API limit exceeded", { status: 403 });
    }

    const identifier = request.url + "-" + user.id;
    const { success } = await rateLimit(identifier);

    if (!success) {
      return new NextResponse("Rate limit exceeded", { status: 429 });
    }

    const mentor = await prismadb.mentor.update({
      where: {
        id: params.chatId
      },
      data: {
        messages: {
          create: {
            content: prompt,
            role: "user",
            userId: user.id,
          },
        },
      }
    });

    if (!mentor) {
      return new NextResponse("Companion not found", { status: 404 });
    }


    const name = mentor.id;
    const mentor_file_name = name + ".txt";

    const mentorKey = {
      mentorName: name!,
      userId: user.id,
      modelName: "llama2-7b",
    };
    const memoryManager = await MemoryManager.getInstance();

    const records = await memoryManager.readLatestHistory(mentorKey);
    if (records.length === 0) {
      await memoryManager.seedChatHistory(mentor.seed, "\n\n", mentorKey);
    }

    await memoryManager.writeToHistory("User: " + prompt + "\n", mentorKey);

    if (!isPro){
      await increaseApiLimit();
    }


    // Query Pinecone

    const recentChatHistory = await memoryManager.readLatestHistory(mentorKey);

    // Right now the preamble is included in the similarity search, but that
    // shouldn't be an issue

    const similarDocs = await memoryManager.vectorSearch(
      recentChatHistory,
      mentor_file_name
    );

    let relevantHistory = "";
    if (!!similarDocs && similarDocs.length !== 0) {
      relevantHistory = similarDocs.map((doc) => doc.pageContent).join("\n");
    }
    const { handlers } = LangChainStream();
    // Call Replicate for inference
    const model = new Replicate({
      model:
        "meta/llama-2-7b:527827021d8756c7ab79fde0abbfaac885c37a3ed5fe23c7465093f0878d55ef",
      input: {
        max_length: 2048,
      },
      
      apiKey: process.env.REPLICATE_API_TOKEN,
      callbackManager: CallbackManager.fromHandlers(handlers),
    });

    // Turn verbose on for debugging
    model.verbose = true;
    
    const resp = String(
      await model
        .call(
          `
            You are ${mentor.name} and you are my mentor. Give advice as if you lived the life of ${mentor.name} ONLY generate sentences without prefix of who is speaking. DO NOT use ${mentor.name}: prefix nor user: prefix. dont use "" or '' either unless you are quoting someone else.

        ${mentor.instructions}

        Below are relevant details about ${mentor.name}'s past and the conversation you are in.
        ${relevantHistory}


        ${recentChatHistory}\n${mentor.name}:`
        )
        .catch(console.error)
        
    );

    // increaseApiLimit();
    const cleaned = resp.replaceAll(",", "");
    const chunks = cleaned.split("\n");
    const response = chunks[0];
   

    await memoryManager.writeToHistory("" + response.trim(), mentorKey);
    var Readable = require("stream").Readable;

    let s = new Readable();
    s.push(response);
    s.push(null);
    if (response !== undefined && response.length > 1) {
      memoryManager.writeToHistory("" + response.trim(), mentorKey);

      await prismadb.mentor.update({
        where: {
          id: params.chatId
        },
        data: {
          messages: {
            create: {
              content: response.trim(),
              role: "system",
              userId: user.id,
            },
          },
        }
      });
    }

    return new StreamingTextResponse(s);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
};