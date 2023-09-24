"use client"

import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

//interface
interface SubscriptionButtonProps {
    isPro: boolean;
}
// Button for subscription in settings page

export const SubscriptionButton = ({
    isPro = false
}: SubscriptionButtonProps) => {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const onClick = async () => {
        try {
            setLoading(true);

            const response = await axios.get("/api/stripe");

            window.location.href = response.data.url
        } catch (error) {
            toast({
                variant: "destructive",
                description:"something went wrong"
            })
        } finally {
            setLoading(false);
        }
    }
    return(
        <Button onClick={onClick} disabled={loading} size='sm' variant={isPro? "default" : "upgrade"}>
            {isPro ? "Manage Subscription" : "Upgrade to MentorPro"}
            {!isPro && <Zap className="h-4 w-4 ml-2 fill-white"/>}
        </Button>
    )
}