"use client"

import TypewriterComponent from "typewriter-effect"
import Image from "next/image"
import { Button } from "./ui/button"
import Link from "next/link"
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
export default function AboutUs() {

    const images = [
        {
            src:'/elon.jpg',
            name: 'Elon Musk'
        },
        {
            src:'/micheal.jpeg',
            name: 'Micheal Jordan'
        }
    ]

    const images2 = [
        {
            src:'/bezos.jpg'
        },
        {
            src:'/buffet.webp'
        },
        {
            src:'/cristiano.webp'
        }
    ]

    const team = [
        {
            src: '/placeholder.svg',
        }
    ]


    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-center pt-8 pb-5">
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
                    <div className="flex items-center justify-center">
                        <h1 className="text-black pr-2">Talk to: </h1>
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
            <div className=" text-lg md:text-xl font-light text-black flex text-center justify-center pr-20 pl-20">
                MyMentorAI leverages cutting-edge artificial intelligence to connect you with the most successful individuals across the world! record video of you texting it
            </div>
            <div className="flex justify-center items-center pt-10">
            <iframe 
            width="560" 
            height="315" 
            src="https://www.youtube.com/embed/nqZE7a88zwo?si=aUSRi8qoYANh0_1J" 
            title="YouTube video player" 
            style={{ border: "none" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen>
            </iframe>
            </div>
                {/* Link to all mentors*/}
                    <div className="flex items-center justify-center pb-5 pt-3">
                        <Link href='/'>
                            <Button size='lg'className="bg-gradient-to-r from-purple-400 to-pink-600 text-white text-lg">
                                Talk to a Mentor
                            </Button>
                        </Link>
            </div>
            {/* Why we started */}
            <div>
                <div className="text-2xl sm:text-5xl md:text-3xl lg:text-5xl space-y-5 font-extrabold">
                    <h1 className="text-black text-center pb-4">Why MentorAI?</h1>
                </div>
                <div className="text-lg md:text-xl font-light text-black flex text-center justify-center pb-3 pr-20 pl-20">
                    {/* put cards & pictures of AI Mentors*/}
                    <p>In the world today, it is important to have a mentor to guide you through tough times & give advice where need be. However, finding a good mentor is hard, especially for new entrepeneurs, artists, and go getters. Thus, we made MyMentorAI for that reason, to help guide you with the best advice from the most successful people.</p>
                </div>
                <div className="relative w-66 h-50 flex items-center justify-center p-5">
                {/* Map through images*/}  
                {images2.map((item, index) => (
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
            {/* Link to all mentors*/}
                <div className="flex items-center justify-center pb-5 pt-5">
                    <Link href='/'>
                        <Button size='lg'className="bg-gradient-to-r from-purple-400 to-pink-600 text-white text-lg">
                            Talk to a Mentor
                        </Button>
                    </Link>
                </div>
            {/* About the company */}
            <div>
                <div className="text-2xl sm:text-5xl md:text-3xl lg:text-5xl space-y-5 font-extrabold">
                    <h1 className="text-black text-center pb-4">Our Team</h1>
                </div>
                <div className="text-lg md:text-xl font-light text-black flex text-center justify-center pb-3 pr-20 pl-20">
                    {/* put cards & pictures of AI Mentors*/}
                    <p>Our team consists of 5 People. We are incredibly proud to be working on this project together. </p>
                </div>
                <div className="relative max-w h-50 flex items-center justify-center pb-3">
                {/* Map through images*/}  
                
                    <div className="relative w-[500px] h-[400px]">
                        <Image
                            src='/dev-team.jpeg'
                            fill
                            className="rounded-xl object-cover p-3"
                            alt="Companion"
                        />
                    </div>
                
            </div>
            </div>
        </div>
    )
}