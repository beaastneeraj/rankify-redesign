"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Info } from "lucide-react"

import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface DynamicParameterSliderProps {
  name: string
  value: number
  min: number
  max: number
  description?: string
  onChange: (value: number) => void
  totalWeight: number
}

export function DynamicParameterSlider({
  name,
  value,
  min,
  max,
  description,
  onChange,
  totalWeight,
}: DynamicParameterSliderProps) {
  const [sliderWidth, setSliderWidth] = useState("100%")
  const [isHovered, setIsHovered] = useState(false)

  // Calculate the slider width based on the parameter's weight relative to total
  useEffect(() => {
    if (totalWeight > 0) {
      // Ensure slider is at least 30% and at most 100% of container width
      const widthPercentage = Math.max(30, Math.min(100, (value / totalWeight) * 100 * 2))
      setSliderWidth(`${widthPercentage}%`)
    }
  }, [value, totalWeight])

  return (
    <>
      <div
        className="space-y-2 mb-6 relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h4 className="text-sm font-medium">{name}</h4>
            {description && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 ml-1.5 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">{description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <AnimatePresence>
            {isHovered ? (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex items-center space-x-2"
              >
                <Badge variant="outline" className="text-xs">
                  {min}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {max}
                </Badge>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Badge
                  variant={value > (max - min) / 2 + min ? "default" : "outline"}
                  className={cn(
                    "transition-all",
                    value > (max - min) / 2 + min ? "bg-primary text-primary-foreground" : "",
                  )}
                >
                  {value}%
                </Badge>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative w-full h-6 flex items-center">
          <motion.div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-2 bg-primary/20 rounded-full z-0"
            animate={{ width: sliderWidth }}
            transition={{ type: "spring", stiffness: 80, damping: 24 }}
          />
          <Slider
            id={name}
            min={min}
            max={max}
            step={1}
            value={[value]}
            onValueChange={(newValue) => onChange(newValue[0])}
            className="w-full z-10"
          />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-muted-foreground/30" />
        </div>
      </div>
    </>
  )
}
