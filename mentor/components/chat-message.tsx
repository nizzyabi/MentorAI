"use client";

// Imports
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Copy } from "lucide-react";
import { BotAvatar } from "./bot-avatar";
import { BeatLoader } from "react-spinners";
import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";

// export & create interface for message

export interface ChatMessageProps {
    role: "system" | "user";
    content?: string;
    isLoading?: boolean;
    src?: string;
}

export const ChatMessage = ({
    role,
    content,
    isLoading,
    src
}: ChatMessageProps) => {
    // Toast
    const { toast } = useToast();
    // Themes
    const { theme } = useTheme();

    // Copy Function
    const onCopy = () => {
        if (!content) {
            return;
        }
        // If there is content, copy it to the clipboard
        navigator.clipboard.writeText(content);
        toast({
            description: "Copied to clipboard!",
        });
    }
    return (
        <div className={cn(
            "group flex items-start gap-x-3 py-4 w-full",
            // If the role is the user, justify the end
            role === "user" && "justify-end"
        )}>
        {/* If the role is not user, render a bot avatar component */}
            {role !== "user" && src && <BotAvatar src={src}/>}
            <div className="rounded-md px-4 py-2 max-w-sm text-sm bg-primary/10">
                {/* If it is loading, show the loading message, otherwise show the content which we put in chat-messages content*/}
                {isLoading 
                ? <BeatLoader 
                    size={5}
                    color={theme === "light" ? "black" : "white"}
                    /> 
                : content}
            </div>
            {/* If the role is user, show the user avatar */}
            {role === "user" && <UserAvatar />}
            {/* Copy Clip Board Button for Avatar Text */}
            {role !== "user" && !isLoading && (
                <Button
                    onClick={onCopy}
                    className="opacity-0 group-hover:opacity-100 transition"
                    size="icon"
                    variant="ghost"
                >
                    <Copy className="w-4 h-4"/>
                </Button>
            )}
        </div>
    )
}