"use client";

import { Mentor, Message } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChevronLeft, Edit, Edit2, LucideActivity, MessageCircle, MoreVertical, Trash } from "lucide-react"; 
import { BotAvatar } from "@/components/bot-avatar";
import { useUser } from "@clerk/nextjs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ModeToggle } from "./mode-toggle";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import Link from "next/link";

interface ChatHeaderProps {
    mentor: Mentor & {
        messages: Message[];
        _count: {
            messages: number;
        };
    };
};

// Chat Header
//ToDo: change the chat header so that the image of the ai is to the left.
export const ChatHeader = ({
    mentor
}: ChatHeaderProps) => {
    // Router
    const router = useRouter();
    // User
    const { user }  = useUser();
    // Toast
    const { toast } = useToast();

    // Delete Mentor using Toast
    const onDeleteMentor = async () => {
        try {
            // Delete Mentor Link
            await axios.delete(`/api/mentor/${mentor.id}`);

            toast({
                description: "Mentor Deleted.",
                duration: 2500
            })
            // refresh page & take user to home page
            router.refresh();
            router.push("/");
        } catch (error) {
            toast({
                description: "Something Went Wrong.",
                variant: "destructive",
                duration: 2500
            })
        }
    }

    return (
        <div className="flex w-full justify-between items-center border-b border-primary/20 pt-3 pb-3 bg-secondary">
            {/* Back to Home Page Button */}
            <div className="flex gap-x-2 items-center">
                <Button onClick={() => router.back()} size="icon" variant="ghost" className="hover:bg-transparent hover:opacity-50">
                    <ChevronLeft className="h-8 w-8 text-primary" />
                </Button>
            </div>

            <div className="flex items-center justify-center flex-col gap-y-1">
                 {/* Bot Avatar */}
                <BotAvatar src={mentor.src} />
                {/* name of mentor */}
                <div className="flex items-center gap-x-2">
                    <p className="font-bold text-primary">
                        {mentor.name}
                    </p>
                </div>
            </div>
            {/* If statement. if it is the user talking to the chatbot, the dropdown menu displays*/}
            {user?.id === mentor.userId ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="bg-transparent text-primary hover:bg-transparent hover:opacity-50" size="icon">
                            <MoreVertical />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => router.push(`/mentor/${mentor.id}`)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Mentor
                        </DropdownMenuItem>

                        {/* Trash */}
                        <DropdownMenuItem onClick={onDeleteMentor}>
                            <Trash className="w-4 h-4 mr-2"/>
                            Delete Mentor
                        </DropdownMenuItem>

                        {/* Put the number of chats in here.*/}
                        <DropdownMenuItem>
                            <MessageCircle className="w-4 h-4 mr-2" />
                            {mentor._count.messages} Chats
                        </DropdownMenuItem>

                        {/* Prompt Examples */}
                        <DropdownMenuItem className="font-bold">
                            <Link href='https://www.nytimes.com/2023/05/25/technology/ai-chatbot-chatgpt-prompts.html'>
                             Eg. Prompts
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="bg-transparent text-primary hover:bg-transparent" size="icon">
                        <MoreVertical />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {/* Put the number of chats in here.*/}
                    <DropdownMenuItem>
                        <MessageCircle className="w-4 h-4 mr-2" />
                        {mentor._count.messages} Chats
                    </DropdownMenuItem>

                        {/* Prompt Examples */}
                        <DropdownMenuItem className="font-bold">
                            <Link href='https://www.nytimes.com/2023/05/25/technology/ai-chatbot-chatgpt-prompts.html'>
                             Eg. Prompts
                            </Link>
                        </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            )}
        </div>
    )
}

