// This is the main page of the application. It is a server component. It is the page that will be displayed once the user signs in or signs up.

//Imports
import { Categories } from "@/components/categories"
import { Mentors } from "@/components/mentors";
import { SearchInput } from "@/components/search-input"
import { Button } from "@/components/ui/button";
import { checkApiLimit } from "@/lib/api-limit";
import prismadb from "@/lib/prismadb"
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";

// Create interface for root page showing the mentors
interface RootPageProps {
    searchParams: {
        categoryId: string;
        name: string;
    }
}
const RootPage = async ({
    searchParams
}: RootPageProps) => {
    // Get mentors from database when the user searchs for them using the search bar. The mentors are ordered by the time they were created & also includes messages.
    const data = await prismadb.mentor.findMany({
        where: {
            categoryId: searchParams.categoryId,
            name : {
                search: searchParams.name
            }
        },
        orderBy: {
            createdAt: "asc",
        },
        include: {
            _count: {
                select: {
                    messages: true
                }
            }
        }
    })
    const categories = await prismadb.category.findMany() // Get all categories from the database
    const isPro = await checkSubscription();
    const freeTrial = await checkApiLimit();
    

    return (
        <div className="h-full p-4 space-y-2 ">
            {/* Search Bar imported from components for users to search */}
            <SearchInput isPro={isPro}/>
            <Categories data={categories}/>
            <Mentors data={data} isPro={isPro} freeTrial={freeTrial} />
        </div>
    )
}

export default RootPage