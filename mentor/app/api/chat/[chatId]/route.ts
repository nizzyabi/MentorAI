
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
    // GET PROMPT
    const { prompt } = await request.json();
    // GET USER
    const user = await currentUser();
    // CHECK IF USER IS PRO
    const isPro = await checkSubscription();
    
    // IF NO USER, DON'T ALLOW TO SEND MESSAGE
    if (!user || !user.firstName || !user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // CHECK IF USER IS ON A FREE TRIAL OR NOT
    const freeTrial = await checkApiLimit();

    // IF USER IS AT MAX FREE CHATS & IS NOT PRO, DON'T ALLOW TO SEND MESSAGE
    if (!freeTrial && !isPro) {
      
      return new NextResponse("API limit exceeded", { status: 403 });
    }
    // ADD IDENTIFIER TO URL TO MAKE IT CUSTOM TO THE USER
    const identifier = request.url + "-" + user.id;

    // RATE LIMIT THE USER
    const { success } = await rateLimit(identifier);

    // IF RATE LIMIT EXCEEDED, DON'T ALLOW TO SEND MESSAGE
    if (!success) {
      return new NextResponse("Rate limit exceeded", { status: 429 });
    }

    // GET MENTOR DATA & UPDATE MESSAGES WHEN PROMPTED
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
    
    // IF MENTOR NOT FOUND, DON'T ALLOW TO SEND MESSAGE
    if (!mentor) {
      return new NextResponse("Companion not found", { status: 404 });
    }

    // NAME OF MENTOR
    const name = mentor.id;

    // STORE MENTOR NAME IN FILE
    const mentor_file_name = name + ".txt";

    // GET MENTOR KEY
    const mentorKey = {
      mentorName: name!,
      userId: user.id,
      modelName: "llama2-13b",
    };

    // CREATE MEMORY MANAGER
    const memoryManager = await MemoryManager.getInstance();

    // CREATE RECORD OF MEMEORY MANAGER USING THE MENTOR KEY
    const records = await memoryManager.readLatestHistory(mentorKey);

    // IF NO RECORDS, SEED CHAT HISTORY
    if (records.length === 0) {
      await memoryManager.seedChatHistory(mentor.seed, "\n\n", mentorKey);
    }

    // DISPLAY USER PROMPT HISTORY
    await memoryManager.writeToHistory("User: " + prompt + "\n", mentorKey);

    // IF USER IS NOT PRO, INCREASE API LIMIT
    if (!isPro){
      await increaseApiLimit();
    }


    // Query Pinecone

    const recentChatHistory = await memoryManager.readLatestHistory(mentorKey);

    // Right now the preamble is included in the similarity search, but that
    // shouldn't be an issue

    // CHECK FOR SIMILAR DOCS TO SEE IF THERE IS A MATCH
    const similarDocs = await memoryManager.vectorSearch(
      recentChatHistory,
      mentor_file_name
    );

    // IF THERE IS A MATCH, GET RELEVANT HISTORY
    let relevantHistory = "";
    // IF THERE ARE NO SIMILAR DOCS, GET RELEVANT HISTORY
    if (!!similarDocs && similarDocs.length !== 0) {
      relevantHistory = similarDocs.map((doc) => doc.pageContent).join("\n");
    }
    // GET HANDLERS
    const { handlers } = LangChainStream();

    // Call Replicate for inference
    const model = new Replicate({
      model:
        "a16z-infra/llama-2-13b-chat:df7690f1994d94e96ad9d568eac121aecf50684a0b0963b25a41cc40061269e5",
      input: {
        max_length: 2048,
      },
      
      apiKey: process.env.REPLICATE_API_TOKEN,
      callbackManager: CallbackManager.fromHandlers(handlers),
    });

    // Turn verbose on for debugging
    model.verbose = true;
    
    // Get response from Replicate
    const resp = String(
      await model
        .call(
          `

            DO NOT use the ${mentor.name}: OR User: prefix
            You are ${mentor.name} and you are a mentor that gives advice & helps others. 
            
            Dont use "" or '' either unless you are quoting someone else.

            You are ${mentor.name} and you are a mentor that gives advice & helps others. maintain conversations with the user.
            

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
   
    // DISPLAY MENTOR RESPONSE HISTORY
    await memoryManager.writeToHistory("" + response.trim(), mentorKey);
    var Readable = require("stream").Readable;

    // PUSH RESPONSE 
    let s = new Readable();
    s.push(response);
    s.push(null);

    // IF RESPONSE IS NOT UNDEFINED AND LENGTH IS GREATER THAN 1, WRITE TO HISTORY
    if (response !== undefined && response.length > 1) {
      memoryManager.writeToHistory("" + response.trim(), mentorKey);
      // UPDATE MESSAGES & DATA HISTORY
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

    // RETURN RESPONSE
    return new StreamingTextResponse(s);
  } catch (error) {
    
    // CATCH ANY ERROR 
    return new NextResponse("Internal Error", { status: 500 });
  }
};