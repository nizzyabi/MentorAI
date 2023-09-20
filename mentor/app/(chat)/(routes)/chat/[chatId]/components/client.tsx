"use client";

import { ChatHeader } from "@/components/chat-header";

import { Mentor, Message } from "@prisma/client";

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
    return (
        <div className="flex flex-col h-full space-y-2">
            <ChatHeader mentor={mentor}/>
        </div>
    )
}