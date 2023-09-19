'use client'
import { Button } from "@/components/ui/button"
// Imports

import { Input } from "@/components/ui/input"
const ContactPage = () => {

    const inputFeilds = [
        {
            name: "name",
            placeholder: "Name",
        },
        {
            name: "email",
            placeholder: "Email",
        },
        {
            name: "subject",
            placeholder: "Subject",
        }
    ]
    return(
        <div className="">
            {inputFeilds.map((inputFeild, index) => (
                <Input 
                    key={index}
                    name={inputFeild.name}
                    placeholder={inputFeild.placeholder}
                    className="w-60 h-8 border-white"
                />
            ))}
            <Input 
                placeholder="Message"
                name="message"
                type="textarea"
                className="pb-40 pt-4 border-white flex flex-col items-center"
            />
            <Button
            className="w-50"
            >
                Submit
            </Button>
        </div>
    )
}

export default ContactPage