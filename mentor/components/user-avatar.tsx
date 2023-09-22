"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@clerk/nextjs";


export const UserAvatar = () => {
    // get user from clerk
    const { user } = useUser();

    return (
        // Get the Avatar Image
        <Avatar className="h-12 w-12">
            <AvatarImage src={user?.imageUrl} />
        </Avatar>
    )
};