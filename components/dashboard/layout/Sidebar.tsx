"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Calendar,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "h-screen bg-white shadow-lg border-r fixed top-0 left-0 transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Top section */}
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && <h1 className="text-xl font-bold">NextAdmin</h1>}

        <Button
          size="icon"
          variant="ghost"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>

      {/* Menu */}
      <nav className="mt-4 space-y-2">
        <Link href="/dashboard">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 rounded-none"
          >
            <LayoutDashboard size={20} />
            {!collapsed && "Dashboard"}
          </Button>
        </Link>

        <Link href="/calendar">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 rounded-none"
          >
            <Calendar size={20} />
            {!collapsed && "Calendar"}
          </Button>
        </Link>

        <Link href="/profile">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 rounded-none"
          >
            <User size={20} />
            {!collapsed && "Profile"}
          </Button>
        </Link>
      </nav>
    </aside>
  );
}
