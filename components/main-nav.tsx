"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Menu, X, User, ChevronDown, LogOut } from "lucide-react"
import { useSession, signOut } from "next-auth/react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"

export function MainNav() {
  const pathname = usePathname()
  const { data: session } = useSession()
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
      href: "/methodology",
      label: "Methodology",
      active: pathname === "/methodology",
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
        <div className="hidden md:flex items-center space-x-2">
          {!session ? (
            <>
              <Button asChild variant="outline" size="sm" className="text-sm font-medium">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild size="sm" className="text-sm font-medium bg-gradient-to-r from-primary to-secondary text-white">
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">{session.user?.name || session.user?.email}</span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/parameters">My Parameters</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account">Account Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()} className="text-red-500 focus:text-red-500">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
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
              
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                {!session ? (
                  <>
                    <Button asChild variant="outline">
                      <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                    </Button>
                    <Button asChild className="bg-gradient-to-r from-primary to-secondary text-white">
                      <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="py-2 px-3 bg-muted rounded-md mb-2">
                      <p className="text-sm text-muted-foreground">Signed in as</p>
                      <p className="font-medium">{session.user?.name || session.user?.email}</p>
                    </div>
                    <Button asChild variant="outline">
                      <Link href="/parameters" onClick={() => setMobileMenuOpen(false)}>My Parameters</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href="/account" onClick={() => setMobileMenuOpen(false)}>Account Settings</Link>
                    </Button>
                    <Button 
                      variant="destructive" 
                      onClick={() => {
                        signOut();
                        setMobileMenuOpen(false);
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        </div>
      )}
    </div>
  )
}
