// Essentially we are simply making the main root layout once the user signs in. 

import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
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
        <div className="h-full">
            <Navbar isPro={isPro} apiLimitCount={apiLimitCount}/>

            {/* SideBar */}
            <div className="hidden md:flex mt-16 w-20 flex-col fixed inset-y-0 bg-[#0f0e0e]">
                <Sidebar isPro={isPro} />
            </div>
            <main className="md:pl-20 pt-16 h-full bg-[#0f0e0e]">
                {children}
            </main>
        </div>
    );
}

export default RootLayout;