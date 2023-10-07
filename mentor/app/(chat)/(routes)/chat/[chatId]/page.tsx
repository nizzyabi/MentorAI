// Page for each chat. it is automatically routes because of the routing we did in the mentor.tsx /chat/chatId(dynamic) is the file structure.

// Imports
import prismadb from "@/lib/prismadb";

import { redirectToSignIn, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ChatClient } from "./components/client";

// create an interface for chat
interface ChatIdPageProps {
    params: {
        chatId: string;
    }
}

const ChatIdPage = async ({
    params
}: ChatIdPageProps) => {
    // get the user id from clerk
    const { userId } = auth();

    // if no user id, redirect to login
    if (!userId) {
        return redirectToSignIn();
    }

    const mentor = await prismadb.mentor.findUnique({
        where: {
            // It is called chatId because the interface's params is called chatId & the folder is called that too because it is [chatId] which is dynamic and will go based off the mentor.
            id: params.chatId
        },
        // Load all the messages related to this mentor in ascending order (like a regular chat)
        include: {
            messages: {
                orderBy: {
                    createdAt: "asc",
                },
                // Only load the messages between the mentor and the current user. 
                where: {
                    userId
                }
            },
            // Count the number of messages between all the mentors and the current user.
            _count: {
                select: {
                    messages: true
                }
            }
        }
    });

    // If there is no mentor, return to main page using next navigation.
    if (!mentor) {
        return redirect('/')
    }
    // return the chats based of the mentor
    return (
        <ChatClient mentor={mentor}/>
    )
}

export default ChatIdPage