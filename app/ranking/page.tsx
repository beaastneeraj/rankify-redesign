"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Filter, Search, FileText, Download, ChevronDown, ChevronUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Label } from "@/components/ui/label"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import { CATEGORIES, YEARS, REGIONS, ALL_STATES, getRegionForState } from "@/lib/data-loader"
import type { Institution } from "@/lib/data-loader"

export default function RankingPage() {
  const [category, setCategory] = useState("overall")
  const [year, setYear] = useState("2024")
  const [region, setRegion] = useState("All")
  const [state, setState] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [institutions, setInstitutions] = useState<Institution[]>([])
  const [filteredInstitutions, setFilteredInstitutions] = useState<Institution[]>([])
  const [loading, setLoading] = useState(false)
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "ascending" | "descending" }>({
    key: "rank",
    direction: "ascending",
  })

  // Load institutions from API when category or year changes
  useEffect(() => {
    const loadInstitutions = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/rankings?category=${category}&year=${year}`)
        const json = await res.json()
        setInstitutions(json.data || [])
      } catch (e) {
        setInstitutions([])
      }
      setLoading(false)
    }
    loadInstitutions()
  }, [category, year])

  // Apply filters when institutions, region, state, or search query changes
  useEffect(() => {
    let filtered = [...institutions]

    // Filter by region
    if (region !== "All") {
      filtered = filtered.filter((inst) => getRegionForState(inst.state) === region)
    }

    // Filter by state
    if (state !== "All") {
      filtered = filtered.filter((inst) => inst.state === state)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (inst) =>
          inst.name.toLowerCase().includes(query) ||
          inst.city.toLowerCase().includes(query) ||
          inst.state.toLowerCase().includes(query),
      )
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortConfig.key === "rank") {
        return sortConfig.direction === "ascending" ? a.rank - b.rank : b.rank - a.rank
      } else if (sortConfig.key === "score") {
        return sortConfig.direction === "ascending" ? a.score - b.score : b.score - a.score
      } else if (sortConfig.key === "name") {
        return sortConfig.direction === "ascending" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      }
      return 0
    })

    setFilteredInstitutions(filtered)
  }, [institutions, region, state, searchQuery, sortConfig])

  // Handle sort request
  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending"

    if (sortConfig.key === key) {
      direction = sortConfig.direction === "ascending" ? "descending" : "ascending"
    } else if (key === "score") {
      // Default sort for score is descending (highest first)
      direction = "descending"
    }

    setSortConfig({ key, direction })
  }

  // Get sort direction indicator
  const getSortDirectionIndicator = (key: string) => {
    if (sortConfig.key !== key) return null

    return sortConfig.direction === "ascending" ? (
      <ChevronUp className="h-4 w-4 inline ml-1" />
    ) : (
      <ChevronDown className="h-4 w-4 inline ml-1" />
    )
  }

  // Update state options based on selected region
  const stateOptions =
    region === "All" ? ["All", ...ALL_STATES] : ["All", ...(REGIONS[region as keyof typeof REGIONS] || [])]

  // Download rankings as CSV
  const downloadRankings = () => {
    if (filteredInstitutions.length === 0) return

    // Create CSV content
    const headers = ["Rank", "Institution", "City", "State", "Score"]
    const csvContent = [
      headers.join(","),
      ...filteredInstitutions.map((inst) =>
        [
          inst.rank,
          `"${inst.name}"`, // Quote institution name to handle commas
          `"${inst.city}"`,
          `"${inst.state}"`,
          inst.score,
        ].join(","),
      ),
    ].join("\n")

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `rankings_${category}_${year}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col space-y-8"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Institution Rankings</h1>
            <p className="text-muted-foreground mt-1">
              Explore and compare rankings across different categories and years
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={downloadRankings}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>

            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader>
                    <DrawerTitle>Filter Rankings</DrawerTitle>
                    <DrawerDescription>Customize your view of the rankings</DrawerDescription>
                  </DrawerHeader>
                  <div className="p-4 pb-0">
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="category">Category</Label>
                        <Select value={category} onValueChange={setCategory}>
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {CATEGORIES.map((cat) => (
                              <SelectItem key={cat} value={cat}>
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="year">Year</Label>
                        <Select value={year} onValueChange={setYear}>
                          <SelectTrigger id="year">
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent>
                            {YEARS.map((y) => (
                              <SelectItem key={y} value={y}>
                                {y}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="region">Region</Label>
                        <Select
                          value={region}
                          onValueChange={(value) => {
                            setRegion(value)
                            setState("All") // Reset state when region changes
                          }}
                        >
                          <SelectTrigger id="region">
                            <SelectValue placeholder="Select region" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="All">All Regions</SelectItem>
                            {Object.keys(REGIONS).map((r) => (
                              <SelectItem key={r} value={r}>
                                {r}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="state">State</Label>
                        <Select value={state} onValueChange={setState}>
                          <SelectTrigger id="state">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            {stateOptions.map((s) => (
                              <SelectItem key={s} value={s}>
                                {s}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs defaultValue={category} value={category} onValueChange={setCategory} className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            {CATEGORIES.map((cat) => (
              <TabsTrigger key={cat} value={cat} className="capitalize">
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Year Selection and Search */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {YEARS.map((y) => (
              <Button
                key={y}
                variant={year === y ? "default" : "outline"}
                size="sm"
                onClick={() => setYear(y)}
                className="min-w-[80px]"
              >
                {y}
              </Button>
            ))}
          </div>

          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search institutions..."
              className="w-full sm:w-[250px] pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Filter Pills */}
        {(region !== "All" || state !== "All" || searchQuery) && (
          <div className="flex flex-wrap gap-2">
            {region !== "All" && (
              <Badge variant="outline" className="flex items-center gap-1">
                Region: {region}
                <button onClick={() => setRegion("All")} className="ml-1 rounded-full hover:bg-muted p-0.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </Badge>
            )}

            {state !== "All" && (
              <Badge variant="outline" className="flex items-center gap-1">
                State: {state}
                <button onClick={() => setState("All")} className="ml-1 rounded-full hover:bg-muted p-0.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </Badge>
            )}

            {searchQuery && (
              <Badge variant="outline" className="flex items-center gap-1">
                Search: {searchQuery}
                <button onClick={() => setSearchQuery("")} className="ml-1 rounded-full hover:bg-muted p-0.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </Badge>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setRegion("All")
                setState("All")
                setSearchQuery("")
              }}
              className="text-xs h-7"
            >
              Clear All
            </Button>
          </div>
        )}

        {/* Rankings Table */}
        <Card>
          <CardHeader className="pb-0">
            <CardTitle>
              {category.charAt(0).toUpperCase() + category.slice(1)} Rankings {year}
            </CardTitle>
            <CardDescription>
              Showing {filteredInstitutions.length} institutions
              {region !== "All" && ` in ${region}`}
              {state !== "All" && ` from ${state}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="py-8 flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : filteredInstitutions.length > 0 ? (
              <div className="rounded-md border overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px] cursor-pointer" onClick={() => requestSort("rank")}>
                          Rank {getSortDirectionIndicator("rank")}
                        </TableHead>
                        <TableHead className="cursor-pointer" onClick={() => requestSort("name")}>
                          Institution {getSortDirectionIndicator("name")}
                        </TableHead>
                        <TableHead>City</TableHead>
                        <TableHead>State</TableHead>
                        <TableHead className="text-right cursor-pointer" onClick={() => requestSort("score")}>
                          Score {getSortDirectionIndicator("score")}
                        </TableHead>
                        <TableHead className="w-[100px] text-center">Report</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredInstitutions.map((inst) => (
                        <TableRow key={inst.id} className="group">
                          <TableCell className="font-medium">{inst.rank}</TableCell>
                          <TableCell>
                            <Link
                              href={`/institution/${inst.id}`}
                              className="text-foreground hover:text-primary transition-colors"
                            >
                              {inst.name}
                            </Link>
                          </TableCell>
                          <TableCell>{inst.city}</TableCell>
                          <TableCell>{inst.state}</TableCell>
                          <TableCell className="text-right font-medium">{inst.score.toFixed(2)}</TableCell>
                          <TableCell className="text-center">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 opacity-70 group-hover:opacity-100"
                                    asChild
                                  >
                                    <a href={inst.reportUrl} target="_blank" rel="noopener noreferrer">
                                      <FileText className="h-4 w-4" />
                                    </a>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>View Report</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-muted-foreground">No institutions found matching your criteria</div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              {filteredInstitutions.length} of {institutions.length} institutions
            </div>

            <Button asChild variant="outline" size="sm">
              <Link href="/parameters">
                Customize Parameters <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
