"use client"

import { motion } from "framer-motion"
import { BarChart3 } from "lucide-react"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  showText?: boolean
}

export function Logo({ size = "md", showText = true }: LogoProps) {
  const sizes = {
    sm: {
      icon: "h-6 w-6",
      text: "text-lg",
      container: "gap-1.5",
    },
    md: {
      icon: "h-8 w-8",
      text: "text-xl",
      container: "gap-2",
    },
    lg: {
      icon: "h-10 w-10",
      text: "text-2xl",
      container: "gap-2.5",
    },
  }

  return (
    <motion.div
      className={`flex items-center ${sizes[size].container}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <motion.div
          className={`${sizes[size].icon} bg-gradient-to-br from-primary to-primary-foreground rounded-lg flex items-center justify-center text-primary-foreground`}
          whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
        >
          <BarChart3 className="h-4/6 w-4/6" />
        </motion.div>
        <motion.div
          className="absolute -top-1 -right-1 w-2 h-2 bg-secondary rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        />
      </div>
      {showText && (
        <motion.span
          className={`font-bold ${sizes[size].text} bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent`}
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          Rankify
        </motion.span>
      )}
    </motion.div>
  )
}
