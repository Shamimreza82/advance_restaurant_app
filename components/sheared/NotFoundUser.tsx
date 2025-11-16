// components/sheared/NotFound.tsx
"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFoundUser() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-6xl font-extrabold text-slate-900 mb-4">404</h1>
      <p className="text-xl text-slate-600 mb-6">
        Oops! The page you are looking for does not exist.
      </p>
      <Link href="/">
        <Button variant="default" className="px-6 py-3">
          Go Back Home
        </Button>
      </Link>
    </div>
  );
}
