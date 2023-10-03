// Imports 
import { Mentor } from "@prisma/client"
import Image from "next/image";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { useState } from "react";
import '../app/mentors.css'
// Create an interface that stores all the mentors that the user or we add.
interface MentorsProps {
    // Telling the code that it may get something that it does not expect (count).
    data: (Mentor & {
        _count: {
            messages: number;
        }
    })[];
}

// Extra Data & Add Mentors with all of their data such as name, image, and messages.
export const Mentors = ({
    data
}: MentorsProps) => {
    // If the user searches for a mentor and nothing is found, return this.
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
                >
                    {/* Link for the mentor to go to the chat. */}
                    <Link href={`/chat/${item.id}`}>
                        {/* Image & Card for the mentor*/}
                        <div className="flex items-center justify-center text-center text-black">
                            <div className="relative w-[170px] h-[170px]">
                                <Image
                                    src={item.src}
                                    fill
                                    className="rounded-xl object-cover max-w specialBtn"
                                    alt="Mentor"
                                />
                            </div>
                        </div>
                    </Link>
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