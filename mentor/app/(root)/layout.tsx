// Essentially we are simply making the main root layout once the user signs in. 

import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const RootLayout = async ({
    children
}: {
    children: React.ReactNode;
}) => {
    // Api limit count
    const apiLimitCount = await getApiLimitCount();
    // Check if pro
    const isPro = await checkSubscription();
    return (
        <div className="h-full bg-secondary">
            <Navbar isPro={isPro} apiLimitCount={apiLimitCount}/>

            {/* SideBar */}
            <div className="hidden md:flex mt-[62px] fixed w-20 flex-col inset-y-0 bg-secondary">
                <Sidebar isPro={isPro} />
            </div>
            <main className="md:pl-20 pt-20 h-full bg-secondary">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                >
                    {children}
                </ThemeProvider>
            </main>
        </div>
    );
}

export default RootLayout;