"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSession, signOut } from "next-auth/react"

const rankingCategories = [
  { name: "Colleges", href: "/ranking/colleges" },
  { name: "Engineering", href: "/ranking/engineering" },
  { name: "University", href: "/ranking/university" },
  { name: "Overall", href: "/ranking/overall" },
]

const navItems = [
  { name: "Home", href: "/" },
  { name: "Parameters", href: "/parameters" },
  { name: "Ranking", href: "/ranking/2024", dropdown: true },
  { name: "Documents", href: "/documents" },
  { name: "Notification/Advt", href: "/notifications" },
  { name: "FAQs", href: "/faqs" },
  { name: "Contact", href: "/contact" },
]

const Header = () => {
  const { data: session } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`w-full z-50 sticky top-0 transition-all duration-300 ${
        scrolled ? "bg-white/95 shadow-md backdrop-blur-md py-2" : "bg-white/90 py-4"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4">
        {/* Logo and Title */}
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <img
              src="/logo.jpg"
              alt="Rankify Logo"
              className="h-10 w-10 rounded-full bg-white p-0.5 border border-indigo-100 shadow-sm group-hover:shadow-md transition-shadow duration-300"
            />
          </motion.div>
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Rankify
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-1">
          {navItems.map((item) =>
            item.dropdown ? (
              <li key={item.name} className="relative">
                <button
                  className={`px-4 py-2 rounded-md flex items-center text-gray-700 hover:text-indigo-600 transition-colors ${
                    pathname.startsWith("/ranking") ? "text-indigo-600 font-medium" : ""
                  }`}
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                  onClick={() => setDropdownOpen((v) => !v)}
                >
                  {item.name}
                  <ChevronDown className="ml-1 w-4 h-4" />
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 top-full mt-1 w-48 bg-white text-gray-700 shadow-lg rounded-md z-50 border border-gray-100 overflow-hidden"
                      onMouseEnter={() => setDropdownOpen(true)}
                      onMouseLeave={() => setDropdownOpen(false)}
                    >
                      <li>
                        <Link
                          href="/ranking/2024"
                          className={`block px-4 py-2 hover:text-indigo-600 transition-colors ${
                            pathname === "/ranking/2024" ? "bg-indigo-50 text-indigo-600 font-medium" : ""
                          }`}
                        >
                          Latest Rankings
                        </Link>
                      </li>
                      {rankingCategories.map((cat) => (
                        <li key={cat.name}>
                          <Link
                            href={cat.href}
                            className={`block px-4 py-2 hover:text-indigo-600 transition-colors ${
                              pathname === cat.href ? "bg-indigo-50 text-indigo-600 font-medium" : ""
                            }`}
                          >
                            {cat.name}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`px-4 py-2 rounded-md block hover:text-indigo-600 transition-colors ${
                    pathname === item.href ? "text-indigo-600 font-medium" : "text-gray-700"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ),
          )}
          {!session ? (
            <>
              <li>
                <Button asChild variant="outline" className="ml-2 px-4 py-2 font-medium border-primary/20 text-primary hover:bg-primary/10 transition-all">
                  <Link href="/login">Login</Link>
                </Button>
              </li>
              <li>
                <Button asChild className="ml-2 px-4 py-2 font-medium bg-gradient-to-r from-primary to-primary/80 text-white hover:opacity-90 shadow-md hover:shadow-lg transition-all">
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </li>
            </>
          ) : (
            <li className="relative group">
              <Button 
                variant="outline" 
                className="ml-2 px-4 py-2 font-medium border-primary/20 text-primary hover:bg-primary/10"
              >
                {session.user?.name || session.user?.email || 'Account'}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
              <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 shadow-lg rounded-md z-50 border border-gray-200 dark:border-gray-800 overflow-hidden hidden group-hover:block">
                <Link 
                  href="/account" 
                  className="block px-4 py-2 hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  My Account
                </Link>
                <Link 
                  href="/parameters" 
                  className="block px-4 py-2 hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  My Parameters
                </Link>
                <div className="h-px bg-gray-200 dark:bg-gray-800 mx-2"></div>
                <button
                  onClick={() => signOut()}
                  className="block w-full text-left px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors font-medium"
                >
                  Logout
                </button>
              </div>
            </li>
          )}
        </ul>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>          {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-100 shadow-sm overflow-hidden"
          >
            <ul className="flex flex-col w-full px-4 py-2">
              {navItems.map((item) =>
                item.dropdown ? (
                  <li key={item.name} className="relative">
                    <button
                      className={`w-full text-left px-4 py-3 flex items-center justify-between hover:text-indigo-600 rounded transition-colors ${
                        pathname.startsWith("/ranking") ? "text-indigo-600 font-medium" : "text-gray-700"
                      }`}
                      onClick={() => setDropdownOpen((v) => !v)}
                    >
                      {item.name}
                      <ChevronDown
                        className={`ml-1 w-4 h-4 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="bg-gray-50 rounded-md mt-1 overflow-hidden"
                        >
                          <li>
                            <Link
                              href="/ranking/2024"
                              className={`block px-6 py-2 hover:text-indigo-600 transition-colors ${
                                pathname === "/ranking/2024" ? "text-indigo-600 font-medium" : "text-gray-700"
                              }`}
                              onClick={() => {
                                setMenuOpen(false)
                                setDropdownOpen(false)
                              }}
                            >
                              Latest Rankings
                            </Link>
                          </li>
                          {rankingCategories.map((cat) => (
                            <li key={cat.name}>
                              <Link
                                href={cat.href}
                                className={`block px-6 py-2 hover:text-indigo-600 transition-colors ${
                                  pathname === cat.href ? "text-indigo-600 font-medium" : "text-gray-700"
                                }`}
                                onClick={() => {
                                  setMenuOpen(false)
                                  setDropdownOpen(false)
                                }}
                              >
                                {cat.name}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                ) : (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`block px-4 py-3 hover:text-indigo-600 transition-colors rounded ${
                        pathname === item.href ? "text-indigo-600 font-medium" : "text-gray-700"
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ),
              )}
              
              {/* Authentication options for mobile */}
              {!session ? (
                <>
                  <li className="px-4 py-2">
                    <Button asChild variant="outline" className="w-full font-medium border-primary/20 text-primary hover:bg-primary/10">
                      <Link href="/login" onClick={() => setMenuOpen(false)}>
                        Login
                      </Link>
                    </Button>
                  </li>
                  <li className="px-4 py-2">
                    <Button asChild className="w-full bg-gradient-to-r from-primary to-primary/80 text-white hover:opacity-90 shadow-sm font-medium">
                      <Link href="/signup" onClick={() => setMenuOpen(false)}>
                        Sign Up
                      </Link>
                    </Button>
                  </li>
                </>
              ) : (
                <>
                  <li className="px-4 py-3 bg-primary/5 border-l-4 border-primary rounded">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-primary">Signed in as</p>
                      <p className="text-sm font-semibold">{session.user?.name || session.user?.email}</p>
                    </div>
                  </li>
                  <li className="px-4 py-1">
                    <Link 
                      href="/account" 
                      className="flex items-center py-2 px-1 text-gray-700 dark:text-gray-200 rounded-md hover:bg-primary/5 transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      <svg className="h-5 w-5 mr-2 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      My Account
                    </Link>
                  </li>
                  <li className="px-4 py-1">
                    <Link 
                      href="/parameters" 
                      className="flex items-center py-2 px-1 text-gray-700 dark:text-gray-200 rounded-md hover:bg-primary/5 transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      <svg className="h-5 w-5 mr-2 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      My Parameters
                    </Link>
                  </li>
                  <li className="px-4 py-1 mt-1">
                    <div className="h-px bg-gray-200 dark:bg-gray-700"></div>
                  </li>
                  <li className="px-4 py-1">
                    <button
                      className="w-full flex items-center py-2 px-1 text-red-600 dark:text-red-400 rounded-md hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors font-medium"
                      onClick={() => {
                        signOut();
                        setMenuOpen(false);
                      }}
                    >
                      <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </li>
                </>
              )}
              
              <li className="px-4 py-3">
                <Button asChild className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                  <Link href="/ranking/2024" onClick={() => setMenuOpen(false)}>
                    Latest Rankings
                  </Link>
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
