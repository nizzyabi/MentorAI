import { currentUser } from "@clerk/nextjs";

export const checkUser = currentUser();