// this takes you to /api/webhook
import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";

// Payment will work like this: there will be a monthly 4$ payment. those who are on the free tier will have access to 8 mentors and no custom mentors.
export async function POST(req: Request) {
    // Make sure it is stripe making request
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;

    // create event
    let event: Stripe.Event;

    // Webhook event
    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
    }

    // session
    const session = event.data.object as Stripe.Checkout.Session;

    // if completed & user clicks on subscription, return subscription
    if(event.type === "checkout.session.completed"){
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        );
        // if there is a request but no userId, return message
        if (!session?.metadata?.userId) {
            return new NextResponse("No user ID", { status: 400 })
        }
        // create new userSubscription
        await prismadb.userSubscription.create({
            data: {
                userId: session?.metadata?.userId,
                stripeSubscriptionId: subscription.id,
                stripeCustomerId: subscription.customer as string,
                stripePriceId: subscription.items.data[0].price.id, 
                stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000
                ),
            },
        });
    }

    // event when user cancels or changes payment
    if (event.type === "invoice.payment_succeeded") {
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        );

        // update user info
        await prismadb.userSubscription.update({
            where: {
                stripeSubscriptionId: subscription.id
            },
            data: {
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
            }
        })
    }

    return new NextResponse(null, { status: 200 });
}