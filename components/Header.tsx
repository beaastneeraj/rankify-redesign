"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const rankingYears = ["2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016"]

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
                      className="absolute left-0 top-full mt-1 w-40 bg-white text-gray-700 shadow-lg rounded-md z-50 border border-gray-100 overflow-hidden"
                      onMouseEnter={() => setDropdownOpen(true)}
                      onMouseLeave={() => setDropdownOpen(false)}
                    >
                      {rankingYears.map((year) => (
                        <motion.li key={year} whileHover={{ backgroundColor: "#EEF2FF" }}>
                          <Link
                            href={`/ranking/${year}`}
                            className={`block px-4 py-2 hover:text-indigo-600 transition-colors ${
                              pathname === `/ranking/${year}` ? "bg-indigo-50 text-indigo-600 font-medium" : ""
                            }`}
                            onClick={() => {
                              setMenuOpen(false)
                              setDropdownOpen(false)
                            }}
                          >
                            {year}
                          </Link>
                        </motion.li>
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
          <li className="ml-2">
            <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <Link href="/ranking/2024">Latest Rankings</Link>
            </Button>
          </li>
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
      <AnimatePresence>
        {menuOpen && (
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
                          {rankingYears.map((year) => (
                            <li key={year}>
                              <Link
                                href={`/ranking/${year}`}
                                className={`block px-6 py-2 hover:text-indigo-600 transition-colors ${
                                  pathname === `/ranking/${year}` ? "text-indigo-600 font-medium" : "text-gray-700"
                                }`}
                                onClick={() => {
                                  setMenuOpen(false)
                                  setDropdownOpen(false)
                                }}
                              >
                                {year}
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
