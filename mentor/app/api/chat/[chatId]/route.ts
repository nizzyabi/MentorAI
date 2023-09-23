// Imports
import { auth, currentUser } from "@clerk/nextjs";
import { StreamingTextResponse, LangChainStream } from "ai";
import { CallbackManager } from "langchain/callbacks";
import { Replicate } from "langchain/llms/replicate";
import { NextResponse } from "next/server";

import { MemoryManager } from "@/lib/memory";
import { rateLimit } from "@/lib/rate-limit";
import prismadb from "@/lib/prismadb";

export async function POST(
    // Request & assigning params to chatId
    request: Request,
    { params }: { params: { chatId: string }}
) {
    try {
        // Get prompt (user Input) & user
        const { prompt } = await request.json();
        const user = await currentUser();      
        
        // If not user, return 401
        if (!user || !user.firstName || !user.id) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        // Set identifier for rate limiting & rate limit
        const identifier = request.url + "-" + user.id;
        const { success } = await rateLimit(identifier);

        // If rate limit fails, return 429
        if (!success) {
            return new NextResponse("Too Many Requests", { status: 429 })
        }

        // When user sends a prompt, make mentor respond with a new message
        const mentor = await prismadb.mentor.update({
            where: {
                id: params.chatId,
            },
            data: {
                messages: {
                    create: {
                        content: prompt,
                        role: "user",
                        userId: user.id,
                    }
                }
            }
        });
        // if no mentor, return not found
        if (!mentor) {
            return new NextResponse("Mentor Not Found", { status: 404 })
        }

        // Get mentor name and file name
        const name = mentor.id;
        const mentor_file_name = name + ".txt";

        // get model, name, and userId in a key
        const mentorKey = {
            mentorName: name, 
            userId: user.id,
            modelName: "llama2-13b",
        };

        const memoryManager = await MemoryManager.getInstance();

        // read records from memory. If no records (no inputs by user in the create mentor page. for example:  human: elon: ), create new records
        const records = await memoryManager.readLatestHistory(mentorKey);
        if ( records.length === 0 ) {
            await memoryManager.seedChatHistory(mentor.seed, "\n\n", mentorKey);
        }

        // get the latest history from memory
        await memoryManager.writeToHistory("User: " + prompt + "\n", mentorKey);

        // fetch recent chat history
        const recentChatHistory = await memoryManager.readLatestHistory(mentorKey);

        const similarDocs = await memoryManager.vectorSearch(
            recentChatHistory,
            mentor_file_name,
        );

        // find relevant history to make Ai as good as possible
        let relevantHistory = "";

        // if there are similar docs, join them
        if(!!similarDocs && similarDocs.length !== 0) {
           relevantHistory = similarDocs.map((doc) => doc.pageContent).join("\n"); 
        }

        // handlers for the Ai
        const { handlers } = LangChainStream();

        // create model
        const model = new Replicate({
            model:
            "a16z-infra/llama-2-13b-chat:df7690f1994d94e96ad9d568eac121aecf50684a0b0963b25a41cc40061269e5",
            input: {
                max_length: 2048,
            },
            apiKey: process.env.REPLICATE_API_TOKEN,
            callbackManager: CallbackManager.fromHandlers(handlers),
        });

        // add useful logs to our console
        model.verbose = true;

        // response based of prompts given in the create mentor page.
        // I am using my own but you should change it if need be.
        const resp = String (
            await model
                .call(
                    `

                        You are a mentor to the user. Generate helpful responses to the user's prompts that is applicable. Be a good mentor with the intention of helping the user out in business, skills, and life goals, or the like. DO NOT use ${name}: prefix.

                        ${mentor.instructions}

                        Below are the relevant details about ${name}'s past and the conversation you are in. ${relevantHistory}

                        ${recentChatHistory}\n${name}:
                    `
                )
                .catch(console.error)
        );

        // Clean up the response

        const cleaned = resp.replaceAll(",", "");
        const chunks = cleaned.split("\n");
        const response = chunks[0];

        // Write response to memory manager
        await memoryManager.writeToHistory("" + response.trim(), mentorKey);
        var Readable = require("stream").Readable;

        let s = new Readable();
        s.push(response);
        s.push(null);
        // if response is true return reponse & update db
        if (response !== undefined && response.length > 1) {
            memoryManager.writeToHistory("" + response.trim(), mentorKey);

            await prismadb.mentor.update({
                where: {
                    id: params.chatId,
                },
                data: {
                    messages: {
                        create: {
                            content: response.trim(),
                            role: "system",
                            userId: user.id
                        }
                    }
                }
            });
        }
        
        // return response
        return new StreamingTextResponse(s);
    } catch (error) {
        // Error handling
        console.log("[CHAT_POST]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}