"use client";

// Imports
import * as z from "zod"; // from forms shadcn
import { Category, Mentor } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"; 
import { Separator } from "@/components/ui/separator";
// Interface for mentor form
interface MentorFormProps {
    initialData: Mentor | null;
    categories: Category[];
}

// Form schema for creating mentor
const formSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required.",
    }),
    description: z.string().min(1, {
        message: "Description is required.",
    }),
    instructions: z.string().min(100, {
        message: "Instructions require atleast 100 characters.",
    }),
    seed: z.string().min(200, {
        message: "Seed requires atleast 200 characters.",
    }),
    src: z.string().min(1, {
        message: "Image is required.",
    }),
    categoryId: z.string().min(1, {
        message: "Category is required",
    }),
})


// Form for creating a new mentor
export const MentorForm = ({
    categories,
    initialData
}: MentorFormProps) => {
    {/* Sepcify form data will handle FormSchema data */}
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            description: "",
            instructions: "",
            seed: "",
            src: "",
            categoryId: undefined,
        }
    });

    const isLoading = form.formState.isSubmitting; // loading state
    
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
    } // submit function

    return (
        <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
            {/* spread form props */}
            <Form {...form}> 
            {/* handle submit form */}
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-10">
                    <div className="space-y-2 w-full col-span-2">
                        <div>
                            <h3 className="text-lg font-medium">General Information</h3>
                            <p className="text-sm text-muted-foreground">General information about your Mentor</p>
                        </div>
                        <Separator className="bg-primary/10" />
                    </div>
                    <FormField 
                        name='src'
                        render={({ field }) => (
                            <FormItem className="flex flex-col items-center justify-center space-y-4">
                                <FormControl>
                                    Image Upload Component
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </div>
    )
}