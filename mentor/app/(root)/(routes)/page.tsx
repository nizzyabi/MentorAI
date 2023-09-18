// This is the main page of the application. It is a server component. It is the page that will be displayed once the user signs in or signs up.

//Imports
import { Categories } from "@/components/categories"
import { SearchInput } from "@/components/search-input"
import prismadb from "@/lib/prismadb"

const RootPage = async () => {
    const categories = await prismadb.category.findMany() // Get all categories from the database

    return (
        <div className="h-full p-4 space-y-2">
            {/* Search Bar imported from components for users to search */}
            <SearchInput />
            <Categories data={categories}/>
        </div>
    )
}

export default RootPage