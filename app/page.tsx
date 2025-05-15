"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, BarChart3, LineChart, PieChart, TrendingUp, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import HeroGeometric from "@/components/HeroGeometric"

export default function Home() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start overflow-hidden bg-[#030303]">
      <HeroGeometric badge="Rankify" title1="Rankify" title2="Data-Driven Rankings" />
      {/* Features Section (moved below hero) */}
      <section className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-8 flex flex-col items-center mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <Card className="bg-[#181c2f] border-0 shadow-2xl flex flex-col items-center">
            <CardHeader className="flex flex-col items-center pb-2">
              <BarChart3 className="h-12 w-12 text-[#7b7fff] mb-3" />
              <CardTitle className="text-2xl font-bold text-white text-center">Dynamic Parameters</CardTitle>
            </CardHeader>
            <CardContent className="text-[#e0e6f7] text-center text-base">Adjust parameter weights with interactive sliders for personalized rankings.</CardContent>
          </Card>
          <Card className="bg-[#181c2f] border-0 shadow-2xl flex flex-col items-center">
            <CardHeader className="flex flex-col items-center pb-2">
              <LineChart className="h-12 w-12 text-[#ff7b9c] mb-3" />
              <CardTitle className="text-2xl font-bold text-white text-center">Transparent Methodology</CardTitle>
            </CardHeader>
            <CardContent className="text-[#e0e6f7] text-center text-base">Explore our open, data-driven ranking process based on official NIRF datasets.</CardContent>
          </Card>
          <Card className="bg-[#181c2f] border-0 shadow-2xl flex flex-col items-center">
            <CardHeader className="flex flex-col items-center pb-2">
              <Users className="h-12 w-12 text-[#5ee6e6] mb-3" />
              <CardTitle className="text-2xl font-bold text-white text-center">Responsive Design</CardTitle>
            </CardHeader>
            <CardContent className="text-[#e0e6f7] text-center text-base">Enjoy a seamless experience across all devices with our mobile-optimized interface.</CardContent>
          </Card>
        </div>
      </section>
      {/* CTA Section */}
      <section className="w-full py-16 md:py-28 lg:py-36 bg-[#030303] flex flex-col items-center">
        <div className="container px-4 md:px-6 flex flex-col items-center">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-white">Ready to Get Started?</h2>
              <p className="max-w-xl text-[#e0e6f7] md:text-xl mx-auto">
                Explore our platform and discover the power of customizable rankings.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Button size="lg" asChild className="px-8 py-4 text-lg rounded-full font-bold bg-gradient-to-r from-[#7b7fff] to-[#ff7b9c] text-white shadow-xl hover:from-[#6a6ae6] hover:to-[#ff7b9c]">
                <Link href="/parameters">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
