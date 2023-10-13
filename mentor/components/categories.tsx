"use client"
// This page renders the data of mentors on the main page. we export it to the root page to render there and show for the users. 

// Local Imports
import { cn } from "@/lib/utils";
// Imports
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import qs from "query-string";
import { Category } from "@prisma/client"
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { GalleryVertical, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { set } from "react-hook-form";

// Display all the categories in the database
interface CategoriesProps {
    data: Category[]; // The data prop is an array of Category objects
}
export const Categories = ({
    data
}: CategoriesProps) => {

    const router = useRouter(); // Get the router

    const searchParams = useSearchParams(); // Get the search params

    const categoryId = searchParams.get("categoryId"); // Get the category id from the search params

    const [isOpen, setIsOpen] = useState(false); // Set the dropdown menu to closed by default

    // When a category is clicked, we want to update the url to include the category id
    const onClick = (id: string | undefined) => {
        const query = { categoryId: id} // query is an object with the categoryId
        const url = qs.stringifyUrl({
            url: window.location.href,
            query,
    }, { skipNull: true }) // Skip null values & stringify the url
        router.push(url); // push url to router & search params
    }

    const handleButton = () => {
        setIsOpen(!isOpen);
    }
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>

                    <Button onClick={handleButton}className="bg-transparent text-primary hover:bg-transparent cursor-pointer" size="icon">
                        <SlidersHorizontal className='border-none hover:opacity-60'/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-primary">
                <button
                onClick={() => onClick(undefined)} // When 'newest' button is clicked, we want to reset the search params to undefined & show all mentors.
                className={cn(`
                  flex
                  items-center
                  text-center
                  text-xs
                  md:text-sm
                  px-4
                  md:px-4
                  py-2
                  md:py-3
                  rounded-md
                  bg-none
                  transition
                  pb-2 
                  text-secondary
                  cursor-pointer
                  hover:opacity-75 
                  scroll
                `,
                  !categoryId ? "bg-transparent font-bold" : "transparent"
                )}
            >
                All Mentors
            </button> {/* Styling. But this isn't really a button, more like a search filter. */}
                
                {data.map((item) => (
                <button
                    onClick={() => onClick(item.id)} // When a category is clicked, we want to update the url to include the category id, essentially filtering the mentors by category.
                    
                    className={cn(`
                    flex
                    items-center
                    
                    text-center
                    text-xs
                    md:text-sm
                    px-4
                    md:px-4
                    py-2
                    md:py-3
                    rounded-md
                    bg-none
                    transition
                    pb-2 
                    text-secondary
                    cursor-pointer
                    hover:opacity-75 
                    scroll
                    
                    `,
                      item.id === categoryId ? "bg-none font-bold" : "bg-transparent" // When user clicks on a category, it is highlighted.
                    )}
                    key={item.id}
                >
                    {item.name}
                </button>
            ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}