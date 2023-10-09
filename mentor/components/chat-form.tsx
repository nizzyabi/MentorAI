"use client";

import { useForm } from "react-hook-form";
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
    const { reset } = useForm();

    // return the form 
    return (
        <form 
            onSubmit={onSubmit} 
            className="sm:pl-8 pt-4 flex items-center gap-x-2 text-black border-t pl-2 ">
                <Input 
                    disabled={isLoading}
                    value={input}
                    onChange={handleInputChange}
                    placeholder={`Write a message to ${mentor.name}...`}
                    className="rounded-md text-black bg-white border-white border-2 focus:outline-none mb-2 "
                    
                />
                <Button disabled={isLoading} variant="ghost" className="hover:bg-transparent hover:opacity-40 mb-2">
                <SendHorizonal className="h-6 w-6 text-white hover:bg-transparent"/>
                </Button>
        </form>
    )
}