"use client"

import TypewriterComponent from "typewriter-effect"
import Image from "next/image"
import { Button } from "./ui/button"
import Link from "next/link"
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import '../app/globals.css'


import { Check } from "lucide-react"
import AboutHeader from "./about-header"
import AboutImages from "./about-images"
import AboutType from "./about-type"
import AboutHowTo from "./about-howto"
import AboutFeatures from "./about-features"
import AboutForWho from "./about-forwho"
export default function AboutUs() {

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
            <AboutHeader />

            {/* Link to all mentors */}
            <AboutImages />

            {/* Typewritter Effect */}
            <AboutType />

            {/* How to Use */}
            <AboutHowTo />
            
            {/* Features we have */}
            <AboutFeatures />

            {/* More Images & Who it's for */}
            <AboutForWho />
        </div>
    )
}