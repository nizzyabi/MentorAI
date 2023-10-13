"use client"

import TypewriterComponent from "typewriter-effect"
import Image from "next/image"
import { Button } from "./ui/button"
import Link from "next/link"
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import '../app/globals.css'
import '../app/about.css';

import { Check } from "lucide-react"
export default function AboutUs() {


// Mentor Images 
    const images = [
        
        {
            src:'/buffet.webp',
            name: 'Warren Buffet'
        },
        {
            src:'/messi.jpg',
            name: 'Lionel Messi'
        }
    ]
    const images2 = [
        {
            src:'/beyonce.webp',
            name: 'Beyoncé'
        },
        {
            src:'/jobs.jpg',
            name: 'Steve Jobs'
        },
        {
            src:'/albert.jpg',
            name: 'Albert Einstein'
        }
    ]
// Description of who it is for
    const whoImg = [
        {
            src:'/business-idea.svg',
            name: 'Entreprenuers',
            description: 'MyMentorAI equips entrepreneurs with tailored advice and strategies from iconic business pioneers, enabling them to navigate the complex world of startups and enterprises with confidence.',
        },
        {
            src:'/artist.svg',
            name: 'Creatives',
            description: 'From the artistry of cinema to the innovations of engineering, MyMentorAI provides creatives a unique opportunity to seek inspiration and guidance from legendary figures.',
        },
        {
            src:'/self.svg',
            name: 'Self-Improvement',
            description: 'Those dedicated to personal growth can tap into the profound wisdom and life lessons of world-renowned thinkers, leaders, and visionaries, charting a path of enriched self-discovery and transformation.',
        }
    ]

    return (
        <div className="bg-secondary pt-4">
            {/* Header */}
            <div className="bg-secondary">
                <div className="text-6xl md:text-6xl font-bold flex text-center justify-center pr-20 pl-20 bg-secondary ">
                    <h1>Your Personal Mentor at your fingertips 🦾</h1> 
                </div>
                <div className="text-xl md:text-xl font-light flex text-center justify-center pt-4 pb-3 pr-20 pl-20">
                    <p>Ever wanted to get advice from the best? From celeberties to athletes to Nobel Peice Prize winning scientists, MyMentorAI allows you to talk to who you want, whenever you want.</p>
                </div>
                {/* Images of Mentors */}

            </div>

                {/* Link to all mentors */}
                <div className="bg-secondary">
                <div className="relative w-66 h-50 flex items-center justify-center p-5 bg-secondary">
                {/* Map through images*/}  
                {images.map((item, index) => (
                    <div key={index} className="relative w-60 h-60 bg-secondary m-2">
                        <Image
                            src={item.src}
                            fill
                            className="rounded-xl object-cover border-purple-500 border-2 "
                            alt="Mentor"
                        />

                        <div className="flex items-center justify-center mt-[250px] bg-secondary">
                            {item.name}
                        </div>
                        

                    </div>
                    
                ))}
            </div>
            {/* Button */}
                    <div className="flex items-center justify-center pb-5 pt-[30px] bg-secondary">
                        <Link href='/'>
                            <Button size='lg' variant='upgrade'className="hover:opacity-75 text-lg font-semibold">
                                Try for Free
                            </Button>
                        </Link>
                        
                    </div>
                    {/* Link to Reviews*/}
                    <h1 className="flex justify-center items-center"> <span className="mr-2 text-purple-500">★★★★★</span> 5 stars from 452 users</h1>
            </div>
            <div className="flex items-center justify-center pt-8 pb-5 bg-secondary">
                {/* Moving Text */}
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold bg-secondary">
                <div className="flex items-center justify-center bg-secondary">
                        <h1 className=" pr-2">Talk to: </h1>
                        <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                        <TypewriterComponent options={{
                    strings: [
                        " Elon Musk",
                        " Jeff Bezos",
                        " Aristotle",
                        "Bill Gates",
                        "Plato",
                        "Tiger Woods",
                        "Steve Jobs",
                        "Oprah Winfrey",
                        "Jack Ma",
                        "Warren Buffet",
                    ],
                autoStart: true,
                loop: true,
                        }} />
                        </div>
                    </div>
                </div>
            </div>
            {/* Why we started */}
            <div>
                <div className="text-2xl sm:text-5xl md:text-3xl lg:text-5xl space-y-5 font-extrabold bg-secondary">
                    <h1 className="flex justify-center items-center">How to use My Mentor AI: </h1>
                </div>
                

            {/* Embed Video Showing How To Use App*/}
            <div className="flex justify-center items-center mt-10">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/6is0CRS2krU?si=VCiIbhBFeS_bzGf7" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">

            </iframe>
                </div>
            </div>
            {/* Button */}
                <div className="flex items-center justify-center mb-5 mt-5 bg-secondary">
                    <Link href='/'>
                        <Button size='lg' variant="upgrade"className="text-lg hover:opacity-50 font-semibold">
                            Try For Free
                        </Button>
                    </Link>
                </div>
                {/* Features we have */}
                <div className="mb-[30px] text-center items-center">
                <h1 className="text-2xl sm:text-5xl md:text-3xl lg:text-5xl font-extrabold">Some Cool Features We Have:</h1>
                <div className="pt-4 text-lg">
                    <h1 className="p-2"><span className="text-purple-500">✔</span> Create your own AI Mentors</h1>
                    <h1 className="p-2"><span className="text-purple-500">✔</span> Talk to historic figures of the past</h1>
                    <h1 className="p-2"><span className="text-purple-500">✔</span> Mentors will remember your past chats with them</h1>
                    <h1 className="p-2"><span className="text-purple-500">✔</span> Unlimited chats</h1>
                    <h1 className="p-2"><span className="text-purple-500">✔</span> Managed & ran by the community</h1>
                    <h1 className="p-2"><span className="text-purple-500">✔</span> Latest & greatest AI models</h1>
                </div>
                {/* More Images */}
                <div className="relative w-66 h-50 flex items-center justify-center p-5 bg-secondary">
                {/* Map through images*/}  
                {images2.map((item, index) => (
                    <div key={index} className="relative w-60 h-60 bg-secondary m-2">
                        <Image
                            src={item.src}
                            fill
                            className="rounded-xl object-cover border-purple-500 border-2 "
                            alt="Mentor"
                        />

                        <div className="flex items-center justify-center mt-[250px] bg-secondary">
                            {item.name}
                        </div>
                        

                    </div>
                    
                ))}
            </div>
                {/* Button */}
                <div className="flex items-center justify-center mb-5 mt-5 bg-secondary">
                    <Link href='/'>
                        <Button size='lg' variant="upgrade"className="text-lg hover:opacity-50 font-semibold">
                            Try For Free
                        </Button>
                    </Link>
                </div>
            </div>
            {/* Reviews ( Twitter )*/}
                <div className="text-2xl sm:text-5xl md:text-3xl lg:text-5xl  font-extrabold bg-secondary">
                    <h1 className=" text-center pb-1">Who is this for?</h1>
                </div>
                <div className="relative w-66 h-50 flex items-center justify-center p-5 bg-secondary">
                {/* Map through images*/}  
                {whoImg.map((item, index) => (
                    <div key={index} className="relative w-60 h-60 m-2 bg-secondary">
                        <Image
                            src={item.src}
                            fill
                            className="rounded-xl object-cover bg-gray-500 border-white border-2  "
                            alt="Mentor"
                        />
                        
                        <div className="flex items-center justify-center font-bold text-lg  bg-tranparent mt-[250px]">
                            {item.name}
                            
                        </div>
                        <div className="bg-purple-500 rounded-xl mt-[10px] p-5 border-white border-2 sm:h-[320px] md:h-[300px]">
                        <div className="flex items-center justify-center text-center text-md">
                            {item.description}
                        </div>
                        </div>

                    </div>
                    
                ))}
            </div>

           
           
            
            
        </div>
    )
}