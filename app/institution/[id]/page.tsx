"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, FileText, Share2, Star, BarChart3, MapPin, Building, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"

// Mock data for demonstration
const mockInstitution = {
  id: "inst_1",
  name: "Indian Institute of Technology Delhi",
  city: "Delhi",
  state: "Delhi",
  score: 92.45,
  rank: 1,
  parameters: {
    tlr: 95.2, // Teaching Learning Resources
    rpp: 90.5, // Research & Professional Practice
    go: 88.7, // Graduation Outcomes
    oi: 85.3, // Outreach & Inclusivity
    perc: 92.1, // Perception
  },
  reportUrl: "/reports/overall/2024/IIT_Delhi.pdf",
  description:
    "The Indian Institute of Technology Delhi is one of the premier engineering institutions in India, known for its excellence in teaching, research, and innovation.",
  established: "1961",
  type: "Public",
  website: "https://www.iitd.ac.in",
  accreditation: "NAAC A++",
  facultyCount: 642,
  studentCount: 8500,
  courses: ["B.Tech", "M.Tech", "Ph.D", "MBA"],
  facilities: ["Library", "Sports Complex", "Hostels", "Labs", "Cafeteria"],
  rankings: [
    { year: "2024", rank: 1, score: 92.45 },
    { year: "2023", rank: 2, score: 91.2 },
    { year: "2022", rank: 2, score: 90.76 },
  ],
}

export default function InstitutionPage() {
  const params = useParams()
  const router = useRouter()
  const { id } = params

  const [institution, setInstitution] = useState<typeof mockInstitution | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadInstitution = async () => {
      setLoading(true)

      // Simulate API call with delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      // In a real implementation, this would fetch data from the server
      // For now, we'll use the mock data
      setInstitution(mockInstitution)
      setLoading(false)
    }

    loadInstitution()
  }, [id])

  if (loading) {
    return (
      <div className="container px-4 md:px-6 py-8 md:py-12 max-w-7xl mx-auto">
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (!institution) {
    return (
      <div className="container px-4 md:px-6 py-8 md:py-12 max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <h1 className="text-2xl font-bold mb-4">Institution Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The institution you're looking for doesn't exist or has been removed.
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
              <Link href="/ranking" className="hover:text-foreground transition-colors">
                Ranking
              </Link>
            </li>
            <li className="flex items-center space-x-2">
              <span>/</span>
              <span className="font-medium text-foreground truncate max-w-[200px]">{institution.name}</span>
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
            <h1 className="text-3xl font-bold tracking-tight">{institution.name}</h1>
            <div className="flex items-center gap-2 mt-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>
                {institution.city}, {institution.state}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" asChild>
              <a href={institution.reportUrl} target="_blank" rel="noopener noreferrer">
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
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{institution.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-start gap-2">
                    <Building className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Type</p>
                      <p className="text-sm text-muted-foreground">{institution.type}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Established</p>
                      <p className="text-sm text-muted-foreground">{institution.established}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Star className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Accreditation</p>
                      <p className="text-sm text-muted-foreground">{institution.accreditation}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <BarChart3 className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Website</p>
                      <a
                        href={institution.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        {institution.website.replace("https://", "")}
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Parameter Scores</CardTitle>
                <CardDescription>Breakdown of scores across different parameters</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(institution.parameters).map(([param, score]) => {
                    const paramName = {
                      tlr: "Teaching Learning Resources",
                      rpp: "Research & Professional Practice",
                      go: "Graduation Outcomes",
                      oi: "Outreach & Inclusivity",
                      perc: "Perception",
                    }[param]

                    return (
                      <div key={param} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{paramName}</span>
                          <span className="text-sm font-medium">{score.toFixed(1)}/100</span>
                        </div>
                        <Progress value={score} className="h-2" />
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Historical Rankings</CardTitle>
                <CardDescription>Performance over the years</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {institution.rankings.map((ranking, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className="w-16 justify-center">
                          {ranking.year}
                        </Badge>
                        <span className="font-medium">Rank #{ranking.rank}</span>
                      </div>
                      <span className="font-medium">{ranking.score.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Key Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Faculty Count</p>
                  <p className="font-medium">{institution.facultyCount}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">Student Count</p>
                  <p className="font-medium">{institution.studentCount}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">Courses Offered</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {institution.courses.map((course, index) => (
                      <Badge key={index} variant="secondary">
                        {course}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">Facilities</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {institution.facilities.map((facility, index) => (
                      <Badge key={index} variant="outline">
                        {facility}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

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
