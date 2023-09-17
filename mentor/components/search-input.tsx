"use client"
// Imports
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

// Search & Input components for users to search for current mentors.
export const SearchInput = () => {
    return (
        <div className="relative">
            <Search className="absolute h-4 w-4 top-3 left-4 text-muted-foreground" />
            <Input
                placeholder="Search for mentor... e.g. 'Steve Jobs'"
                className="pl-10 bg-primary/10"
            />
        </div>
    )
}