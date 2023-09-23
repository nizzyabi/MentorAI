import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

// Hard coded constant for a while day in ms

const DAY_IN_MS = 86_400_000;

// Check if subscription is valid
export const checkSubscription = async () => {
    const { userId } = auth();

    if (!userId) {
        return false;
    }
    // fetch user subscription
    const userSubscription = await prismadb.userSubscription.findUnique({
        where: {
            userId: userId,
        },
        select: {
            stripeCurrentPeriodEnd: true,
            stripeCustomerId: true,
            stripePriceId: true,
            stripeSubscriptionId: true,
        }
    })
    // if not able to fetch user subscription
    if (!userSubscription) {
        return false;
    }
    // if user subscription already exists, validate that it is current

    const isValid = 
        userSubscription.stripePriceId &&
        userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();
    
    // turn into boolean
    return !!isValid;
}
