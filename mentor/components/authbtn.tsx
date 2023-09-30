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
      <Link href="/sign-in">
        {isSignedIn ? (
          <UserButton />
        ) : (
          <Button size="sm" className="text-white bg-black hover:bg-black">
            Sign In
          </Button>
        )}
      </Link>
    </div>
  );
};
