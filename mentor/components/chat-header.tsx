"use client";

import { Mentor, Message } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChevronLeft, Edit, MessageCircle, MoreVertical } from "lucide-react";
import { BotAvatar } from "@/components/bot-avatar";
import { useUser } from "@clerk/nextjs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface ChatHeaderProps {
    mentor: Mentor & {
        messages: Message[];
        _count: {
            messages: number;
        };
    };
};

export const ChatHeader = ({
    mentor
}: ChatHeaderProps) => {
    // Router
    const router = useRouter();
    // User
    const { user }  = useUser();

    return (
        <div className="flex w-full items-center border-b border-primary/10 pt-3 pb-3">
            {/* Back to Home Page Button */}
            <div className="flex gap-x-2 items-center">
                <Button onClick={() => router.back()} size="icon" variant="ghost">
                    <ChevronLeft className="h-8 w-8" />
                </Button>
            </div>

            {/* Bot Avatar */}
            <BotAvatar src={mentor.src} />

            {/* name of mentor & display number of messages*/}
            <div className="flex flex-col gap-y-1">
                <div className="flex items-center gap-x-2">
                    <p className="font-bold ml-3">
                        {mentor.name}
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground">
                        <MessageCircle className="w-3 h-3 mr-1" />
                        {mentor._count.messages}
                    </div>
                </div>
                <p className="text-xs text-muted-foreground ml-2">
                    Created by {mentor.userName}
                </p>
            </div>
            {/* If statement. if it is the user talking to the chatbot, the dropdown menu displays*/}
            {user?.id === mentor.userId && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon">
                            <MoreVertical />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Mentor
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    )
}

