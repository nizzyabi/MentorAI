// This works because it is a file in the mentor folder and a dynamic route [] is a folder in the mentor folder. and because our create link is linked to /mentor, the code looks for the mentor folder in routes and finds the [mentorId] folder and then the page.tsx file.

// ADD A MASTER KEY FOR YOU TO REMOVE ANY MENTOR 
import prismadb from "@/lib/prismadb";
import { MentorForm } from "./components/mentor-form";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { userProModal } from "@/hooks/use-pro-modal";

interface MentorIdPageProps {
    params: {
        mentorId: string;
    }
    
}; // this is the type of the params object that expects an object with a mentorId property that is a string

const MentorIdPage = async ({
    params,
    
}: MentorIdPageProps) => {
    // chack if it is the user
    const { userId } = auth();
   
    if (!userId){
        return redirectToSignIn()
    }
    // Check Subscription

    

    const mentor = await prismadb.mentor.findUnique({
        where: {
            id: params.mentorId,
            userId
        }
    }) // fetch exisiting mentor if there is one

    // look for the different mentor categories & set it to the categories variable to be used in the mentor form for creating a new mentor.
    const categories = await prismadb.category.findMany(); // fetch all categories

    return (
        < MentorForm 
            initialData={mentor} // from the mentorform interface
            categories={categories} // from the mentorform interface
            
        />
    )
}

export default MentorIdPage