import { Button } from "@/components/ui/button";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-gradient-to-br from-blue-50 to-purple-50 h-screen">
      <div className="flex flex-col items-center justify-center h-full gap-5">
        <Image
          src="/assets/logo.png"
          alt="Talk PDF Logo"
          width={96}
          height={96}
          className="animate-bounce"
        />
        <h1 className="text-4xl font-bold">
          Talk PDF: Your AI-Powered Document Companion
        </h1>
        <p className="text-gray-700 text-lg">
          Let Your PDFs Speak, Explain, and Answer Questions Instantly!
        </p>
        <Button asChild>
          <Link href="/dashboard"> Get Started</Link>
        </Button>
      </div>
    </main>
  );
}
