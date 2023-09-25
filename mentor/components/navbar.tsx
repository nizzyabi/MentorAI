"use client";

// Non Global Imports
import { cn } from "@/lib/utils";

// Global Imports
import { Menu, Sparkles, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { MobileSidebar } from "@/components/mobile-sidebar"
import { Roboto } from "next/font/google";
import { userProModal } from "@/hooks/use-pro-modal";

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
    const pro = "pro"
    return (
        <div className="fixed w-full z-50 flex justify-between items-center py-3 px-4 border-b border-primary/20 bg-secondary/5 cursor-pointer ">
            <div className="flex items-center">
                {/* Getting mobile sidebar function */}
                <MobileSidebar />
                {/* Creating link for mobile sidebar */}
                <Link href='/'>
                    {isPro ? (
                        <h1 className={cn(
                            "hidden md:block text-xl md:text-3xl font-bold text-primary",
                            {/* Dynamic Font (Poppins) */},
                            font.className 
                            )}>MyMentor.AI<span className="text-purple-500 text-md"> Pro</span></h1>
                    ) : (
                        <h1 className={cn(
                            "hidden md:block text-xl md:text-3xl font-bold text-primary",
                            {/* Dynamic Font (Poppins) */},
                            font.className 
                            )}>MyMentor.AI</h1>
                    )}
                </Link>
            </div>
            <div className="flex items-center gap-x-3">
                {/* If not pro, render button */}
                {!isPro && (
                            <Button onClick={proModal.onOpen} size="sm" variant='upgrade' className="hover:opacity-75">
                                MentorPro
                                <Zap className="h-4 w-4 fill-white text-white ml-2" />
                            </Button>
                )}
                {/* Button from shadcn, the code is located in the components folder */}


                <UserButton afterSignOutUrl="/"/>
                
            </div>
        </div>
    )
}