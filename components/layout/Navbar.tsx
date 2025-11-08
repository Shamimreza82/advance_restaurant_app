"use client"

import React, { useMemo, useState } from "react"
import Link from "next/link"
import { ChevronDown, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NavLink } from "./NavLink"
import { usePathname } from "next/navigation"

type DropdownEntry = { title: string; href: string }
type NavItem =
  | { type: "link"; title: string; href: string; exact?: boolean }
  | { type: "dropdown"; title: string; entries: DropdownEntry[] }

const navData: NavItem[] = [
  {
    type: "dropdown",
    title: "HOME",
    entries: [
      { title: "Home 1", href: "/" },
      { title: "Home 2", href: "/home-2" },
    ],
  },
  { type: "link", title: "ABOUT", href: "/about" },
  {
    type: "dropdown",
    title: "MENU",
    entries: [
      { title: "Appetizers", href: "/menu/appetizers" },
      { title: "Main Course", href: "/menu/main-course" },
      { title: "Desserts", href: "/menu/desserts" },
      { title: "Beverages", href: "/menu/beverages" },
    ],
  },
  {
    type: "dropdown",
    title: "PAGES",
    entries: [
      { title: "Gallery", href: "/gallery" },
      { title: "Events", href: "/events" },
      { title: "Testimonials", href: "/testimonials" },
    ],
  },
  {
    type: "dropdown",
    title: "BLOG",
    entries: [
      { title: "Latest Posts", href: "/blog" },
      { title: "Categories", href: "/blog/categories" },
    ],
  },
  { type: "link", title: "CONTACTS", href: "/contacts" },
]



export function Navbar() {
  const pathname = usePathname() || "/"
  const [mobileOpen, setMobileOpen] = useState(false)
  // for mobile dropdowns open/close state
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({})

  const dropdownIsActive = (entries: DropdownEntry[]) =>
    entries.some((e) => pathname === e.href || pathname.startsWith(e.href === "/" ? "/" : e.href))

  const toggleGroup = (title: string) =>
    setOpenGroups((s) => ({ ...s, [title]: !s[title] }))

  // close mobile menu on navigation (simple approach)
  const onNavigate = () => setMobileOpen(false)

  // small helper to render desktop dropdown content (keeps DRY)
  const renderDropdownContent = (entries: DropdownEntry[]) => (
    <DropdownMenuContent className="bg-stone-900 border-stone-800">
      {entries.map((entry) => (
        <DropdownMenuItem asChild key={entry.href}>
          <Link
            href={entry.href}
            className={`w-full ${pathname === entry.href ? "text-amber-600" : "text-white"} `}
          >
            {entry.title}
          </Link>
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  )

  // aria label for the mobile toggle
  const mobileToggleLabel = mobileOpen ? "Close navigation" : "Open navigation"

  return (
    <>
      <nav className="bg-stone-950 text-white px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">BL</span>
          </div>
          <span className="text-2xl font-bold tracking-tight">Bistro Lumière</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
          {navData.map((item, idx) => {
            if (item.type === "link") {
              return (
                <NavLink key={idx} href={item.href} exact={item.exact}>
                  {item.title}
                </NavLink>
              )
            }

            const active = dropdownIsActive(item.entries)
            return (
              <DropdownMenu key={idx}>
                <DropdownMenuTrigger asChild>
                  <button
                    className={`flex items-center gap-1 transition font-semibold ${active ? "text-amber-600" : "text-white hover:text-amber-600"
                      }`}
                  >
                    {item.title}
                    <ChevronDown size={16} />
                  </button>
                </DropdownMenuTrigger>

                {renderDropdownContent(item.entries)}
              </DropdownMenu>
            )
          })}
        </div>

        {/* CTA (hidden on small screens) */}
        <div className="hidden md:block">
          <Link href={"/book-a-table"}>
            <Button className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-2 rounded-md flex-shrink-0">
              BOOK A TABLE
            </Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          aria-expanded={mobileOpen}
          aria-label={mobileToggleLabel}
          className="md:hidden ml-4 p-2 rounded-md text-white hover:bg-white/6 focus:outline-none focus:ring-2 focus:ring-amber-500"
          onClick={() => setMobileOpen((s) => !s)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile slide-in panel */}
      <div
        className={`fixed inset-0 z-50 transition-transform duration-300 ${mobileOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
        aria-hidden={!mobileOpen}
      >
        {/* backdrop */}
        <div
          onClick={() => setMobileOpen(false)}
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${mobileOpen ? "opacity-100" : "opacity-0"
            }`}
        />

        {/* panel */}
        <aside
          className={`absolute right-0 top-0 h-full w-full max-w-xs md:hidden transform transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "translate-x-full"
            } bg-stone-950 text-white shadow-xl`}
        >
          <div className="p-4 flex items-center justify-between border-b border-stone-800">
            <Link href="/" className="flex items-center gap-2" onClick={onNavigate}>
              <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">K</span>
              </div>
              <span className="font-bold text-lg">Kaffen</span>
            </Link>

            <button
              aria-label="Close"
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-md hover:bg-white/6 focus:outline-none"
            >
              <X size={18} />
            </button>
          </div>

          <nav className="p-4 space-y-2">
            {navData.map((item) => {
              if (item.type === "link") {
                return (
                  <div key={item.href}>
                    <NavLink href={item.href} exact={item.exact} className="block px-2 py-3" >
                      <span onClick={onNavigate}>{item.title}</span>
                    </NavLink>
                  </div>
                )
              }

              // dropdown group for mobile (collapsible)
              const isOpen = !!openGroups[item.title]
              return (
                <div key={item.title} className="border-t border-stone-800 pt-2">
                  <button
                    onClick={() => toggleGroup(item.title)}
                    className="w-full flex items-center justify-between px-2 py-3 font-semibold text-white hover:text-amber-600"
                    aria-expanded={isOpen}
                  >
                    <span>{item.title}</span>
                    <ChevronDown className={`transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`} />
                  </button>

                  {isOpen && (
                    <div className="pl-4 mt-1 space-y-1">
                      {item.entries.map((entry) => (
                        <Link
                          key={entry.href}
                          href={entry.href}
                          onClick={onNavigate}
                          className={`block px-2 py-2 text-sm ${pathname === entry.href ? "text-amber-600" : "text-white/90"}`}
                        >
                          {entry.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}

            <div className="pt-4 border-t border-stone-800">
              <Button
                onClick={() => {
                  setMobileOpen(false)
                  // optionally navigate in parent if needed; Link preferred
                }}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-2 rounded-md"
              >
                BOOK A TABLE
              </Button>
            </div>
          </nav>
        </aside>
      </div>
    </>
  )
}
