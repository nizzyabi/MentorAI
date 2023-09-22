import { ModeToggle } from "@/components/mode-toggle"
import { Separator } from "@/components/ui/separator"

const SettingsPage = () => {
    return (
        <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
            <h3 className="text-lg font-medium">Settings</h3>
            <Separator className="bg-primary/10" />
            <div className="pt-5">
                <p className="text-md text-muted-foreground mb-2">Background Mode</p>
                {/* Importing functionality & button of dark mode from mode-toggle & theme-provider */}
                <ModeToggle />
            </div>
                
            <div className="pt-5">
                <p className="text-md text-muted-foreground mb-2">Membership</p>
                <p>PRO</p>
            </div>
            <div className="pt-5">
                <p className="text-md text-muted-foreground mb-2">Account</p>
                
            </div>
        </div>

        
    )
}

export default SettingsPage