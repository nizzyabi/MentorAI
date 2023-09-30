"use client"
import { Mentor } from "@prisma/client";
import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation";
import { Info, Home, Plus, Settings, Contact, Users, Expand } from "lucide-react";
import { userProModal } from "@/hooks/use-pro-modal";
import { currentUser, useUser } from "@clerk/nextjs";


interface SidebarProps {
    isPro: boolean;
    data: Mentor;
}
export const Sidebar = ({
    isPro,
    data
}: SidebarProps) => {
    // usePathname is a hook that returns the current pathname of the page. It is a custom hook for stateful navigation & logic.
    const pathname = usePathname()

    const { user }  = useUser();

    // Used to access the router object & manage routes.
    const router = useRouter();

    // ProModal
    const proModal = userProModal()
    // the pro wil be used to protect a link or not for the pro users. in this routes variable, we are doing a standard array of objects for our side bar. 
    
    const routes = [
        {
            icon: Users,
            href: "/",
            label: "Mentors",
            pro: false,
        },
        {
            icon: Plus,
            href: "/mentor/new",
            label: "New",
            pro: true,
        },
        {
            icon: Info,
            href: "/about",
            label: "About",
            pro: false,
        },
        {
            icon: Contact,
            href: "/contact",
            label: "Contact",
            pro: false,
        },
        {
            icon: Settings,
            href: "/settings",
            label: "Settings",
            pro: false,
        }
    ]

    const routes2 = [
        {
            icon: Users,
            href: "/",
            label: "Mentors",
            pro: false,
        },
        {
            icon: Info,
            href: "/about",
            label: "About",
            pro: false,
        },
        {
            icon: Contact,
            href: "/contact",
            label: "Contact",
            pro: false,
        },
        {
            icon: Settings,
            href: "/settings",
            label: "Settings",
            pro: false,
        }
    ]
    
    // This is a variable that manages the routes of the sidebar. if the user is not pro, for the routes that are pro, we will not display them but take them to an upgrade page if they try and access it.
    const onNavigate = (url: string, pro: boolean) => {
        // check if pro
        if (pro && !isPro) {
            return proModal.onOpen()
        }

        // Return URL
        return router.push(url)
    }

    return (
        <div className="space-y-4 flex flex-col h-full text-primary mt-5 bg-[#ECECF1]">
            {user?.id === 'user_2VTrfY3GPyZltXWvDX6RB955lcC' ? (
                <div className="p-3 flex flex-1 justify-center">
                {/* Mapping through each object of the route variable data. */}
                <div className="space-y-2">
                    {routes.map((route) => (
                        <div
                        // take user to desired route when clicked
                            onClick={() => onNavigate(route.href, route.pro)}
            
                            // Rendering the route elements with conditional styling based on wether the pathname matches the href of the route. Using key attirbute for efficient rendering. When the route is active (when user is on that page), there is a different color to the text and background)
                            key={route.href} 
                                        className={cn(
                                        "text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-secondary/1 hover:opacity-75 transition rounded-lg text-black"
                                        ,
                                        pathname === route.href && "bg-gray-300 text-black"
                            )}
                             >
                            {/* Design & display icon & label */}
                            <div className="flex flex-col gap-y-2 items-center flex-1">
                                <route.icon className="h-5 w-5"/>
                                {route.label}
                            </div>
                            </div>
                            ))}
                            </div>
                        </div>
            ) : (
                <div className="p-3 flex flex-1 justify-center">
                {/* Mapping through each object of the route variable data. */}
                <div className="space-y-2">
                    {routes2.map((route) => (
                        <div
                            // take user to desired route when clicked
                            onClick={() => onNavigate(route.href, route.pro)}

                            // Rendering the route elements with conditional styling based on wether the pathname matches the href of the route. Using key attirbute for efficient rendering. When the route is active (when user is on that page), there is a different color to the text and background)
                            key={route.href} 
                            className={cn(
                            "text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-secondary/1 hover:opacity-75 transition rounded-lg text-black"
                            ,
                            pathname === route.href && "bg-gray-300 text-black"
                            )}
                        >
                            {/* Design & display icon & label */}
                            <div className="flex flex-col gap-y-2 items-center flex-1">
                                <route.icon className="h-5 w-5"/>
                                {route.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            )}
        </div>
    )
}