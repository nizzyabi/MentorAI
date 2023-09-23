"use client";
import { useState, useEffect, useRef, ElementRef } from "react";
import { Mentor } from "@prisma/client";
import { ChatMessage, ChatMessageProps } from "@/components/chat-message";

// Interface for Chat Messages
interface ChatMessagesProps {
    messages: ChatMessageProps[];
    isLoading: boolean;
    mentor: Mentor;
}

// Get the interface and return the messages, loading state and mentor
export const ChatMessages = ({
    messages = [],
    isLoading,
    mentor
}: ChatMessagesProps) => {
    // Scroll to bottom when new message is there so the user doesnt have to mannually keep scrolling down
    const scrollRef = useRef<ElementRef<"div">>(null);

    // Create a useState for loading message
    const[fakeLoading, setFakeLoading] = useState(messages.length === 0 ? true : false);

    // useEffect for cool loading effect when there are no messages
    useEffect(() => {
        const timeout = setTimeout(() => {
            setFakeLoading(false);
        }, 1000);

        return () => {
            clearTimeout(timeout);
        }
    }, [])
    
    // Smooth scroll everytime messages changes
    useEffect(() => {
        scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages.length])

    return (
        // Put the input for bot with it's image & a description message
        <div className="flex-1 overflow-y-auto pr-4">
            <ChatMessage
                isLoading={fakeLoading}
                src={mentor.src}
                role="system"
                content={`Hello, my name is ${mentor.name}, ${mentor.description}. Nice to meet you!`}
            />
            {/* Map through the messages so that they are displayed in the chat*/}
            {messages.map((message) => (
                <ChatMessage 
                    key={message.content}
                    role={message.role}
                    content={message.content}
                    src={mentor.src}
                />
            ))}
            {/* Loading state */}
            {isLoading && (
                <ChatMessage 
                    isLoading
                    role="system"
                    src={mentor.src}
                />
            )}
            <div ref={scrollRef}/>
        </div>
    )
}