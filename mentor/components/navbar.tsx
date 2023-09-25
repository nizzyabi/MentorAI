"use client"
// Non Global Imports
import { cn } from "@/lib/utils";

// Global Imports
import { AuthBtn } from "@/components/authbtn";
import { Menu, Sparkles, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { UserButton, useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { MobileSidebar } from "@/components/mobile-sidebar"
import { Roboto } from "next/font/google";
import { userProModal } from "@/hooks/use-pro-modal";
import { auth, redirectToSignIn } from "@clerk/nextjs";


// Dynamic Font (Poppins)
const font = Roboto({
    weight: "700",
    subsets: ["latin"]
})

interface NavbarProps {
    isPro: boolean;
}

export const Navbar = ({
    isPro
}: NavbarProps) => {
    const proModal = userProModal()
    const { userId } = useAuth();
    return (
        <div className="fixed w-full z-50 flex justify-between items-center py-3 px-4 border-b border-primary/1 bg-secondary/1 cursor-pointer ">
            <div className="flex items-center">
                {/* Getting mobile sidebar function */}
                <MobileSidebar />
                {/* Creating link for mobile sidebar */}
                <Link href='/'>
                    {isPro ? (
                        <h1 className={cn(
                            "hidden md:block text-xl md:text-3xl font-bold text-primary/1",
                            {/* Dynamic Font (Poppins) */},
                            font.className 
                            )}>MyMentor.AI<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"> Pro</span></h1>
                    ) : (
                        <h1 className={cn(
                            "hidden md:block text-xl md:text-3xl font-bold text-primary/1",
                            {/* Dynamic Font (Poppins) */},
                            font.className 
                            )}>MyMentor.AI</h1>
                    )}
                </Link>
            </div>
            <div className="flex items-center gap-x-3">
                {/* If not pro, render button */}
                {!isPro && userId && (
                            <Button onClick={proModal.onOpen} size="sm" variant='upgrade' className="hover:opacity-75">
                                MentorPro
                                <Zap className="h-4 w-4 fill-white text-white ml-2" />
                            </Button>
                )}
                {/* Button from shadcn, the code is located in the components folder */}


                {/*<UserButton afterSignOutUrl="/"/>*/}
                <AuthBtn isSignedIn={userId !== null}/>
                
                
            </div>
        </div>
    )
}