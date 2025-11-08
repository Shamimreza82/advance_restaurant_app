"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

type NavLinkProps = {
  href: string
  exact?: boolean // match exact path or prefix
  className?: string
  children: React.ReactNode
}

/**
 * NavLink - simple Next.js Link wrapper that marks active links based on pathname.
 * exact = true -> pathname === href
 * exact = false -> pathname startsWith(href) (good for sections)
 */
export function NavLink({ href, exact = false, className = "", children }: NavLinkProps) {
  const pathname = usePathname() || "/"

  const isActive = exact ? pathname === href : pathname === href || pathname.startsWith(href === "/" ? "/" : href)

  const base = "transition font-semibold"
  const activeClass = isActive ? "text-amber-600" : "text-white hover:text-amber-600"

  // simple merge classNames without extra dependency
  const merged = `${base} ${activeClass} ${className}`.trim()

  return (
    <Link href={href} className={merged} aria-current={isActive ? "page" : undefined}>
      {children}
    </Link>
  )
}
