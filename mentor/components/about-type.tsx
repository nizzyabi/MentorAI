import Link from "next/link"
import { Button } from "./ui/button"
import TypewriterComponent from "typewriter-effect"

export default function AboutType() {
    return (
        <div>
            {/* Button */}
            <div className="flex items-center justify-center pb-5 pt-[30px] bg-secondary">
                <Link href='/'>
                    <Button size='lg' variant='upgrade'className="hover:opacity-75 text-lg font-semibold">
                            Try for Free
                    </Button>
                </Link>
                        
            </div>
            <div>
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
                    
        </div>

    )
}