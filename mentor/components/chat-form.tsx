"use client";

import { ChangeEvent, FormEvent } from "react";
import { ChatRequestOptions } from "ai";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";
import { Mentor } from "@prisma/client";
// Create an interface for the chat form

interface ChatFormProps {
    // Input
    input: string;
    // handle Change
    handleInputChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
    // handle Submit
    onSubmit: (e: FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions | undefined) => void;
    // Loading
    isLoading: boolean;
    mentor: Mentor
}

// Get the Props
export const ChatForm = ({
    input,
    handleInputChange,
    onSubmit,
    isLoading,
    mentor
}: ChatFormProps) => {
    // return the form 
    return (
        <form 
            onSubmit={onSubmit} 
            className="border-t border-primary/10 py-4 flex items-center gap-x-2">
                <Input 
                    disabled={isLoading}
                    value={input}
                    onChange={handleInputChange}
                    placeholder={`Write a message to ${mentor.name}...`}
                    className="rounded-lg bg-primary/10"
                />
                <Button disabled={isLoading} variant="ghost">
                    <SendHorizonal className="h-6 w-6"/>
                </Button>
        </form>
    )
}