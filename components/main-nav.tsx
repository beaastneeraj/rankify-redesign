"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"

export function MainNav() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/parameters",
      label: "Parameters",
      active: pathname === "/parameters",
    },
    {
      href: "/ranking",
      label: "Rankings",
      active: pathname === "/ranking" || pathname.startsWith("/ranking/"),
    },
    {
      href: "/documents",
      label: "Documents",
      active: pathname === "/documents",
    },
    {
      href: "/notifications",
      label: "Notifications",
      active: pathname === "/notifications",
    },
    {
      href: "/faq",
      label: "FAQ",
      active: pathname === "/faq",
    },
    {
      href: "/contact",
      label: "Contact",
      active: pathname === "/contact",
    },
  ]

  return (
    <div className="flex h-16 items-center justify-between px-4 md:px-6">
      <Link href="/" className="flex items-center space-x-2">
        <Logo />
      </Link>
      <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "transition-colors hover:text-foreground/80 relative",
              route.active ? "text-foreground" : "text-foreground/60",
            )}
          >
            {route.label}
            {route.active && (
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                layoutId="navbar-indicator"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
          </Link>
        ))}
      </nav>
      <div className="flex items-center space-x-2">
        <ThemeToggle />
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden">
          <motion.div
            className="fixed inset-y-0 right-0 w-full max-w-xs bg-background p-6 shadow-lg"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ ease: "easeOut", duration: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <Logo />
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-5 w-5" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>
            <nav className="mt-6 flex flex-col space-y-4">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "py-2 transition-colors hover:text-foreground/80",
                    route.active ? "text-foreground font-medium" : "text-foreground/60",
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {route.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        </div>
      )}
    </div>
  )
}
