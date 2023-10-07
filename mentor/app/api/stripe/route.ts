// Imports
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";


// Change this to a Tokenized currency instead of a subscription

// Where the stripe page will be located
const settingsUrl = absoluteUrl("/settings")

export async function GET() {
    try {
        // UserID from clerk
        const { userId } = auth();
        const user = await currentUser();

        // If no user, error
        if (!userId || !user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        // Check if the user has a subscription via prismadb findunique wihtin the userSubscription table
        const userSubscription = await prismadb.userSubscription.findUnique({
            where: {
                userId
            }
        })
        // if the user HAS a subscription, redirect the user to billing portal
        if (userSubscription && userSubscription.stripeCustomerId) {
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: userSubscription.stripeCustomerId,
                return_url: settingsUrl,
            });

            return new NextResponse(JSON.stringify({ url: stripeSession.url }))
        }

        // if users first time subscribing, go to subscription checkout

        const stripeSession = await stripe.checkout.sessions.create({
            success_url: settingsUrl,
            cancel_url: settingsUrl,
            payment_method_types: ["card"],
            // you can change this
            mode: "subscription",
            billing_address_collection: "auto",
            customer_email: user.emailAddresses[0].emailAddress,
            // options of items
            line_items: [
                {
                    price_data: {
                        currency: "USD",
                        product_data: {
                            name: "Mentor Pro",
                            description: "Create Custom AI Mentors & Get Early Access to New Features",
                        },
                        // cost
                        unit_amount: 899,
                        // subscription
                        recurring: {
                            interval: "month",
                        }
                    },
                    quantity: 1,
                }
            ],
            // meta data that gets read after user pays so that we know who payed. 
            metadata: {
                userId
            }
        });
        // return the stripe session url
        return new NextResponse(JSON.stringify({ url: stripeSession.url}))


    } catch (error) {
        console.log("[STRIPE_GET]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}