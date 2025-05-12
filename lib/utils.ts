import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format date to readable string
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(d)
}

// Format number with commas
export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

// Generate random ID
export function generateId(length = 8): string {
  return Math.random()
    .toString(36)
    .substring(2, length + 2)
}

// Parse CSV string to array of objects
export function parseCSV(csv: string): Record<string, string>[] {
  const lines = csv.split("\n")
  const headers = lines[0].split(",").map((header) => header.trim())

  return lines
    .slice(1)
    .map((line) => {
      if (!line.trim()) return {}

      const values = line.split(",")
      return headers.reduce(
        (obj, header, i) => {
          obj[header] = values[i]?.trim() || ""
          return obj
        },
        {} as Record<string, string>,
      )
    })
    .filter((obj) => Object.keys(obj).length > 0)
}

// Calculate weighted score
export function calculateWeightedScore(scores: Record<string, number>, weights: Record<string, number>): number {
  let totalScore = 0
  let totalWeight = 0

  for (const key in weights) {
    if (scores[key] !== undefined) {
      totalScore += scores[key] * weights[key]
      totalWeight += weights[key]
    }
  }

  return totalWeight > 0 ? totalScore / totalWeight : 0
}
