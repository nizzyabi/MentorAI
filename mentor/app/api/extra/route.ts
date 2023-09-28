import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";
import prismadb from "@/lib/prismadb";

import { checkSubscription } from "@/lib/subscription";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

// FOR PROMPTING AI 


const openai = new OpenAIApi(configuration)
const instructionMessage: ChatCompletionRequestMessage = {
    role: "system",
    content: `You are xyz. talk like him. you are a mentor.`
}
export async function POST (
     req : Request,
     { params }: { params: { mentorId: string } } 
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { messages } = body
        
        // mentor

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!configuration.apiKey) {
            return new NextResponse("OpenAI API Key not configured", { status: 500 })
        }

        if (!messages) {
            return new NextResponse("Messages are required", { status: 400 })
        }

          
        

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [instructionMessage, ...messages],
            stream: true
        },
        {
            responseType: 'stream'
        });
        
        // here

        const messagesL: any = [];

        response.data.on<any>('data', (text: Buffer) => {
            const lines = text.toString().split('\n').filter(line => line.trim() !== '');
            for (const line of lines) {
                const message = line.replace(/^data: /, '');
                if (message === '[DONE]') {
                    // Handling of the DONE message if required
                    return;
                }
                try {
                    const parsedMessage = JSON.parse(message);
                    messagesL.push(parsedMessage.choices[0].message);
                } catch (err) {
                    console.log(err);
                }
            }
        });

        return NextResponse.json(messagesL[0]);

    } catch(error) {
        console.log("[CODE_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}