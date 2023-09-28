"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./constants"
import { useForm } from "react-hook-form";
import axios from "axios";
import { z } from "zod";
import { ChatCompletionRequestMessage } from "openai";
import { useState } from "react";
import { userProModal } from "@/hooks/use-pro-modal";
import { useRouter } from "next/navigation";
import { Toast } from "@/components/ui/toast";
import { Heading } from "lucide-react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
//import { ChatCompletionRequestMessage } from "openai";
export default function ExtraPage() {
    const router = useRouter();
    const proModal = userProModal();
    const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });
    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {

            const userMessage: ChatCompletionRequestMessage = {
                role: "user",
                content: values.prompt,
            };
            const newMessages = [...messages, userMessage];

            const response = await axios.post("/api/extra", { messages: newMessages})

            setMessages((current) => [...current, userMessage, response.data]);

            form.reset();

        } catch (error:any) {
            if(error?.response?.status === 403){
                proModal.onOpen()
            } else {
                console.log(error)
            }
        } finally {

            router.refresh();

        }
    };
    return (
        <div>
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}
                        className="rounded-lg border w-full p-2 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                        >
                            <FormField 
                            name="prompt"
                            render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-10">
                                    <FormControl className="m-0 p-0">
                                        <Input
                                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent" disabled={isLoading} placeholder="Design button using tailwind." {...field} autoComplete="off"/>
                                    </FormControl>
                                </FormItem>
                            )}
                            />
                            <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                <div>
                    {messages.map((message) => (
                        <div
                            key={message.content}
                        >
                            {message.role === "user"}
                            {message.content}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}