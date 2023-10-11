"use client"
// Imports 
import { useUser } from "@clerk/nextjs";
import { Mentor } from "@prisma/client"
import Image from "next/image";
import '../app/mentors.css';
import { MessageCircle } from "lucide-react";
import { userProModal } from "@/hooks/use-pro-modal";

// Create an interface that stores all the mentors that the user or we add.
interface MentorsProps {
    // Telling the code that it may get something that it does not expect (count).
    data: (Mentor & {
        _count: {
            messages: number;
        }
    })[];
    isPro: boolean;
    freeTrial: boolean;
    
    
}

// Extra Data & Add Mentors with all of their data such as name, image, and messages.
export const Mentors = ({
    data,
    isPro,
    freeTrial,
    
    
}: MentorsProps) => {
    // If the user searches for a mentor and nothing is found, return this.
    const { user } = useUser();
    const proModal = userProModal();
   
    const handleMentorClick = (mentorId: string) => {
        // If user is not logged in, redirect to sign in page
        if (!user) {
            window.location.href='/sign-up';
            return;
        }
        // If the user is a pro or on a free trial, navigate to chat
        if (isPro || freeTrial) {
            window.location.href = `/chat/${mentorId}`;
        } else {
            // Otherwise, open the modal
            proModal.onOpen();
        }
    };

    if (data.length === 0) {
        return (
            <div className="pt-10 flex flex-col items-center justify-center space-y-3 bg-[#0f0e0e]">
                <div className="relative w-60 h-60">
                    <Image 
                        fill
                        className=""
                        alt="Empty"
                        src="/no.svg"
                    />
                     
                </div>
                <p className="text-sm text-white">No Mentors Found</p>
            </div>
        )
    }
    // If there are mentors found (in search OR in the home page) display this
    // TODO: Subscription for more than 10 uses rather than creating. 
    
    return (
        // style so that the cards look different with each display size.
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-2 bg-[#0f0e0e] pb-8">
            
            {/* Map through the data to display the mentor using item.id */}
            {data.map((item) => (
                <div
                    key={item.id}
                    className="bg-[#0f0e0e] cursor-pointer transition hover:opacity-70 text-white pt-2"
                    onClick={() => handleMentorClick(item.id)}
                >
                    {/* Link for the mentor to go to the chat. */}
                   
                        
                        {/* Image & Card for the mentor*/}
                        <div className="flex items-center justify-center text-center text-black mentor">
                            <div className="relative w-[170px] h-[170px] rounded-xl border-gray-500 border-2">
                                <Image
                                    src={item.src}
                                    fill
                                    className="rounded-xl object-cover max-w"
                                    alt="Mentor"
                                />

                                <div className="flex items-center rounded-xl messag hover:bg-black">
                                    <MessageCircle className=""/>
                                    {item._count.messages}
                                    </div>
                            </div>
                        </div>
                    
                    {/* Name of the mentor */}
                    <div className="text-center mb-3">
                        <p className="font-bold pt-2">
                            {item.name}
                        </p>
                    </div>
                     
                </div>
            ))}
        </div>
        

    )
}