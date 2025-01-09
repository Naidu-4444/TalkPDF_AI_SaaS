import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { FilePlus2 } from "lucide-react";

const Header = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="ml-4">
        <Image
          src="/assets/logo.png"
          alt="Talk PDF Logo"
          width={48}
          height={48}
        />
      </div>
      <SignedIn>
        <div className="flex space-x-4 mr-5 items-center">
          <Button asChild variant="link" className="hidden md:flex">
            <Link href="/dashboard/upgrade" className=" font-semibold">
              Pricing
            </Link>
          </Button>
          <Button asChild variant="outline" className="hidden md:flex">
            <Link href="/dashboard" className="font-semibold">
              My Documents
            </Link>
          </Button>
          <Button asChild variant="outline" className="hidden md:flex">
            <Link href="/dashboard/upload" className="font-semibold">
              <FilePlus2 className="text-blue-500" />
            </Link>
          </Button>

          <UserButton />
        </div>
      </SignedIn>
    </div>
  );
};
export default Header;
