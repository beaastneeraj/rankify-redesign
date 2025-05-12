"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"

interface ParameterKnobProps {
  themeColor?: string
  onChange?: (value: number) => void
  initialValue?: number
  label?: string
  max?: number
}

export default function ParameterKnob({
  themeColor = "indigo",
  onChange,
  initialValue = 0,
  label,
  max = 20,
}: ParameterKnobProps) {
  const knobRef = useRef<HTMLDivElement>(null)
  const [value, setValue] = useState(initialValue)
  const [angle, setAngle] = useState(-135 + (initialValue / max) * 270) // Start angle adjusted for initial value
  const [isDragging, setIsDragging] = useState(false)

  const minAngle = -135
  const maxAngle = 135
  const minValue = 0
  const maxValue = max

  const anglePerStep = (maxAngle - minAngle) / (maxValue - minValue)

  useEffect(() => {
    // Update angle when initialValue changes
    setAngle(-135 + (initialValue / max) * 270)
    setValue(initialValue)
  }, [initialValue, max])

  const updateValueFromAngle = (newAngle: number) => {
    const clampedAngle = Math.max(minAngle, Math.min(maxAngle, newAngle))
    const newValue = Math.round((clampedAngle - minAngle) / anglePerStep)
    setValue(newValue)
    setAngle(clampedAngle)
    if (onChange) onChange(newValue)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!knobRef.current) return

    setIsDragging(true)
    const center = knobRef.current.getBoundingClientRect()
    const originX = center.left + center.width / 2
    const originY = center.top + center.height / 2

    const onMouseMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - originX
      const dy = moveEvent.clientY - originY
      const radians = Math.atan2(dy, dx)
      const deg = radians * (180 / Math.PI)
      updateValueFromAngle(deg)
    }

    const onMouseUp = () => {
      setIsDragging(false)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", onMouseUp)
    }

    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", onMouseUp)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault()
    if (!knobRef.current) return

    setIsDragging(true)
    const center = knobRef.current.getBoundingClientRect()
    const originX = center.left + center.width / 2
    const originY = center.top + center.height / 2

    const onTouchMove = (moveEvent: TouchEvent) => {
      const touch = moveEvent.touches[0]
      const dx = touch.clientX - originX
      const dy = touch.clientY - originY
      const radians = Math.atan2(dy, dx)
      const deg = radians * (180 / Math.PI)
      updateValueFromAngle(deg)
    }

    const onTouchEnd = () => {
      setIsDragging(false)
      window.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("touchend", onTouchEnd)
    }

    window.addEventListener("touchmove", onTouchMove, { passive: false })
    window.addEventListener("touchend", onTouchEnd)
  }

  const rotation = `rotate(${angle}deg)`
  const percentage = (value / maxValue) * 100

  return (
    <div className="flex flex-col items-center">
      <motion.div
        ref={knobRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className={`w-32 h-32 rounded-full border-4 border-gray-200 relative cursor-pointer select-none shadow-md ${isDragging ? "shadow-lg" : ""}`}
        style={{
          background: `conic-gradient(rgb(var(--${themeColor}-500)) 0% ${percentage.toFixed(0)}%, #f3f4f6 0%)`,
        }}
      >
        <div
          className={`absolute left-1/2 top-1/2 w-1 h-12 bg-${themeColor}-600 origin-bottom rounded-t-full`}
          style={{
            transform: `${rotation} translate(-50%, -100%)`,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`w-16 h-16 rounded-full bg-white shadow-inner flex items-center justify-center text-${themeColor}-600 font-bold text-xl`}
          >
            {value}
          </div>
        </div>
      </motion.div>
      {label && (
        <p className="mt-4 text-lg font-medium text-gray-800">
          {label}: {value}
        </p>
      )}
      {!label && <p className="mt-4 text-lg font-medium text-gray-800">Value: {value}</p>}
    </div>
  )
}
