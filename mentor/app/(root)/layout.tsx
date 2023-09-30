// Essentially we are simply making the main root layout once the user signs in. 

import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { checkSubscription } from "@/lib/subscription";

const RootLayout = async ({
    children
}: {
    children: React.ReactNode;
}) => {
    // Check if pro
    const isPro = await checkSubscription();
    return (
        <div className="h-full">
            <Navbar isPro={isPro}/>

            {/* SideBar */}
            <div className="hidden md:flex mt-16 w-20 flex-col fixed inset-y-0 bg-[#ECECF1]">
                <Sidebar isPro={isPro}/>
            </div>
            <main className="md:pl-20 pt-16 h-full bg-[#ECECF1]">
                {children}
            </main>
        </div>
    );
}

export default RootLayout;