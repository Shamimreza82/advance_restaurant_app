"use client";

import { useEffect, useState } from "react";
import { setCookie, getCookie } from "cookies-next";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getCookie("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    setCookie("cookie-consent", "true", { maxAge: 60 * 60 * 24 * 365 }); // 1 year
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-6 left-4 right-4 md:left-auto md:right-6 z-50"
        >
          <Card className="backdrop-blur-xl bg-slate-900/70 border border-slate-700 text-white p-5 rounded-2xl shadow-lg max-w-sm mx-auto">
            <p className="text-sm leading-relaxed mb-4 text-slate-200">
              🍪 We use cookies to improve your experience, remember your preferences, and analyze app usage.
              You can control cookie settings in your browser at any time.{" "}
              <a
                href="/terms-and-policy"
                className="text-blue-400 underline hover:text-blue-300 transition-colors"
              >
                Learn more
              </a>
              .
            </p>

            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setVisible(false)}
                className="border-slate-600 text-slate-300 hover:bg-slate-800"
              >
                Maybe Later
              </Button>
              <Button
                onClick={handleAccept}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium"
              >
                Accept Cookies
              </Button>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
