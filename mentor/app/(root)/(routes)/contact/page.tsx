"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { useForm } from "react-hook-form"

interface FormData {
    name: string;
    email: string;
    issue: string;
  }
const ContactPage = () => {
    const { register, handleSubmit, errors } = useForm<FormData>();
    const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);
  
    const onSubmit = async (data: FormData) => {
      try {
        // Send the form data to your server
        const response = await fetch('/api/submit-form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        if (response.ok) {
          setSubmissionStatus('Form submitted successfully');
        } else {
          setSubmissionStatus('An error occurred while submitting the form');
        }
      } catch (error) {
        console.error('Error submitting the form:', error);
        setSubmissionStatus('An error occurred while submitting the form');
      }
    };

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
                            <Input type="text" name="name" autoComplete="off" placeholder="Jane Doe"/>
                        </div>
                        <div className="w-1/2 px-2">
                            <p className="pl-1 pb-1 text-sm text-muted-foreground">Email</p>
                            <Input type="email" name="email" autoComplete="off" placeholder="Example@gmail.com"/>
                        </div>
                    </div>
                </div>
                <div className="pt-2">
                    <p className="pl-1 pb-1 text-sm text-muted-foreground">Issue / Problem</p>
                    <Input className="pb-32 mb-3 pt-3" />
                </div>
                <Button type="submit">Submit</Button>
            </form>
            {submissionStatus && <p>{submissionStatus}</p>}

        </div>
    )
}

export default ContactPage
