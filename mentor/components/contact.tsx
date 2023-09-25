"use client"
import { FC } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useForm } from "react-hook-form"
import { sendEmail } from '@/utils/send-email';
import { useRouter } from 'next/navigation'
import { toast } from './ui/use-toast'


export type FormData = {
    name: string;
    email: string;
    message: string;
  };

const Contact: FC = () => {
    const router = useRouter();
    const { register, handleSubmit, reset } = useForm<FormData>();
    
    function onSubmit(data: FormData) {
        sendEmail(data);
        router.refresh(); 

        toast({
            title: "Message sent!",
            description: "We will respond within 1-2 hours.",
            duration: 3000,
        })

        reset();

    }

    return (
        <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <h3 className="text-lg font-medium">Contact us</h3>
                    <p className="text-sm text-muted-foreground mb-2">Please inform us of any problem or issue you are facing. We will respond within 1-2 hours.</p>
                </div>
                <Separator className="bg-primary/10" />
                <div className="pt-2">
                    <div className="flex flex-wrap -mx-2">
                        <div className="w-1/2 px-2">
                            <p className="pl-1 pb-1 text-sm text-muted-foreground">Name</p>
                            <Input type="text" autoComplete="off"
                            placeholder='John Doe'
                            />
                           
                        </div>
                        <div className="w-1/2 px-2">
                            <p className="pl-1 pb-1 text-sm text-muted-foreground">Email</p>
                            <Input type="email" autoComplete="off" placeholder="Example@gmail.com"
                            {...register('email', { required: true })}
                            />
                        </div>
                    </div>
                </div>
                <div className="pt-2">
                    <p className="pl-1 pb-1 text-sm text-muted-foreground">Issue / Problem</p>
                    <Input className="pb-32 mb-3 pt-3" {...register('message', { required: true })} />
                </div>
                <Button type="submit">Submit</Button>
            </form>
        </div>
    )
}

export default Contact;
