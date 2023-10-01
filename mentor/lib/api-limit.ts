import { auth } from "@clerk/nextjs"
import prismadb from "@/lib/prismadb"
import { MAX_FREE_COUNTS } from "@/constants";

// Increase api limit function
export const increaseApiLimit = async () => {
    // Get userId
    const { userId } = auth();

    // If userId is not found, return
    if(!userId) {
        return;
    }

    // Functionality of api limit (+1 after each text)
    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId
        }
    });

    if (userApiLimit) {
        await prismadb.userApiLimit.update({
        where: { userId: userId },
        data: { count: userApiLimit.count + 1 },
        });
    } else {
        await prismadb.userApiLimit.create({
        data: { userId: userId, count: 1 },
        });
    }
};

// Check Api limit function to check if user has reached limit 
export const checkApiLimit = async () => {
    // Get userId
    const { userId } = auth();

    // If userId is not found, return false
    if(!userId) {
        return false;
    }
    // Check if user reached limit
    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId: userId
        }
    });
    // If api limit not reached keep going
    if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
        return true;
    } else {
        return false;
    }
}

// Get API limit count for UI
export const getApiLimitCount = async () => {
    // Get userId
    const { userId } = auth();
    // If no user, return 0;
    if (!userId) {
        return 0;
    }

    // Get the userId from the db
    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId
        }
    });

    // if no userApiLimit, return 0
    if (!userApiLimit) {
        return 0;
    }

    // return the count
    return userApiLimit.count;
}