"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";

interface SocialLoginProps {
    provider: "google" | "github" | "facebook"; // add more as needed
    callbackUrl?: string;
    className?: string;
}

const providerIcons: Record<string, string> = {
    google: "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg",
    github: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
    facebook: "https://www.facebook.com/images/fb_icon_325x325.png",
};

export default function SocialLogin({ provider, callbackUrl = "/dashboard", className }: SocialLoginProps) {
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
      const result = await signIn(provider, { callbackUrl });
      console.log(result)
        setLoading(false);
    };

    return (
        <Button
            variant="outline"
            onClick={handleLogin}
            className={`w-full flex items-center justify-center gap-2 ${className}`}
            disabled={loading}
        >
            <Image
                height={150}
                width={150}
                src={providerIcons[provider]}
                alt={provider}
                className="w-5 h-5"
            />
            {loading ? `Signing in with ${provider}...` : `Continue with ${provider.charAt(0).toUpperCase() + provider.slice(1)}`}
        </Button>
    );
}
