import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function TermsAndPolicy() {
  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-3xl bg-slate-900 border-slate-800 text-slate-200 shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-white text-center">
            Terms & Privacy Policy
          </CardTitle>
        </CardHeader>

        <CardContent>
          <ScrollArea className="h-[70vh] pr-4">
            <section className="space-y-4 mb-6">
              <h2 className="text-xl font-semibold text-slate-100">1. Introduction</h2>
              <p>
                Welcome to our restaurant app. By accessing or using this app, you agree to these Terms and our Privacy Policy.
                If you do not agree, please do not use the service.
              </p>
            </section>

            <Separator className="bg-slate-800" />

            <section className="space-y-4 my-6">
              <h2 className="text-xl font-semibold text-slate-100">2. Use of Service</h2>
              <p>
                Our app allows users to browse menus, place orders, and make reservations. You agree to use the app responsibly and
                for lawful purposes only.
              </p>
            </section>

            <Separator className="bg-slate-800" />

            <section className="space-y-4 my-6">
              <h2 className="text-xl font-semibold text-slate-100">3. Data Collection</h2>
              <p>
                We collect information such as your name, contact number, email, and order history to provide a better dining experience.
                Your data is securely stored and never sold to third parties.
              </p>
            </section>

            <Separator className="bg-slate-800" />

            <section className="space-y-4 my-6">
              <h2 className="text-xl font-semibold text-slate-100">4. Cookies</h2>
              <p>
                We use cookies to improve your experience, remember your preferences, and analyze app usage. You can control
                cookie settings in your browser at any time.
              </p>
            </section>

            <Separator className="bg-slate-800" />

            <section className="space-y-4 my-6">
              <h2 className="text-xl font-semibold text-slate-100">5. Updates</h2>
              <p>
                We may update these terms from time to time. Continued use of the app after updates means you accept the revised terms.
              </p>
            </section>

            <p className="text-sm text-slate-400 text-center mt-6">
              Last updated: {new Date().getFullYear()}
            </p>
          </ScrollArea>
        </CardContent>
      </Card>
    </main>
  );
}
