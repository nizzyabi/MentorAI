"use client"

import TypewriterComponent from "typewriter-effect"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function AboutUs() {

    const images = [
        {
            src:'/placeholder.svg'
        },
        {
            src:'/placeholder.svg'
        },
        {
            src:'/placeholder.svg'
        }
    ]


    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-center pt-2 pb-5">
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
                    <div className="flex items-center justify-center">
                        <h1 className="text-primary/1 pr-2">Talk to: </h1>
                        <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                        <TypewriterComponent options={{
                    strings: [
                        " Elon Musk",
                        " Jeff Bezos",
                        " Micheal Jordan",
                        "Bill Gates",
                        "Pablo Picasso",
                        "Albert Einstein",
                        "Steve Jobs",
                        "Oprah Winfrey",
                        "Elen Degeneres",
                        "Mark Zuckerberg",
                        "Warren Buffet",
                    ],
                autoStart: true,
                loop: true,
                        }} />
                        </div>
                    </div>
                </div>
            </div>
            {/* Content */}
            <div className=" text-lg md:text-xl font-light text-zinc-400 flex text-center justify-center pb-3 pr-4 pl-4">
                MyMentorAI leverages cutting-edge artificial intelligence to connect you with the best advice from the most successful individuals across diverse industries.
            </div>
            {/* Images */}
            <div className="relative w-66 h-50 flex items-center justify-center pb-3">
                {/* Map through images*/}  
                {images.map((item, index) => (
                    <div key={index} className="relative w-60 h-60">
                        <Image
                            src={item.src}
                            fill
                            className="rounded-xl object-cover p-3"
                            alt="Companion"
                        />
                    </div>
                ))}
            </div>
            {/* Why we started */}
            <div>
                <div className="text-2xl sm:text-5xl md:text-3xl lg:text-5xl space-y-5 font-extrabold">
                    <h1 className="text-primary/1 text-center pb-4">Why MentorAI?</h1>
                </div>
                <div className="text-lg md:text-xl font-light text-zinc-400 flex text-center justify-center pb-3 pr-4 pl-4">
                    {/* put cards & pictures of AI Mentors*/}
                    <p>In the world today, it is important to have a mentor to guide you through tough times & give advice where need be. However, finding a good mentor is hard, especially for new entrepeneurs, artists, and go getters. Thus, we made MyMentorAI for that reason, to help guide you with the best advice from the most successful people.</p>
                </div>
                <div className="relative w-66 h-50 flex items-center justify-center pb-3">
                {/* Map through images*/}  
                {images.map((item, index) => (
                    <div key={index} className="relative w-60 h-60">
                        <Image
                            src={item.src}
                            fill
                            className="rounded-xl object-cover p-3"
                            alt="Companion"
                        />
                    </div>
                ))}
            </div>
            </div>
            {/* About the company */}
            <div>
                
            </div>
        </div>
    )
}