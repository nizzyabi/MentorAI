"use client"

import TypewriterComponent from "typewriter-effect"
import { Card, CardContent, CardTitle } from "@/components/ui/card"


export default function AboutUs() {
    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-center pt-2">
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
                    <div className="flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                        <h1 className="text-primary pr-2">Talk to: </h1><TypewriterComponent options={{
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
            {/* Content */}
            <div className=" text-lg md:text-xl font-light text-zinc-400 flex items-center justify-center pb-3">
                Your Mentor is just one click away...
            </div>
            {/* Why we started */}
            <div>
                <div className="text-2xl sm:text-5xl md:text-3xl lg:text-5xl space-y-5 font-extrabold">
                    <h1 className="text-primary text-center pb-4">Why MentorAI?</h1>
                </div>
                <Card>
                    <CardTitle></CardTitle>
                    <CardContent>
                        
                    </CardContent>
                </Card>
                <div className="text-center">
                    {/* put cards & pictures of AI Mentors*/}
                    <p>In the world today, it is key to have a mentor to guide you through tough times & give advice where need be. However, finding a good mentor is hard, especially for new entrepeneurs. Thus, we made MyMentorAI for that reason, to talk to the best business people, artists, entertainers, and even historic figures to get the best advice & guidance so you do not have to worry about finding a mentor.</p>
                </div>
            </div>
            {/* About the company */}

        </div>
    )
}