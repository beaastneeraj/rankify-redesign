"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Phone, MapPin, Twitter, Facebook, Linkedin, Instagram, ArrowUp } from "lucide-react"

const Footer = () => {
  const [year, setYear] = useState<number>()
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    setYear(new Date().getFullYear())

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const footerLinks = [
    {
      title: "Rankings",
      links: [
        { name: "Latest Rankings", href: "/ranking/2024" },
        { name: "Engineering", href: "/ranking/engineering" },
        { name: "Medical", href: "/ranking/medical" },
        { name: "Business", href: "/ranking/business" },
        { name: "Arts & Science", href: "/ranking/arts-science" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Parameters", href: "/parameters" },
        { name: "Methodology", href: "/methodology" },
        { name: "Documents", href: "/documents" },
        { name: "FAQs", href: "/faqs" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Team", href: "/team" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Cookie Policy", href: "/cookie-policy" },
      ],
    },
  ]

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <img src="/logo.jpg" alt="Rankify Logo" className="h-10 w-10 rounded-full bg-white p-0.5" />
              <span className="text-2xl font-bold text-white">Rankify</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Empowering students, parents, and educators with transparent, data-driven, and unbiased college rankings.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-white hover:bg-indigo-600 transition-colors duration-300"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-white hover:bg-indigo-600 transition-colors duration-300"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-white hover:bg-indigo-600 transition-colors duration-300"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-white hover:bg-indigo-600 transition-colors duration-300"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((column, idx) => (
            <div key={idx}>
              <h3 className="text-lg font-semibold mb-4 text-white">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-indigo-400 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-t border-gray-800">
          <div className="flex items-start">
            <Mail className="h-5 w-5 text-indigo-400 mt-1 mr-3" />
            <div>
              <h4 className="text-sm font-medium text-white">Email</h4>
              <a
                href="mailto:info@rankify.com"
                className="text-gray-400 hover:text-indigo-400 transition-colors duration-200"
              >
                info@rankify.com
              </a>
            </div>
          </div>

          <div className="flex items-start">
            <Phone className="h-5 w-5 text-indigo-400 mt-1 mr-3" />
            <div>
              <h4 className="text-sm font-medium text-white">Phone</h4>
              <p className="text-gray-400">+91 123 456 7890</p>
            </div>
          </div>

          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-indigo-400 mt-1 mr-3" />
            <div>
              <h4 className="text-sm font-medium text-white">Address</h4>
              <p className="text-gray-400">
                123 Education Street, Tech Park
                <br />
                Bangalore, Karnataka 560001
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">&copy; {year ? year : ""} Rankify. All rights reserved.</p>
          <div className="flex space-x-6 text-sm text-gray-400">
            <Link href="/privacy-policy" className="hover:text-indigo-400 transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-indigo-400 transition-colors duration-200">
              Terms of Service
            </Link>
            <Link href="/cookie-policy" className="hover:text-indigo-400 transition-colors duration-200">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors duration-300 z-50"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  )
}

export default Footer
