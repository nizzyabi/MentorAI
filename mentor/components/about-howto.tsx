import { Button } from "./ui/button"
import Link from "next/link"

export default function AboutHowTo() {
    return (
        <div>
                        
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
        </div>
    )
}