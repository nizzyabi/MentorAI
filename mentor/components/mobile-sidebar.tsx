// Imports 
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar } from "@/components/sidebar"

// Code for sidebar for smaller devices using sidebar form Shadcn. It is dymamic and will allow users to click on it and let the contents in the regular sidebar show.
export const MobileSidebar = () => {
    return (
        // Wrap in sheet component for mobile sidebar & to tell code that this is a sheet
        <Sheet>
            {/* When user clicks on Menu, there is an action (via sheet trigger)*/}
            <SheetTrigger className="md:hidden pr-4">
                <Menu />
            </SheetTrigger>
            {/* Content within sidebar (sidebar component) once sheet trigger (menu button) is clicked */}
            <SheetContent side="left" className="p-0 bg-secondary pt-10 w-32">
                <Sidebar />
            </SheetContent>
        </Sheet>
    )
}