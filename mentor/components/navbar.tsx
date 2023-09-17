// We use "useclient" because the component gets prerendered with SSR or ISR/SSG if possible on the server. If not, it will be rendered on the client.
"use client";
// Non Global Imports
import { cn } from "@/lib/utils";
// Global Imports
import { Menu, Sparkles } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";


const font = Poppins({
    weight: "600",
    subsets: ["latin"]
})


export const Navbar = () => {
    return (
        <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary cursor-pointer h-16">
            <div className="flex items-center">
                <Menu className="block md:hidden" />
                <Link href='/'>
                    <h1 className={cn(
                        "hidden md:block text-xl md:text-3xl font-bold text-primary",
                        {/* Dynamic Font (Poppins) */},
                        font.className 
                        )}>
                        MentorAI
                    </h1>
                </Link>
            </div>
            <div className="flex items-center gap-x-3">
                {/* Button from shadcn, the code is located in the components folder */}
                <Button variant='upgrade' size='sm'>
                    Upgrade
                    <Sparkles className="h-4 w-4 fill-white text-white ml-2" />
                </Button>
                {/* Importing functionality & button of dark mode from mode-toggle & theme-provider */}
                <ModeToggle />
                {/* User Icon imported from lucide react */}
                <UserButton />
            </div>
        </div>
    )
}