"use client"

// Imports
import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, ChangeEventHandler } from "react";
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useDebounce } from "@/hooks/use-debounce";
import { useAuth } from "@clerk/nextjs";

// interface 

interface SearchInputProps {
    isPro: boolean;
}
// Search & Input components for users to search for current mentors.
export const SearchInput = ({
    isPro
}: SearchInputProps) => {

    // User Id

    const userId = useAuth();

    // Routing & URL query parameters
    const router = useRouter();
    const searchParams = useSearchParams();

    // Extract query parameters from the URL using useSearchParams by retreiving the value of name & category id from the URL.
    const categoryId = searchParams.get("categoryId");
    const name = searchParams.get("name");

    // useState hook to manage the value of the search bar. either there is a name or not.
    const [value, setValue] = useState(name || "");

    // Debounced value from hooks. It will only be triggered every half a second once the user stops typing.
    const debouncedValue = useDebounce<string>(value, 500);

    // Update the state variable when the user types something in the search bar.
    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setValue(e.target.value);   
    }

    // useState hook to manage placeholder mentors for search bar
    const [placeholderIndex, setPlaceholderIndex] = useState(0);

    // mentor examples
    const placeholders = ["Steve Jobs", "Oprah Winfrey", "Warren Buffett", "Henry Ford", "Cristiano Ronaldo", "Jay-Z", "Jack Ma", "Elon Musk", "Jeff Bezos", "Bill Gates", "Mark Zuckerberg", "Lebron James"];

    // This useEffect will execute debouncedValue, router, or categoryId. 
    useEffect(() => {

        // create a query object with the name & category id.
        const query = {
            name: debouncedValue,
            categoryId: categoryId,
        };

        // use qs library to stringify the query into a URL string.
        const url = qs.stringifyUrl({
            url: window.location.href, // GET current URL
            query, // convery into query string.
        }, { skipEmptyString: true, skipNull: true}) // skip empty strings & null values in the URL query parameters;

        // Use the 'router' object to push the new URL to the browser's history, effectively updating the URL.
        router.push(url);
    }, [debouncedValue, router, categoryId]);

    // Set interval every 3 seconds & change the mentor placeholder
    useEffect(() => {
        const interval = setInterval(() => {
          setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
        }, 2000); // Change placeholder every 3 seconds
    
        return () => {
          clearInterval(interval);
        };
      }, []);
    
    return (
        <div>
            <div className={`${!isPro && userId ? "sm: mt-12" : ""} sm:mt-0 relative text-black`}>
                <Input
                    onChange={onChange}
                    value={value}
                    placeholder={`Search for a mentor... Eg. ${placeholders[placeholderIndex]}`}
                     className="pl-4 bg-white text-black border-white border-2 text-sm focus:outline-none"
                    />
            </div>
            
        </div>
    )
}