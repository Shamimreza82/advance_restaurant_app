"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function NotFound() {



  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white p-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="max-w-4xl w-full"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left - Visual card */}
            <Card className="p-8 shadow-xl border-0">
              <CardContent className="flex flex-col items-start gap-6">
                <div className="rounded-full bg-gradient-to-tr from-indigo-600 via-violet-500 to-pink-500 p-4 shadow-lg">
                  <div className="w-20 h-20 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                    <span className="text-3xl font-extrabold text-white">404</span>
                  </div>
                </div>

                <div>
                  <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
                    Oops — page not found
                  </h1>
                  <p className="mt-2 text-sm text-muted-foreground max-w-xl">
                    The page you are looking for doesn’t exist, has been moved, or
                    is temporarily unavailable. Try searching or go back home.
                  </p>
                </div>

                <div className="w-full flex flex-col sm:flex-row gap-3">
                  <form
                    onSubmit={(e) => e.preventDefault()}
                    className="flex w-full gap-2 items-center"
                  >
                    <label className="sr-only">Search</label>
                    <Input
                      placeholder="Search the site or enter a URL"
                      className="flex-1"
                      aria-label="Search"
                    />
                    <Button type="submit" className="flex-shrink-0">
                      <Search className="mr-2" />
                      Search
                    </Button>
                  </form>

                  <Link href="/" className="w-full sm:w-auto">
                    <Button variant="ghost" className="w-full">
                      Take me home
                    </Button>
                  </Link>
                </div>

                <div className="w-full border-t pt-4 mt-2 text-sm text-muted-foreground">
                  <p>
                    Want help? <Link href="/contact" className="underline">Contact support</Link> or
                    check our <Link href="/sitemap.xml" className="underline">sitemap</Link>.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Right - Illustration / suggestions */}
            <div className="flex flex-col gap-6">
              <div className="bg-gradient-to-b from-white to-slate-50 rounded-2xl p-6 shadow-md border">
                <h3 className="text-lg font-semibold">You might like</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link href="/docs" className="underline">Documentation</Link> — Quick start guides &amp; API docs
                  </li>
                  <li>
                    <Link href="/blog" className="underline">Blog</Link> — Latest product updates
                  </li>
                  <li>
                    <Link href="/pricing" className="underline">Pricing</Link> — Find the right plan
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-600 to-violet-500 p-6 text-white shadow-lg">
                <h4 className="text-xl font-bold">Need quick help?</h4>
                <p className="mt-2 text-sm opacity-90">
                  Our support team is happy to assist. You can also return to the
                  homepage and try a different route.
                </p>

                <div className="mt-4 flex gap-3">
                  <Link href="/contact">
                    <Button className="ring-0">Contact Us</Button>
                  </Link>

                  <Link href="/">
                    <Button variant="outline">Home</Button>
                  </Link>
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                <p>
                  Tip: If you typed a URL directly, check for a typo or try removing
                  the last part of the path.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}
