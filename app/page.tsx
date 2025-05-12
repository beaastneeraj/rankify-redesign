"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, BarChart3, LineChart, PieChart, TrendingUp, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-background via-muted/50 to-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <motion.h1
                  className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Data-Driven Rankings for Informed Decisions
                </motion.h1>
                <motion.p
                  className="max-w-[600px] text-muted-foreground md:text-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Customize parameters, visualize data, and make better decisions with our transparent ranking platform.
                </motion.p>
              </div>
              <motion.div
                className="flex flex-col gap-2 min-[400px]:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Button asChild>
                  <Link href="/parameters">
                    Customize Parameters <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/ranking">View Rankings</Link>
                </Button>
              </motion.div>
            </div>
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/20 rounded-full blur-3xl" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-4 w-full max-w-[400px]">
                    <Card className="col-span-2 bg-card/60 backdrop-blur-sm border-primary/20">
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm flex items-center">
                          <BarChart3 className="h-4 w-4 mr-2 text-primary" />
                          Overall Rankings
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="w-full h-[100px] bg-primary/10 rounded-md flex items-center justify-center">
                          <BarChart3 className="h-12 w-12 text-primary/40" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-card/60 backdrop-blur-sm border-secondary/20">
                      <CardHeader className="p-3">
                        <CardTitle className="text-xs flex items-center">
                          <LineChart className="h-3 w-3 mr-1 text-secondary" />
                          Trends
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-3 pt-0">
                        <div className="w-full h-[60px] bg-secondary/10 rounded-md flex items-center justify-center">
                          <LineChart className="h-8 w-8 text-secondary/40" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-card/60 backdrop-blur-sm">
                      <CardHeader className="p-3">
                        <CardTitle className="text-xs flex items-center">
                          <PieChart className="h-3 w-3 mr-1 text-primary" />
                          Parameters
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-3 pt-0">
                        <div className="w-full h-[60px] bg-primary/10 rounded-md flex items-center justify-center">
                          <PieChart className="h-8 w-8 text-primary/40" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform provides all the tools you need to create, customize, and analyze rankings.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            {[
              {
                title: "Dynamic Parameters",
                description: "Adjust parameter weights with interactive sliders that visually represent importance.",
                icon: <TrendingUp className="h-10 w-10 text-primary" />,
              },
              {
                title: "CSV Processing",
                description: "Seamlessly import and process data from CSV files with our intuitive uploader.",
                icon: <BarChart3 className="h-10 w-10 text-primary" />,
              },
              {
                title: "Responsive Design",
                description: "Enjoy a consistent experience across all devices with our mobile-optimized interface.",
                icon: <Users className="h-10 w-10 text-primary" />,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center space-y-2 p-6 bg-background rounded-xl border"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="p-2 bg-primary/10 rounded-full">{feature.icon}</div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground text-center">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Get Started?</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Explore our platform and discover the power of customizable rankings.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Button size="lg" asChild>
                <Link href="/parameters">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
