// Imports
import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { mentorId: string } }
    ) {
    // Connect to JSON & get the data to parse.
    try {
        const body = await req.json();
        const user = await currentUser();
        const { src, name, description, instructions, seed, categoryId } = body

        {/* Check for Mentor ID */}
        if (!params.mentorId) {
            return new NextResponse("Missing mentor ID", { status: 400 })
        }

        {/* Check if there is a user */}
        if (!user || !user.id || !user.firstName) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        {/* Check if all fields are completed */}
        if (!src || !name || !description || !instructions || !seed || !categoryId) {
            return new NextResponse("Missing required fields", { status: 400 })
        }

        {/* Check Subscription */}

      // Call data base and interface and create mentor
      const mentor = await prismadb.mentor.update({
        where: {
            id: params.mentorId
        },
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
        console.log("[MENTOR_PATCH]", error);
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}