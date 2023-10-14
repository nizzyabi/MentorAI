import Image from "next/image"
export default function AboutImages () {
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
    return (
        <div>
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
        
        </div>
    )
}