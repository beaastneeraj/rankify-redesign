"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { TrendingUp, Cpu, Heart, GraduationCap, Users, Award } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Category configuration
const categories = ["overall", "engineering", "medical", "management", "arts", "science"]

const categoryText = {
  overall: "Comprehensive rankings across all disciplines",
  engineering: "Top engineering institutions in India",
  medical: "Leading medical colleges and universities",
  management: "Premier business schools and management institutions",
  arts: "Best colleges for arts and humanities",
  science: "Top institutions for scientific research and education",
}

const categoryIcons = {
  overall: <Award className="h-8 w-8 mb-4 text-primary" />,
  engineering: <Cpu className="h-8 w-8 mb-4 text-primary" />,
  medical: <Heart className="h-8 w-8 mb-4 text-primary" />,
  management: <TrendingUp className="h-8 w-8 mb-4 text-primary" />,
  arts: <Users className="h-8 w-8 mb-4 text-primary" />,
  science: <GraduationCap className="h-8 w-8 mb-4 text-primary" />,
}

export default function RankingPage() {
  const params = useParams()
  const { year } = params

  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted before rendering
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 pb-16">
      <div className="container px-4 md:px-6 pt-8 md:pt-12">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="flex items-center text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <span>/</span>
                <Link href="/ranking" className="hover:text-foreground transition-colors">
                  Ranking
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <span>/</span>
                <span className="font-medium text-foreground">{year}</span>
              </li>
            </ol>
          </nav>

          <motion.div initial="hidden" animate="show" variants={container} className="text-center mb-12">
            <motion.div variants={item}>
              <Badge variant="outline" className="mb-4">
                {year} Rankings
              </Badge>
            </motion.div>
            <motion.h1 variants={item} className="text-4xl md:text-5xl font-bold mb-4">
              College Rankings for {year}
            </motion.h1>
            <motion.p variants={item} className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our comprehensive rankings of top institutions across various disciplines based on transparent,
              data-driven methodology.
            </motion.p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="h-full"
              >
                <Link href={`/ranking/${year}/${category}`} className="h-full block">
                  <Card className="h-full border-border/40 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/80 to-primary/30"></div>
                    <CardHeader>
                      <div className="flex justify-center">{categoryIcons[category as keyof typeof categoryIcons]}</div>
                      <CardTitle className="capitalize text-xl group-hover:text-primary transition-colors duration-300">
                        {category} Rankings
                      </CardTitle>
                      <CardDescription>{categoryText[category as keyof typeof categoryText]}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Discover the top institutions in{" "}
                        {category === "overall" ? "all fields" : `the ${category} field`} based on our comprehensive
                        evaluation methodology.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="ghost"
                        className="w-full group-hover:bg-primary/10 transition-colors duration-300"
                      >
                        View Rankings
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-16 text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Our Ranking Methodology</h2>
            <p className="text-muted-foreground mb-8 max-w-3xl mx-auto">
              Rankings are based on five key parameters: Teaching and Learning Resources, Research and Professional
              Practice, Graduation Outcomes, Outreach and Inclusivity, and Perception. Each of these contributes to the
              overall score and positioning of institutions.
            </p>
            <Button asChild>
              <Link href="/parameters">Customize Parameters</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
