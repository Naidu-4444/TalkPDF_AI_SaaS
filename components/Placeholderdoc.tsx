"use client";

import { PlusCircleIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const Placeholderdoc = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/dashboard/upload");
  };

  return (
    <Button
      className="flex flex-col items-center w-[40%] h-80 rounded-xl bg-gray-200 drop-shadow-md text-gray-400"
      onClick={handleClick}
    >
      <PlusCircleIcon className="w-16 h-16 text-gray-400" />
      <p>Add a document</p>
    </Button>
  );
};
export default Placeholderdoc;
