"use client";
// It is somewhere here.
import { ChatHeader } from "@/components/chat-header";

import { Mentor, Message } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useCompletion } from "ai/react"
import { ChatForm } from "@/components/chat-form";
import { ChatMessages } from "@/components/chat-messages";
import { ChatMessageProps } from "@/components/chat-message";

// Interface for Chat Client. The interface tells the code that it MUST include the parameters within it (mentor, messages, count), nothing else. 

interface ChatClientProps {
    mentor: Mentor & {
        messages: Message[];
        _count: {
            messages: number;
        };
    };
};

export const ChatClient = ({
    mentor
}: ChatClientProps) => {
    // Router & Messages State
    const router = useRouter();
    const [messages, setMessages] = useState<ChatMessageProps[]>(mentor.messages);

    // AI Completion handler
    const {
        input,
        isLoading,
        handleInputChange,
        handleSubmit,
        setInput,
    } = useCompletion({
        api: `/api/chat/${mentor.id}`,
        // Create a AI response message and store it in the systemMessage variable & wait for a response by the user.
        onFinish(prompt, completion) {
            const systemMessage: ChatMessageProps = {
                role: "system",
                content: completion,
            };
            // Add the system message to the messages state
            setMessages((current) => [...current, systemMessage])
            setInput("");

            router.refresh();
        }
    });

    // onSubmit function
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        const userMessage: ChatMessageProps = {
            role: "user",
            content: input,
        };
        // Add the user message to the messages state
        setMessages((current) => [...current, userMessage]);

        // from useCompletion, get the handleSubmit
        handleSubmit(e);
    }

    return (
        <div className="flex flex-col h-full p-4 space-y-2">
            <ChatHeader mentor={mentor}/>
            <ChatMessages 
                mentor={mentor}
                isLoading={isLoading}
                messages={messages}
            />
            <ChatForm 
                isLoading={isLoading}
                input={input}
                handleInputChange={handleInputChange}
                onSubmit={onSubmit}
                mentor={mentor}
            />
        </div>
    )
}