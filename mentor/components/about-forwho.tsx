import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
export default function AboutForWho() {
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
        <div>
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