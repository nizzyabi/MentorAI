"use client"
// imports
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MAX_FREE_COUNTS } from "@/constants";
import { Progress } from "@/components/ui/progress";
import { Button } from "./ui/button";

// interface FreeCounterProps {}
interface FreeCounteProps {
    apiLimitCount: number;
    isPro?: boolean;
}

// Counter for free users
export const FreeCounter = ({
    apiLimitCount = 0,
    isPro
}: FreeCounteProps) => {
    // for hydration errors
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, []);

    if(!mounted) {
        return null
    }

    return (
        <div className="px-3 flex items-center justify-center pt-4">
            <Card className="">
            <CardContent className="">
                <div className="text-center text-sm text-black ">
                    <p className="font-bold">
                        {apiLimitCount} / {MAX_FREE_COUNTS} Free Chats
                    </p>
                    <Progress 
                        className=" bg-white border-black border-1"
                        value={(apiLimitCount) / MAX_FREE_COUNTS * 100}
                    />
                </div>
            </CardContent>
        </Card>
    </div>
    )
}