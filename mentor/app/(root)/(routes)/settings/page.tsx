import { ModeToggle } from "@/components/mode-toggle"
import { SubscriptionButton } from "@/components/subscription-button";
import { Separator } from "@/components/ui/separator"
import { checkSubscription } from "@/lib/subscription"

const SettingsPage = async () => {
    // isPro
    const isPro = await checkSubscription();
    return (
        <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
            <h3 className="text-lg text-muted-foreground mb-2 font-bold pb-2">Settings</h3>
            <Separator />
            <div className="pt-5 pb-5">
                <p className="text-md text-muted-foreground mb-2 font-bold">Background Mode</p>
                {/* Importing functionality & button of dark mode from mode-toggle & theme-provider */}
                <ModeToggle />
            </div>
            <Separator />
            <div className="pt-5 pb-5">
                <p className="text-md text-muted-foreground mb-2 font-bold">Membership</p>
                <p className="text-sm text-muted-foreground mb-2">
                    {isPro ? "You are currently on a Pro plan" : "You are currently on a Free plan"}
                </p>
            </div>
            <Separator />
            <div className="pt-5">
                <p className="text-md text-muted-foreground mb-2 font-bold">Manage Account</p>
                <SubscriptionButton isPro={isPro} />
            </div>
        </div>

        
    )
}

export default SettingsPage