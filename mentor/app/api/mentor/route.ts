// Imports
import prismadb from "@/lib/prismadb";
import { checkSubscription } from "@/lib/subscription";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { checkApiLimit } from "@/lib/api-limit";



export async function POST(req: Request) {
    // Connect to JSON & get the data to parse.
    
    try {
        const body = await req.json();
        const user = await currentUser();
        const { src, name, description, instructions, seed, categoryId } = body

        {/* Check if there is a use*/}
        if (!user || !user.id || !user.firstName) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        {/* Check if all fields are completed */}
        if (!src || !name || !description || !instructions || !seed || !categoryId) {
            return new NextResponse("Missing required fields", { status: 400 })
        }

        const freeTrial = await checkApiLimit();

        if (!freeTrial) {
          return new NextResponse("Free trial limit exceeded", { status: 403 });
        }

        {/* Check Subscription */}
        const isPro = await checkSubscription();
        if(!isPro) {
            return new NextResponse('Pro Subscription Required', { status: 400 })
        }
      // Call data base and interface and create mentor
      const mentor = await prismadb.mentor.create({
        data: {
            categoryId,
            userId: user.id,
            userName: user.firstName,
            src,
            name, 
            description,
            instructions,
            seed
        }
      })

      // return mentor 
      return NextResponse.json(mentor)
      
      // Check and post error if there is one.
    } catch (error) {
        console.log("[MENTOR_POST]", error);
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}