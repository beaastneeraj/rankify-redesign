"use client"

import { useState, useEffect, useMemo } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import ResearchFundingCard from "@/components/ui/ResearchFundingCard"

import {
  ArrowLeft,
  FileText,
  Share2,
  Star,
  BarChart3,
  MapPin,
  Building,
  Calendar
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

/** -----------------------
 * Types & Interfaces
 * ----------------------*/

type Institution = {
  insId: string
  name: string
  city: string
  state: string
  rank: number
  TLR: number
  RPC: number
  GO: number
  OI: number
  PR: number
  pdf: string
  img: string
  year: number
  category: string
  score: number
}

type RawTable = {
  page: number
  index: number
  headers: string[]
  data: Record<string, any>[]
}

type PlacementStat = {
  academicYear: string | number
  intake?: number | null
  placed?: number | null
  medianSalary?: number | null
}

/** -----------------------
 * Component
 * ----------------------*/

export default function InstitutionPage() {
  const { category, year, id, uid } = useParams()
  const router = useRouter()

  // ------------------ state ------------------
  const [institution, setInstitution] = useState<Institution | null>(null)
  const [tables, setTables] = useState<RawTable[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // ------------------ fetch ------------------
  useEffect(() => {
    if (!category || !year || !id || !uid) return

    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/reports/${category}/${year}/${id}/${uid}`)
        if (!res.ok) throw new Error(`Status ${res.status}`)
        const json = await res.json()

        setInstitution(json.data.fromDB as Institution)
        setTables((json.data.fromFile?.tables as RawTable[]) ?? [])
      } catch (err) {
        console.error(err)
        setError("Could not load institution data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [category, year, id, uid])

  // ------------- derived placement stats --------------
  const placementStats = useMemo<PlacementStat[]>(() => {
    if (!tables.length) return []

    const seen = new Set<string>()
    const stats: PlacementStat[] = []

    tables.forEach((table) => {
      table.data.forEach((row) => {
        const hasPlacement =
          "no_of_first_year_students_intake_in_the_year" in row ||
          "no_of_students_placed" in row

        if (hasPlacement) {
          const academicYear =
            row.academic_year ??
            row.academic_year_3 ??
            row.financial_year ??
            "-"

          const key = `${academicYear}-${row.no_of_students_placed ?? ""}`
          if (seen.has(key)) return // avoid duplicates
          seen.add(key)

          stats.push({
            academicYear,
            intake: row.no_of_first_year_students_intake_in_the_year ?? null,
            placed: row.no_of_students_placed ?? null,
            medianSalary:
              row.median_salary_of_placed_graduates_per_annum_amount_in_rs ?? null
          })
        }
      })
    })

    return stats.sort((a, b) => {
      const aYear = Number(a.academicYear)
      const bYear = Number(b.academicYear)
      if (isNaN(aYear) || isNaN(bYear)) return 0
      return bYear - aYear
    })
  }, [tables])

  // ------------------ UI helpers ------------------
  const paramsMap: Record<string, string> = {
    TLR: "Teaching & Learning",
    RPC: "Research & Practice",
    GO: "Graduation Outcomes",
    OI: "Outreach & Inclusivity",
    PR: "Perception"
  }

  const scores = institution
    ? ([
        { key: "TLR", value: institution.TLR },
        { key: "RPC", value: institution.RPC },
        { key: "GO", value: institution.GO },
        { key: "OI", value: institution.OI },
        { key: "PR", value: institution.PR }
      ] as const)
    : []

  // ------------------ loading / error ------------------
  if (loading) {
    return (
      <div className="container px-4 md:px-6 py-8 md:py-12 max-w-7xl mx-auto">
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </div>
      </div>
    )
  }

  if (error || !institution) {
    return (
      <div className="container px-4 md:px-6 py-8 md:py-12 max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <h1 className="text-2xl font-bold mb-4">
            {error ?? "Institution Not Found"}
          </h1>
          <p className="text-muted-foreground mb-6">
            {error
              ? error
              : "The institution you're looking for doesn't exist or has been removed."}
          </p>
          <Button asChild>
            <Link href="/ranking">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Rankings
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  // ------------------ render ------------------
  return (
    <div className="container px-4 md:px-6 py-8 md:py-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col space-y-8"
      >
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-muted-foreground">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            <li className="flex items-center space-x-2">
              <span>/</span>
              <Link
                href="/ranking"
                className="hover:text-foreground transition-colors"
              >
                Ranking
              </Link>
            </li>
            <li className="flex items-center space-x-2 max-w-[200px] truncate">
              <span>/</span>
              <span className="font-medium text-foreground truncate">
                {institution.name}
              </span>
            </li>
          </ol>
        </nav>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-xs font-normal">
                Rank #{institution.rank}
              </Badge>
              <Badge variant="outline" className="text-xs font-normal">
                Score: {institution.score.toFixed(2)}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              {institution.name}
            </h1>
            <div className="flex items-center gap-2 mt-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>
                {institution.city}, {institution.state}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" asChild>
              <a href={institution.pdf} target="_blank" rel="noopener noreferrer">
                <FileText className="mr-2 h-4 w-4" />
                View Report
              </a>
            </Button>

            <Button variant="outline" onClick={() => router.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-2">
                    <Building className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Category</p>
                      <p className="text-sm text-muted-foreground">
                        {institution.category}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Year</p>
                      <p className="text-sm text-muted-foreground">
                        {institution.year}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Parameter Scores */}
            <Card>
              <CardHeader>
                <CardTitle>Parameter Scores</CardTitle>
                <CardDescription>
                  Breakdown of scores across different parameters
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {scores.map(({ key, value }) => (
                    <div key={key} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          {paramsMap[key]}
                        </span>
                        <span className="text-sm font-medium">
                          {value.toFixed(1)}/100
                        </span>
                      </div>
                      <Progress value={value} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <ResearchFundingCard tables={tables} />

            {/* Placements & Intake */}
            {placementStats.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Placements & Intake</CardTitle>
                  <CardDescription>
                    Figures are taken directly from the institute's NIRF PDF tables.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 pr-4">Academic Year</th>
                          <th className="py-2 pr-4 text-right">Intake</th>
                          <th className="py-2 pr-4 text-right">Placed</th>
                          <th className="py-2 text-right">Median CTC</th>
                        </tr>
                      </thead>
                      <tbody>
  {placementStats.map((stat, i) => (
    <tr key={`${stat.academicYear}-${i}`} className="border-b last:border-none">
      <td className="py-1 pr-4 whitespace-nowrap">
        {stat.academicYear}
      </td>
      <td className="py-1 pr-4 text-right">
        {stat.intake ?? "–"}
      </td>
      <td className="py-1 pr-4 text-right">
        {stat.placed ?? "–"}
      </td>
      <td className="py-1 text-right">
        {stat.medianSalary
          ? `₹${(stat.medianSalary / 1_00_000).toFixed(2)} L`
          : "–"}
      </td>
    </tr>
  ))}
</tbody>

                    </table>
                  </div>
                </CardContent>
              </Card>
            )}


          </div>
          
          {/* Right Column */}
          <div className="space-y-8">
            {/* Share */}
            <Card>
              <CardHeader>
                <CardTitle>Share</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Institution
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
