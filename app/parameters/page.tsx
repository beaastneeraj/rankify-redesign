"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Download, RefreshCw, Info, Filter, ArrowRight, Search, FileText, Save } from "lucide-react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { validateWeights } from "@/lib/parameter-utils"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import ParameterSaveLoad from "@/components/parameter-save-load"

import { CATEGORIES, YEARS, REGIONS, ALL_STATES, getRegionForState } from "@/lib/data-loader"
import type { Institution } from "@/lib/data-loader"

// Default parameter weights and limits
const DEFAULT_WEIGHTS = {
  tlr: 30, // Teaching, Learning & Resources
  rpp: 30, // Research & Professional Practice
  go: 20, // Graduation Outcomes
  oi: 10, // Outreach & Inclusivity
  perc: 10, // Perception
}

const PARAM_LIMITS = {
  tlr: { min: 10, max: 60 },
  rpp: { min: 5, max: 50 },
  go: { min: 5, max: 50 },
  oi: { min: 5, max: 20 },
  perc: { min: 5, max: 20 },
}

const PARAM_DESCRIPTIONS = {
  tlr: "Teaching, Learning & Resources including faculty-student ratio, faculty qualifications, and financial resources.",
  rpp: "Research & Professional Practice covering publications, patents, and funded research projects.",
  go: "Graduation Outcomes measuring student performance in university exams and placement success.",
  oi: "Outreach & Inclusivity focusing on diversity metrics including gender, regional, and socioeconomic diversity.",
  perc: "Peer Perception based on surveys of academic peers, employers, and research organizations.",
}

type InstitutionWithCalc = Institution & {
  _id: string
  calculatedScore?: number
  newRank?: number
  originalRank?: number
  originalScore?: number
}

type WeightsConfig = {
  tlr: number
  rpp: number
  go: number
  oi: number
  perc: number
}

type SavedPreset = {
  name: string
  weights: WeightsConfig
  category?: string
  year?: string
}

