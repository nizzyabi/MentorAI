"use client";

import { Mentor, Message } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChevronLeft, Edit, Edit2, MessageCircle, MoreVertical } from "lucide-react";
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
        <div className="flex w-full justify-between items-center border-b border-primary/10 pt-3 pb-3">
            {/* Back to Home Page Button */}
            <div className="flex gap-x-2 items-center">
                <Button onClick={() => router.back()} size="icon" variant="ghost">
                    <ChevronLeft className="h-8 w-8" />
                </Button>
            </div>

            <div className="flex items-center justify-center flex-col gap-y-1">
                 {/* Bot Avatar */}
                <BotAvatar src={mentor.src} />
                {/* name of mentor */}
                <div className="flex items-center gap-x-2">
                    <p className="font-bold">
                        {mentor.name}
                    </p>
                </div>
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
                        <DropdownMenuItem onClick={() => router.push(`/companion/${mentor.id}`)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Mentor
                        </DropdownMenuItem>
                        {/* Put the number of chats in here.*/}
                        <DropdownMenuItem>
                            <MessageCircle className="w-4 h-4 mr-2" />
                            {mentor._count.messages} Chats
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    )
}

