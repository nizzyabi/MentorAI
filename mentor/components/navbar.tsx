"use client";

// Non Global Imports
import { cn } from "@/lib/utils";

// Global Imports
import { Menu, Sparkles, Zap } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { MobileSidebar } from "@/components/mobile-sidebar"
import { Roboto } from "next/font/google";

// Dynamic Font (Poppins)
const font = Roboto({
    weight: "700",
    subsets: ["latin"]
})

export const Navbar = () => {
    return (
        <div className="fixed w-full z-50 flex justify-between items-center py-3 px-4 border-b border-primary/20 bg-secondary/5 cursor-pointer ">
            <div className="flex items-center">
                {/* Getting mobile sidebar function */}
                <MobileSidebar />
                {/* Creating link for mobile sidebar */}
                <Link href='/'>
                    <h1 className={cn(
                        "hidden md:block text-xl md:text-3xl font-bold text-primary",
                        {/* Dynamic Font (Poppins) */},
                        font.className 
                        )}>
                        MyMentorAI
                    </h1>
                </Link>
            </div>
            <div className="flex items-center gap-x-3">
                {/* Importing functionality & button of dark mode from mode-toggle & theme-provider */}
                <ModeToggle />
                
                {/* Button from shadcn, the code is located in the components folder */}
                <Button variant='upgrade' className="hover:opacity-75 h-12 w-22">
                    MentorPro
                    <Zap className="h-4 w-4 fill-white text-white ml-2" />
                </Button>

                <UserButton afterSignOutUrl="/"/>
                
            </div>
        </div>
    )
}