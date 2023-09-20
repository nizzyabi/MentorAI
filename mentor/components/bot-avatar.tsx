import { Avatar, AvatarImage } from "@/components/ui/avatar";

// Create Bot Interface
interface BotAvatarProps {
    src: string;
}

export const BotAvatar = ({
    src
}: BotAvatarProps) => {
    return (
        // Get the Avatar Image
        <Avatar className="h-12 w-12 cursor-pointer">
            <AvatarImage src={src} />
        </Avatar>
    )
};