export default function ParametersPage() {
  const { data: session } = useSession()
  const [weights, setWeights] = useState<WeightsConfig>({ ...DEFAULT_WEIGHTS })
  const [category, setCategory] = useState("overall")
  const [year, setYear] = useState("2024")
  const [region, setRegion] = useState("All")
  const [state, setState] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [institutions, setInstitutions] = useState<InstitutionWithCalc[]>([])
  const [filteredInstitutions, setFilteredInstitutions] = useState<InstitutionWithCalc[]>([])
  const [loading, setLoading] = useState(false)
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [compareMode, setCompareMode] = useState(false)
  const [selectedInstitutions, setSelectedInstitutions] = useState<string[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [saveName, setSaveName] = useState("")

  // Calculate total weight
  const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0)

  // Load institutions from API when category or year changes
  // Load saved preset when user logs in
  useEffect(() => {
    const loadLastActivePreset = async () => {
      if (session?.user) {
        try {
          const res = await fetch('/api/user-parameters/active')
          const data = await res.json()
          
          if (data.success && data.data?.last_active_preset) {
            // Get the active preset details
            const presetRes = await fetch('/api/user-parameters')
            const presetData = await presetRes.json()
            
            if (presetData.success && presetData.data?.saved_presets) {
              const presetName = data.data.last_active_preset
              const preset = presetData.data.saved_presets[presetName]
              
              if (preset) {
                // Apply the preset
                setWeights(preset.weights || preset)
                if (preset.category) setCategory(preset.category)
                if (preset.year) setYear(preset.year)
                
                toast.info(`Loaded your last used preset: "${presetName}"`)
              }
            }
          }
        } catch (error) {
          console.error("Failed to load active preset:", error)
        }
      }
    }
    
    loadLastActivePreset()
  }, [session])
  
  useEffect(() => {
    const loadInstitutions = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/rankings?category=${category}&year=${year}`)
        const json = await res.json()
        // Add originalScore and originalRank for recalculation
        const data: InstitutionWithCalc[] = (json.data || []).map((inst: Institution, idx: number) => ({
          ...inst,
          id: inst._id ?? inst.id ?? inst.insId ?? `${inst.name}-${idx}`,  // ensure key is always present
          originalScore: inst.score,
          originalRank: inst.rank,
        }))

        setInstitutions(data)
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
          inst.city?.toLowerCase().includes(query) ||
          inst.state?.toLowerCase().includes(query),
      )
    }

    // Sort filteredInstitutions by newRank if present, else by rank
    filtered.sort((a, b) => {
      if (a.newRank && b.newRank) return a.newRank - b.newRank
      if (a.newRank) return -1
      if (b.newRank) return 1
      return a.rank - b.rank
    })
    setFilteredInstitutions(filtered)
  }, [institutions, region, state, searchQuery])

  // Toggle institution selection for comparison
  const toggleInstitutionSelection = (id: string) => {
    if (selectedInstitutions.includes(id)) {
      setSelectedInstitutions(selectedInstitutions.filter((instId) => instId !== id))
    } else {
      if (selectedInstitutions.length < 3) {
        setSelectedInstitutions([...selectedInstitutions, id])
      }
    }
  }

  // Get selected institutions data
  const selectedInstitutionsData = institutions.filter((inst) => selectedInstitutions.includes(inst.id))

  // Update state options based on selected region
  const stateOptions =
    region === "All" ? ["All", ...ALL_STATES] : ["All", ...(REGIONS[region as keyof typeof REGIONS] || [])]

  // Download rankings as CSV
  const downloadRankings = () => {
    if (filteredInstitutions.length === 0) return

    // Create CSV content
    const headers = ["Rank", "Institution", "City", "State", "Score", "Original Rank", "Original Score"]
    const csvContent = [
      headers.join(","),
      ...filteredInstitutions.map((inst) =>
        [
          inst.newRank || inst.rank,
          `"${inst.name}"`, // Quote institution name to handle commas
          `"${inst.city || ''}"`,
          `"${inst.state || ''}"`,
          inst.calculatedScore?.toFixed(2) || inst.score.toFixed(2),
          inst.originalRank || inst.rank,
          inst.originalScore?.toFixed(2) || inst.score.toFixed(2),
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

  // Handle weight change for a parameter
  const handleWeightChange = (parameter: keyof typeof weights, newValue: number) => {
    // Enforce min/max strictly
    const { min, max } = PARAM_LIMITS[parameter]
    const value = Math.max(min, Math.min(max, newValue))

    // Calculate how much this parameter changed
    const diff = value - weights[parameter]

    // Create new weights object
    const newWeights = { ...weights, [parameter]: value }

    // If there's a change, adjust other weights proportionally
    if (diff !== 0) {
      // Get all other parameters
      const otherParams = Object.keys(weights).filter((key) => key !== parameter) as Array<keyof typeof weights>

      // Calculate total weight of other parameters
      const otherTotal = otherParams.reduce((sum, key) => sum + newWeights[key], 0)

      // Adjust other parameters proportionally
      if (otherTotal > 0) {
        otherParams.forEach((key) => {
          // Calculate proportional adjustment
          const proportion = newWeights[key] / otherTotal
          newWeights[key] = Math.max(
            PARAM_LIMITS[key].min,
            Math.min(PARAM_LIMITS[key].max, Math.round(newWeights[key] - diff * proportion)),
          )
        })
      }

      // Ensure total is 100
      const finalTotal = Object.values(newWeights).reduce((sum, w) => sum + w, 0)
      if (finalTotal !== 100) {
        // Adjust the largest parameter to make total exactly 100
        const largestParam = Object.keys(newWeights).reduce((a, b) =>
          newWeights[a as keyof typeof weights] > newWeights[b as keyof typeof weights] ? a : b,
        ) as keyof typeof weights

        newWeights[largestParam] += 100 - finalTotal
      }
    }

    setWeights(newWeights)
  }

  // Reset to default weights and reload original rankings
  const resetToDefault = () => {
    setWeights({ ...DEFAULT_WEIGHTS })
  }

  // Update rankings based on parameters
  const updateRankings = async () => {
    // Validate weights before updating
    const validation = validateWeights(weights)
    if (!validation.valid) {
      toast.error(validation.message || "Parameter weights are invalid")
      return
    }
    
    setLoading(true)
    try {
      // Build query string for GET request
      const params = new URLSearchParams({
        year: String(year),
        category,
        state,
        region,
        tlr: String(weights.tlr),
        rpp: String(weights.rpp),
        go: String(weights.go),
        oi: String(weights.oi),
        perc: String(weights.perc),
      })
      const res = await fetch(`/api/rankings?${params.toString()}`)
      const json = await res.json()
      if (!json.success) throw new Error(json.message)
      // Map API response to local state
      const updatedInstitutions = (json.data || []).map((inst: any) => ({
        ...inst,
        id: inst._id || inst.id,
        name: inst.name || inst.institution, // ensure name is always present
        calculatedScore: typeof inst.calculatedScore === 'number' ? inst.calculatedScore : undefined,
        newRank: typeof inst.newRank === 'number' ? inst.newRank : undefined,
        originalScore: inst.score,
        originalRank: inst.rank,
      }))
      setInstitutions(updatedInstitutions)
      
      // Show success message with parameter information
      toast.success(
        `Rankings updated successfully with your custom parameters: TLR ${weights.tlr}%, RPP ${weights.rpp}%, GO ${weights.go}%, OI ${weights.oi}%, Perception ${weights.perc}%`
      )
    } catch (e: any) {
      toast.error(e.message || 'Failed to update rankings')
    }
    setLoading(false)
  }

  // Load saved preset
  const handleLoadPreset = (preset: SavedPreset) => {
    setWeights(preset.weights)
    
    // If the preset includes category/year, update those too
    if (preset.category) setCategory(preset.category)
    if (preset.year) setYear(preset.year)
    
    // Save the last active preset to user's profile
    if (session?.user) {
      fetch('/api/user-parameters/active', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ preset_name: preset.name })
      }).catch(err => console.error("Failed to save active preset:", err));
    }
    
    // Update rankings after loading preset
    setTimeout(() => {
      updateRankings();
    }, 100);
    
    toast.success(`Loaded preset: ${preset.name}`)
  }

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col space-y-8"
      >
        {/* Category Tabs (like ranking page) */}
        <Tabs value={category} onValueChange={setCategory} className="w-full mb-4">
          <TabsList className="w-full flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <TabsTrigger key={cat} value={cat} className="capitalize">
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Ranking Parameters</h1>
            <p className="text-muted-foreground mt-1">
              Customize parameter weights to create your personalized rankings
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCompareMode(!compareMode)}
              className={compareMode ? "bg-primary/10" : ""}
            >
              {compareMode ? "Exit Compare" : "Compare Institutions"}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={showAdvancedFilters ? "bg-primary/10" : ""}
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>

        {/* Parameter Weights Card */}
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/80 to-primary/30"></div>
          <CardHeader>
            <CardTitle className="flex items-center">Parameter Weights</CardTitle>
            <CardDescription>Adjust the importance of each parameter to customize your rankings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {Object.entries(weights).map(([param, value]) => {
              const paramKey = param as keyof typeof weights
              const { min, max } = PARAM_LIMITS[paramKey]

              // Calculate slider width based on weight
              const sliderWidth = Math.max(30, Math.min(100, (value / totalWeight) * 100 * 2))

              return (
                <div key={param} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Label htmlFor={param} className="font-medium uppercase">
                        {param}
                      </Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 ml-2 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>{PARAM_DESCRIPTIONS[paramKey]}</p>
                            <p className="text-xs mt-1">
                              Range: {min}% - {max}%
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={value > (max - min) / 2 + min ? "default" : "outline"} className="transition-all">
                        {value}%
                      </Badge>
                    </div>
                  </div>

                  <div className="relative flex items-center">
                    <motion.div
                      className="relative"
                      initial={{ width: "100%" }}
                      animate={{ width: `${sliderWidth}%` }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <Slider
                        id={param}
                        min={min}
                        max={max}
                        step={1}
                        value={[value]}
                        onValueChange={(newValue) => handleWeightChange(paramKey, newValue[0])}
                        className="w-full"
                      />
                    </motion.div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-muted-foreground/30" />
                  </div>
                </div>
              )
            })}

            <div className="pt-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total</span>
                <Badge variant={totalWeight === 100 ? "default" : "destructive"}>{totalWeight}%</Badge>
              </div>
              {totalWeight !== 100 && <p className="text-xs text-destructive mt-1">Total must equal 100%</p>}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3 pt-0">
            <Button onClick={updateRankings} disabled={loading || totalWeight !== 100} className="w-full sm:w-auto">
              {loading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Updating...
                </div>
              ) : (
                <div className="flex items-center">Update Rankings</div>
              )}
            </Button>
            <Button variant="outline" onClick={resetToDefault} className="w-full sm:w-auto">
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset to Default
            </Button>
            
            <div className="ml-auto">
              <ParameterSaveLoad 
                weights={weights}
                category={category}
                year={year}
                onLoadPreset={handleLoadPreset}
                disabled={totalWeight !== 100}
              />
            </div>
          </CardFooter>
        </Card>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showAdvancedFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="mb-8 overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg">Filters</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
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

                    <div>
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

                    <div>
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

                    <div>
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
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
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

          <Button variant="outline" size="sm" onClick={downloadRankings}>
            <Download className="mr-2 h-4 w-4" />
            Export Rankings
          </Button>
        </div>

        {/* Comparison Section */}
        {compareMode && selectedInstitutions.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg">Comparing Institutions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Metric</TableHead>
                      {selectedInstitutionsData.map((inst) => (
                        <TableHead key={inst.id}>{inst.name}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Original Rank</TableCell>
                      {selectedInstitutionsData.map((inst) => (
                        <TableCell key={`${inst.id}-rank`}>{inst.originalRank || inst.rank}</TableCell>
                      ))}
                    </TableRow>
                    {institutions[0]?.newRank && (
                      <TableRow>
                        <TableCell className="font-medium">New Rank</TableCell>
                        {selectedInstitutionsData.map((inst) => (
                          <TableCell key={`${inst.id}-newrank`}>{inst.newRank}</TableCell>
                        ))}
                      </TableRow>
                    )}
                    <TableRow>
                      <TableCell className="font-medium">Original Score</TableCell>
                      {selectedInstitutionsData.map((inst) => (
                        <TableCell key={`${inst.id}-score`}>
                          {(inst.originalScore !== undefined ? inst.originalScore : inst.score).toFixed(2)}
                        </TableCell>
                      ))}
                    </TableRow>
                    {institutions[0]?.calculatedScore !== undefined && (
                      <TableRow>
                        <TableCell className="font-medium">New Score</TableCell>
                        {selectedInstitutionsData.map((inst) => (
                          <TableCell key={`${inst.id}-newscore`}>{inst.calculatedScore?.toFixed(2)}</TableCell>
                        ))}
                      </TableRow>
                    )}
                    <TableRow>
                      <TableCell className="font-medium">City</TableCell>
                      {selectedInstitutionsData.map((inst) => (
                        <TableCell key={`${inst.id}-city`}>{inst.city}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">State</TableCell>
                      {selectedInstitutionsData.map((inst) => (
                        <TableCell key={`${inst.id}-state`}>{inst.state}</TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" onClick={() => setSelectedInstitutions([])}>
                Clear Selection
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Rankings Table */}
        {filteredInstitutions.length > 0 && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>
                  {category.charAt(0).toUpperCase() + category.slice(1)} Rankings {year}
                </CardTitle>
                <CardDescription>
                  Showing {filteredInstitutions.length} institutions
                  {region !== "All" && ` in ${region}`}
                  {state !== "All" && ` from ${state}`}
                </CardDescription>
              </div>

              <Button asChild variant="outline" size="sm">
                <Link href="/ranking">
                  View All Rankings <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="py-8 flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <div className="rounded-md border overflow-hidden">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          {compareMode && <TableHead className="w-[50px]">Select</TableHead>}
                          <TableHead className="w-[80px]">{institutions[0]?.newRank ? "New Rank" : "Rank"}</TableHead>
                          {institutions[0]?.newRank && <TableHead className="w-[80px]">Original</TableHead>}
                          <TableHead>Institution</TableHead>
                          <TableHead>City</TableHead>
                          <TableHead>State</TableHead>
                          <TableHead className="text-right">
                            {institutions[0]?.calculatedScore ? "New Score" : "Score"}
                          </TableHead>
                          {institutions[0]?.calculatedScore !== undefined && (
                            <TableHead className="text-right">Original</TableHead>
                          )}
                          <TableHead className="w-[100px] text-center">Report</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredInstitutions.map((inst) => (
                          <TableRow
                            key={inst.id}
                            className={selectedInstitutions.includes(inst.id) ? "bg-primary/5" : ""}
                          >
                            {compareMode && (
                              <TableCell>
                                <input
                                  type="checkbox"
                                  checked={selectedInstitutions.includes(inst.id)}
                                  onChange={() => toggleInstitutionSelection(inst.id)}
                                  disabled={selectedInstitutions.length >= 3 && !selectedInstitutions.includes(inst.id)}
                                  className="h-4 w-4"
                                />
                              </TableCell>
                            )}
                            <TableCell className="font-medium">
                              {inst.newRank || inst.rank}
                              {inst.newRank && inst.originalRank && (
                                <>
                                  {inst.newRank < inst.originalRank && <span className="text-green-600 ml-1">↑</span>}
                                  {inst.newRank > inst.originalRank && <span className="text-red-600 ml-1">↓</span>}
                                </>
                              )}
                            </TableCell>
                            {institutions[0]?.newRank && <TableCell>{inst.originalRank || inst.rank}</TableCell>}
                            <TableCell>
                              <Link
                                href={`/institution/${category}/${year}/${inst.insId}/${inst._id}`}
                                className="text-foreground hover:text-primary transition-colors"
                              >
                                {inst.name}
                              </Link>
                            </TableCell>
                            <TableCell>{inst.city}</TableCell>
                            <TableCell>{inst.state}</TableCell>
                            <TableCell className="text-right font-medium">
                              {inst.calculatedScore !== undefined
                                ? inst.calculatedScore.toFixed(2)
                                : inst.score.toFixed(2)}
                            </TableCell>
                            {institutions[0]?.calculatedScore !== undefined && (
                              <TableCell className="text-right">
                                {(inst.originalScore !== undefined ? inst.originalScore : inst.score).toFixed(2)}
                              </TableCell>
                            )}
                            <TableCell className="text-center">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                                      <a href={inst.pdf} target="_blank" rel="noopener noreferrer">
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
              )}
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  )
}
