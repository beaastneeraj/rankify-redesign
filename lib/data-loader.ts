import path from "path"
import fs from "fs/promises"
import { parse as csvParse } from "csv-parse/sync"

// Define the base directories for data files
const RANKINGS_DIR = path.join(process.cwd(), "data", "rankings")
const REPORTS_DIR = path.join(process.cwd(), "data", "reports")

// Define the categories and years available
export const CATEGORIES = ["overall", "engineering", "university", "college"]
export const YEARS = ["2022", "2023", "2024"]

// Define regions and states mapping
export const REGIONS = {
  North: [
    "Delhi",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Punjab",
    "Uttarakhand",
    "Uttar Pradesh",
    "Chandigarh",
    "Ladakh",
  ],
  South: ["Andhra Pradesh", "Karnataka", "Kerala", "Tamil Nadu", "Telangana", "Puducherry", "Lakshadweep"],
  East: ["Bihar", "Jharkhand", "Odisha", "West Bengal", "Andaman and Nicobar Islands"],
  West: ["Goa", "Gujarat", "Maharashtra", "Rajasthan", "Dadra and Nagar Haveli", "Daman and Diu"],
  Central: ["Chhattisgarh", "Madhya Pradesh"],
  Northeast: ["Arunachal Pradesh", "Assam", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Sikkim", "Tripura"],
}

// Get all states as a flat array
export const ALL_STATES = Object.values(REGIONS).flat()

// Get region for a state
export function getRegionForState(state: string): string | null {
  for (const [region, states] of Object.entries(REGIONS)) {
    if (states.includes(state)) {
      return region
    }
  }
  return null
}

// Interface for institution data
export interface Institution {
  id: string
  _id: string // optional if used only during fetch
  insId: string // optional if used only during fetch
  name: string
  city: string
  state: string
  score: number
  rank: number
  parameters: Record<string, number>
  pdf?: string
}


// Load rankings data for a specific category and year
// This function should only be used in server-side (API route) code!
export async function loadRankingsData(category: string, year: string): Promise<Institution[]> {
  throw new Error("loadRankingsData can only be used in server-side API routes due to Node.js fs usage.")
}

// Get report URL for an institution
export function getReportUrl(institution: string, category: string, year: string): string {
  // In a real implementation, this would check if the PDF exists
  // For now, we'll return a mock URL
  return `/reports/${category}/${year}/${encodeURIComponent(institution)}.pdf`
}

// Get available categories
export async function getAvailableCategories(): Promise<string[]> {
  // In a real implementation, this would scan the directory
  return CATEGORIES
}

// Get available years
export async function getAvailableYears(): Promise<string[]> {
  // In a real implementation, this would scan the directory
  return YEARS
}

// // Mock data generator for demo purposes
// function getMockData(category: string, year: string): Institution[] {
//   // Generate different data based on category and year
//   const count = category === "overall" ? 100 : 50

//   return Array.from({ length: count }, (_, i) => {
//     const rank = i + 1
//     const state = ALL_STATES[Math.floor(Math.random() * ALL_STATES.length)]

//     // Generate different institution names based on category
//     let name = ""
//     let city = ""

//     if (category === "engineering") {
//       name = `${["IIT", "NIT", "IIIT", "VIT", "BITS"][Math.floor(Math.random() * 5)]} ${["Delhi", "Mumbai", "Chennai", "Kolkata", "Bangalore"][Math.floor(Math.random() * 5)]}`
//       city = name.split(" ")[1]
//     } else if (category === "university") {
//       name = `${state} ${["Central", "State", "National", "International"][Math.floor(Math.random() * 4)]} University`
//       city = ["Delhi", "Mumbai", "Chennai", "Kolkata", "Bangalore", "Hyderabad", "Pune"][Math.floor(Math.random() * 7)]
//     } else if (category === "college") {
//       name = `${["St.", "Govt.", "City", "Modern", "Heritage"][Math.floor(Math.random() * 5)]} College of ${["Arts", "Science", "Commerce", "Technology"][Math.floor(Math.random() * 4)]}`
//       city = ["Delhi", "Mumbai", "Chennai", "Kolkata", "Bangalore", "Hyderabad", "Pune"][Math.floor(Math.random() * 7)]
//     } else {
//       name = `Institution ${rank}`
//       city = ["Delhi", "Mumbai", "Chennai", "Kolkata", "Bangalore", "Hyderabad", "Pune"][Math.floor(Math.random() * 7)]
//     }

//     // Base score decreases with rank
//     const baseScore = Math.max(30, 100 - rank * 0.7)

//     // Add some randomness to the score
//     const score = Math.round((baseScore + (Math.random() * 5 - 2.5)) * 100) / 100

//     // Generate parameter scores
//     const parameters: Record<string, number> = {
//       tlr: Math.round((80 + Math.random() * 20) * 10) / 10, // Teaching Learning Resources
//       rpp: Math.round((75 + Math.random() * 25) * 10) / 10, // Research & Professional Practice
//       go: Math.round((70 + Math.random() * 30) * 10) / 10, // Graduation Outcomes
//       oi: Math.round((65 + Math.random() * 35) * 10) / 10, // Outreach & Inclusivity
//       perc: Math.round((60 + Math.random() * 40) * 10) / 10, // Perception
//     }

//     return {
//       id: `${category}_${year}_${rank}`,
//       name,
//       city,
//       state,
//       score,
//       rank,
//       parameters,
//       reportUrl: getReportUrl(name, category, year),
//     }
//   })
// }
