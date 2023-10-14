"use client"
// Non Global Imports
import { cn } from "@/lib/utils";

// Global Imports
import { AuthBtn } from "@/components/authbtn";
import { Sparkle } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { MobileSidebar } from "@/components/mobile-sidebar"
import { Roboto } from "next/font/google";
import { userProModal } from "@/hooks/use-pro-modal";
import { FreeCounter } from "@/components/free-counter";



// Dynamic Font (Poppins)
const font = Roboto({
    weight: "700",
    subsets: ["latin"]
})

interface NavbarProps {
    isPro: boolean;
    apiLimitCount: number;
}

export const Navbar = ({
    isPro,
    apiLimitCount = 0
}: NavbarProps) => {
    const proModal = userProModal()
    const { userId } = useAuth();
    
    return (
        <div className="w-full z-50 flex justify-between items-center px-2 cursor-pointer pt-3 pb-1 fixed bg-secondary">
            <div className="flex items-center">
                {/* Getting mobile sidebar function */}
                <MobileSidebar isPro={isPro} />
                {/* Creating link for mobile sidebar */}
                <Link href='/'>
                    {isPro ? (
                        <h1 className={cn(
                            "hidden md:block text-xl md:text-3xl font-bold text-primary",
                            {/* Dynamic Font (Poppins) */},
                            font.className 
                            )}>MyMentor.AI<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-400"> Pro</span></h1>
                    ) : (
                        <h1 className={cn(
                            "hidden md:block text-xl md:text-3xl font-bold text-primary",
                            {/* Dynamic Font (Poppins) */},
                            font.className 
                            )}>MyMentor<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-400">AI</span></h1>
                    )}
                </Link>
            </div>
            
            <div className="flex items-center gap-x-3 ">
                <div className="flex items-center">
                    {!isPro && userId && (
                        <FreeCounter 
                            apiLimitCount={apiLimitCount}
                        />
                    )}
                    
                </div>
                {/* Free Counter */}
                
                {/* If not pro, render button */}
                {!isPro && userId && (
                    
                            <Button onClick={proModal.onOpen} size="sm" variant='upgrade' className="hover:opacity-75">
                                MentorPro
                                <Sparkle className="h-4 w-4 fill-white text-white ml-2" />
                            </Button>
                )}
                {/* Button from shadcn, the code is located in the components folder */}


                {/*<UserButton afterSignOutUrl="/"/>*/}
                <AuthBtn isSignedIn={userId !== null}/>
                
            </div>
        </div>
    )
}