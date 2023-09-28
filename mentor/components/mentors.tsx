// Imports 
import { Mentor } from "@prisma/client"
import Image from "next/image";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import Link from "next/link";

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
            <div className="pt-10 flex flex-col items-center justify-center space-y-3">
                <div className="relative w-60 h-60">
                    <Image 
                        fill
                        className=""
                        alt="Empty"
                        src="/no.svg"
                    />
                </div>
                <p className="text-sm text-muted-foreground">No Mentors Found</p>
            </div>
        )
    }
    // If there are mentors found (in search OR in the home page) display this
    // TODO: Subscription for more than 10 uses rather than creating. 
    return (
        // style so that the cards look different with each display size.
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 pb-10">
            {/* Map through the data to display the mentor using item.id */}
            {data.map((item) => (
                <Card
                    key={item.id}
                    className="bg-primary/10 rounded-md cursor-pointer transition hover:opacity-75 hover:border-primary/50 hover:border"
                >
                    {/* Link for the mentor to go to the chat. */}
                    <Link href={`/chat/${item.id}`}>
                        {/* Image & Card for the mentor*/}
                        <CardHeader className="flex items-center justify-center text-center text-muted-foreground">
                            <div className="relative w-32 h-32">
                                <Image
                                    src={item.src}
                                    fill
                                    className="rounded-xl object-cover"
                                    alt="Companion"
                                />
                            </div>
                            {/* Name of the mentor */}
                            <p className="font-bold">
                                {item.name}
                            </p>
                            {/* Description of the mentor */}
                            <p className="text-xs">
                                {item.description}
                            </p>
                            </CardHeader>
                    </Link>
                </Card>
            ))}
        </div>
    )
}