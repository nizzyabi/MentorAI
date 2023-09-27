"use client"
// This page renders the data of mentors on the main page. we export it to the root page to render there and show for the users. 

// Local Imports
import { cn } from "@/lib/utils";
// Imports
import qs from "query-string";
import { Category } from "@prisma/client"
import { useSearchParams, useRouter } from "next/navigation";


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

    // When a category is clicked, we want to update the url to include the category id
    const onClick = (id: string | undefined) => {
        const query = { categoryId: id} // query is an object with the categoryId
        const url = qs.stringifyUrl({
            url: window.location.href,
            query,
    }, { skipNull: true }) // Skip null values & stringify the url
        router.push(url); // push url to router & search params
    }
    return (
        <div className="w-full overflow-x-auto space-x-2 flex p-1 pb-3">
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
                  bg-primary/10
                  hover:opacity-75
                  transition
                  pb-2  
                `,
                  !categoryId ? "bg-secondary/5 border-red-500 border" : "bg-primary/10"
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
                      px-2
                      md:px-4
                      py-2
                      md:py-3
                      rounded-md
                      border-primary/10
                      bg-primary/10
                      hover:opacity-75
                      transition 
                      pb-2 
                    `,
                      item.id === categoryId ? "bg-secondary/5 border-red-500 border" : "bg-primary/10" // When user clicks on a category, it is highlighted.
                    )}
                    key={item.id}
                >
                    {item.name}
                </button>
            ))} {/* Map through the 'data'  from PrismaDB and display each category */}
        </div>
    )
}