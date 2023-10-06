"use client"
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { userProModal } from "@/hooks/use-pro-modal"
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { Check } from "lucide-react";

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
                    <DialogTitle className="text-center text-3xl">
                        Upgrade to Mentor<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Pro</span>
                    </DialogTitle>

                    {/* Description #1 */}
                    <DialogDescription className="text-center space-y-2">
                        <Check className="inline-block w-5 h-5" />
                        <span className="pl-2"><span className="text-purple-500 font-medium">Create</span> your own AI Mentors</span>
                    </DialogDescription>

                    {/* Description #2 */}
                    <DialogDescription
                    className="text-center space-y-2"> 
                        <Check className="inline-block w-5 h-5" />
                        <span className="pl-2"><span className="text-purple-500 font-medium">Faster & Better</span> Mentor Responses</span>
                    </DialogDescription>

                    {/* Description #3 */}
                    <DialogDescription className="text-center space-y-2">
                        <Check className="inline-block w-5 h-5" />
                        <span className="text-purple-500 font-medium pl-2">Edit & Update </span> your Mentors
                    </DialogDescription>
                    
                    {/* Description #4 */}
                    <DialogDescription className="text-center space-y-2">
                        <Check className="inline-block w-5 h-5" />
                        <span className="text-purple-500 font-medium pl-2">Unlimited </span> Chats with your AI Mentors
                    </DialogDescription>

                    {/* Description #5*/}
                    <DialogDescription
                    className="text-center space-y-2"> 
                        <Check className="inline-block w-5 h-5" />
                        <span className="pl-2"><span className="text-purple-500 font-medium">Early Access</span> to New Mentors & Features</span>
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                <div className="flex justify-between">
                    <p className="text-2xl font-medium">
                        $9
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