"use client";

// Imports
import axios from "axios";
import * as z from "zod"; // from forms shadcn
import { Category, Mentor } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"; 
import { Separator } from "@/components/ui/separator";
import ImageUpload from "@/components/image-upload";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";


// Seed
const PREAMBLE = `You are a billionare entrepeneur whose name is Jeff Bezos. You are a visionary entrepreneur and the founder of Amazon and you will be my personal mentor. You have a passion for e-commerce, space exploration, and advancing technology. You are currently talking to a human who is very curious about your work and vision. You are ambitious and forward-thinking, with a touch of humor. You get SUPER excited about innovations and the potential of space exploration. Be Jeff Bezos.
`;

const SEED_CHAT = `User: Hello, Jeff! I'm thrilled to have you as my mentor.
Jeff: Hi there! I'm excited to be your mentor. What's on your mind today?

User: I've been struggling with making decisions in my business. How do you approach decision-making, especially in high-stakes situations?
Jeff: Decision-making is crucial, and I always start with gathering as much data as possible. But remember, it's also important to trust your instincts. And if you make a mistake, learn from it quickly and move on.

User: That's great advice. Amazon is known for innovation. How do you foster a culture of innovation within a company?
Jeff: Innovation is in Amazon's DNA. It starts with encouraging a culture where it's okay to take risks and even fail sometimes. We also listen closely to our customers and strive to solve their problems. Always stay curious!

User: I've been facing challenges with scaling my business. Any tips on how to scale effectively?
Jeff: Scaling is about being customer-obsessed and thinking long-term. Focus on what your customers need, automate processes, and don't be afraid to delegate. Remember, it's a marathon, not a sprint.

User: Your journey from an online bookstore to Amazon is incredible. What's your advice for aspiring entrepreneurs?
Jeff: Be passionate about what you're building, and be persistent. You'll face setbacks, but they're part of the journey. Surround yourself with a great team, and never stop learning.

User: Thank you, Jeff. Your insights are invaluable. What's one piece of wisdom you'd like to leave me with?
Jeff: Always think long-term. Short-term thinking can lead to short-term results. Build something that will last and make a lasting impact on the world.

User: I'll keep that in mind. Thanks for being an amazing mentor, Jeff!
Jeff: You're very welcome! I'm here to support you on your journey. Feel free to reach out anytime you need guidance or inspiration.
`;

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
    const router = useRouter();
    const { toast } = useToast();
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
    
    // Submit form to front end via console & axios API call.
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            // Update Mentor functionality. If there is inital data update the page to show the ID
            if (initialData) {
                await axios.patch(`/api/mentor/${initialData.id}`, values);
            // Create a mentor functionality
            } else {
                await axios.post("/api/mentor", values);
            }
            toast({
                description: "Success!"
            });
            router.refresh(); // refresh ALL server components to ensure that the new mentor is shown.
            router.push("/")
        // Use toast to show if there is an error
        } catch (error) {
            toast({
                variant: "destructive",
                description: "Something went wrong."
            })
        }
    } 

    return (
        <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
            {/* spread form props */}
            <Form {...form}> 
            {/* handle submit form */}
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-10">
                    <div className="space-y-2 w-full col-span-2">
                        <div>
                            <h3 className="text-lg font-medium">Create a Mentor</h3>
                            <p className="text-sm text-muted-foreground">Create your own custom mentor. It could be anyone in the world!</p>
                        </div>
                        <Separator className="bg-primary/10" />
                    </div>
                    {/* Image Upload Section*/}
                    <FormField 
                        name='src'
                        render={({ field }) => (
                            <FormItem className="flex flex-col items-center justify-center space-y-4">
                                <FormControl>
                                    <ImageUpload
                                        disabled={isLoading}
                                        onChange={field.onChange}
                                        value={field.value}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Let user make Name, Description, & Category of AI Mentor*/}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField 
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="col-span-3 md:col-span-1">
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        {/* Input feild  & spreading feild to get all components in one go. */}
                                        <Input 
                                            disabled={isLoading}
                                            placeholder="Jeff Bezos"
                                            autoComplete="off"
                                            {...field}
                                        />
                                    </FormControl>
                                    {/* Goes underneath Input, to descrbe your input feild for the user.*/}
                                    <FormDescription>
                                        Give your AI Mentor a name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            name="description"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="col-span-3 md:col-span-1">
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        {/* Input feild  & spreading feild to get all components in one go. */}
                                        <Input 
                                            disabled={isLoading}
                                            placeholder={`"CEO of Amazon"`}
                                            autoComplete="off"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    <FormDescription>
                                        Describe who your AI Mentor is.
                                    </FormDescription>
                                </FormItem>
                            )}
                        />
                        <FormField 
                            name="categoryId"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    {/* Form that selects category via a dropdown menu (of the different categories) for the user to slect from*/}
                                    <FormLabel>Category</FormLabel>
                                    <Select
                                        disabled={isLoading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                        autoComplete="off"
                                    >
                                        <FormControl>
                                            <SelectTrigger className="bg-background">
                                                <SelectValue 
                                                    defaultValue={field.value}
                                                    placeholder="Select a category"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        {/* Loop Through the Mentor Form for user to select from categories which is imported from the DataBase */}
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem
                                                    key={category.id}
                                                    value={category.id}
                                                >
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Select a category for your AI Mentor.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    {/* The rest of the form */}
                    <div className="space-y-2 w-full">
                        <div>
                            <h3 className="text-lg font-medium">
                                AI Mentor Instructions
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Detailed instructions for your AI Mentors behaviour
                            </p>
                        </div>
                        <Separator className="bg-primary/10"/>
                    </div>
                    {/* AI MENTOR INSTRUCTIONS */}
                    <FormField 
                            name="instructions"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="col-span-3 md:col-span-1">
                                    <FormLabel>Instructions</FormLabel>
                                    <FormControl>
                                        {/* Input feild  & spreading feild to get all components in one go. */}
                                        <Textarea
                                            className="bg-background resize-none" 
                                            rows={7}
                                            disabled={isLoading}
                                            placeholder={PREAMBLE}
                                            {...field}
                                        />
                                    </FormControl>
                                    {/* Goes underneath Input, to descrbe your input feild for the user.*/}
                                    <FormDescription>
                                        Give detailed instructions on how you want your AI Mentor to act and who they are. Make sure to include that they are going to be your mentor.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    {/* AI MENTOR EXAMPLE CONVERSATION */}
                    <FormField 
                            name="seed"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="col-span-3 md:col-span-1">
                                    <FormLabel>Example Conversation</FormLabel>
                                    <FormControl>
                                        {/* Input feild  & spreading feild to get all components in one go. */}
                                        <Textarea
                                            className="bg-background resize-none" 
                                            rows={7}
                                            disabled={isLoading}
                                            placeholder={SEED_CHAT}
                                            {...field}
                                            autoComplete="off"
                                        />
                                    </FormControl>
                                    {/* Goes underneath Input, to descrbe your input feild for the user.*/}
                                    <FormDescription>
                                        Give your AI Mentor an example conversation for better results.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Edit / Create Mentor Button */}
                        <div className="w-full flex justify-center">
                            <Button size="lg" disabled={isLoading}>
                                {initialData ? "Edit your Mentor" : "Create your Mentor"}
                                <Bot className="w-4 h-4 ml-2"/>
                            </Button>
                        </div>
                </form>
            </Form>
        </div>
    )
}