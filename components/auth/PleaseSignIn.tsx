"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { signIn } from "next-auth/react";
import { LogIn } from "lucide-react";
import Image from "next/image";
import SocialLogin from "./SocialLogin";

export default function PleaseSignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-4">
      <Card className="w-full max-w-md bg-slate-900 border-slate-800 shadow-xl rounded-2xl">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center">
            <Image
              src="/lock-icon.png"
              alt="Locked"
              width={60}
              height={60}
              className="opacity-80"
            />
          </div>
          <CardTitle className="text-2xl font-semibold text-white">
            Access Restricted
          </CardTitle>
          <p className="text-slate-400 text-sm">
            Please sign in to continue and access this page.
          </p>
        </CardHeader>

        <CardContent className="flex justify-center">
          <SocialLogin provider="google" className="mt-4 bg-white hover:bg-amber-100" />
        </CardContent>
      </Card>
    </div>
  );
}
