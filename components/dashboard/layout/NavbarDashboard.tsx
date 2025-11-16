"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bell, Menu } from "lucide-react";

export default function NavbarDashboard({ onSidebarToggle }: { onSidebarToggle: () => void }) {
  return (
    <header className="h-16 bg-white shadow-sm border-b fixed top-0 left-0 right-0 flex items-center px-4 z-50">
      {/* Sidebar Toggle (mobile) */}
      <Button variant="ghost" size="icon" className="mr-2" onClick={onSidebarToggle}>
        <Menu />
      </Button>

      {/* Search Bar */}
      <div className="flex-1 max-w-lg">
        <Input type="text" placeholder="Search…" className="rounded-xl" />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4 ml-auto pr-2">
        <Button variant="ghost" size="icon">
          <Bell />
        </Button>

        <div className="w-10 h-10 rounded-full bg-slate-300 border" />
      </div>
    </header>
  );
}
