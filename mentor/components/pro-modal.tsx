"use client"
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { userProModal } from "@/hooks/use-pro-modal"
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

// When user clicks on Pro Button, this will appear, showcasing what will come with the subscription. 
export const ProModal = () => {

    // import proModal from use-pro-modal.tsx
    const proModal = userProModal()
    // Toast
    const { toast } = useToast();
    // Loading State
    const [loading, setLoading] = useState(false);
    // When they click on sub take them to pay
    const onSubscribe = async () => {
        try {
            // take them to stripe based on wetehr or not they are subscribed or not.
            setLoading(true);
            const response = await axios.get("/api/stripe");

            window.location.href = response.data.url
        } catch (error) {
            toast({
                variant: "destructive",
                description: "something went wrong."
            })
        } finally {
            // reset loading to false
            setLoading(false);
        }
    }


    return (
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
            <DialogContent>
                <DialogHeader className="space-y-4">
                    <DialogTitle className="text-center">
                        Upgrade to MentorPro
                    </DialogTitle>
                    <DialogDescription className="text-center space-y-2">
                        Create <span className="text-purple-500 font-medium">Custom AI</span> Mentors!
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                <div className="flex justify-between">
                    <p className="text-2xl font-medium">
                        $3
                        <span className="text-sm font-normal">
                            .99 / month
                        </span>
                    </p>
                    <Button disabled={loading} variant="upgrade" onClick={onSubscribe}>
                        Subscribe
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
};