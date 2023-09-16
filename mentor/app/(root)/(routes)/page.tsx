// What is going on here is that we are creating a page that is protected by the auth guard because there is () around the folders.
// This is the page that is loaded AFTER sign-in or sign-up. It is the page that is loaded when the user is authenticated.

import { UserButton } from "@clerk/nextjs"

const RootPage = () => {
    return (
        <div>
            {/*UserIcon after sign in & where to take them if they sign-out*/}
            <UserButton afterSignOutUrl="/" />
        </div>
    )
}

export default RootPage