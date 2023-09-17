//This is the main page of the application. It is the page that will be displayed once the user signs in.

import { SearchInput } from "@/components/search-input"

const RootPage = () => {
    return (
        <div className="h-full p-4 space-y-2">
            {/* Search Bar imported from components for users to search */}
            <SearchInput />
        </div>
    )
}

export default RootPage