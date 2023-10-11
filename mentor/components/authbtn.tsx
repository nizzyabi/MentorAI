import { UserButton, auth, useClerk } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";

interface AuthBtnProps {
  isSignedIn: boolean;
}

export const AuthBtn = ({ isSignedIn }: AuthBtnProps) => {
  const { signOut } = useClerk();
  return (
    <div>
      <Link href='/sign-up'>
        {isSignedIn ? (
          <UserButton />
        ) : (
          <Button size="sm" className="text-white hover:opacity-75 " variant="upgrade">
            Sign Up
          </Button>
        )}
      </Link>
    </div>
  );
};
