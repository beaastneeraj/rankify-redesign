"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Download, LineChart, Users, Award, Lightbulb, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function MethodologyPage() {
  // Scroll to section if hash exists
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1)
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [])

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col space-y-12"
      >
        {/* Hero section */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Ranking Methodology</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Understand the science behind our rankings and how we evaluate institutions across various parameters.
          </p>
        </div>

        {/* Table of Contents */}
        <Card>
          <CardHeader>
            <CardTitle>Contents</CardTitle>
            <CardDescription>Quick navigation to methodology sections</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <Link href="#overview" className="text-primary hover:underline flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Overview of Ranking Methodology
                </Link>
              </li>
              <li>
                <Link href="#parameters" className="text-primary hover:underline flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Ranking Parameters and Weights
                </Link>
              </li>
              <li>
                <Link href="#data-collection" className="text-primary hover:underline flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Data Collection Process
                </Link>
              </li>
              <li>
                <Link href="#calculation" className="text-primary hover:underline flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Score Calculation
                </Link>
              </li>
              <li>
                <Link href="#customization" className="text-primary hover:underline flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Customizing Rankings
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-primary hover:underline flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Overview Section */}
        <section id="overview" className="scroll-mt-24">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-2/3">
              <h2 className="text-3xl font-bold tracking-tight mb-6">Overview</h2>
              <p className="text-muted-foreground mb-4">
                Our rankings provide a comprehensive assessment of higher education institutions based on a variety of 
                parameters, designed to evaluate different aspects of educational quality and outcomes. These rankings 
                serve as a valuable tool for prospective students, parents, educators, and policymakers to make informed 
                decisions.
              </p>
              <p className="text-muted-foreground mb-4">
                The methodology employs a multi-dimensional approach that considers teaching quality, research output, 
                graduation outcomes, inclusivity measures, and perception among peers and employers. This holistic 
                evaluation ensures that institutions are assessed on both their academic excellence and their ability to 
                prepare students for future success.
              </p>
              <p className="text-muted-foreground">
                Each year, we collect data from thousands of institutions, apply rigorous verification processes, and 
                calculate scores using a transparent weighted formula. Our commitment to objectivity and comprehensive 
                assessment makes these rankings a trusted resource in the education community.
              </p>
            </div>
            <div className="w-full md:w-1/3">
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <Award className="h-16 w-16 text-primary opacity-80" />
                    <h3 className="text-xl font-semibold">Key Benefits</h3>
                    <ul className="space-y-2 text-left">
                      <li className="flex">
                        <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" />
                        <span>Transparent and objective evaluation criteria</span>
                      </li>
                      <li className="flex">
                        <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" />
                        <span>Comprehensive assessment of institutions</span>
                      </li>
                      <li className="flex">
                        <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" />
                        <span>Customizable weights for personalized rankings</span>
                      </li>
                      <li className="flex">
                        <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" />
                        <span>Annual updates with the latest data</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Parameters Section */}
        <section id="parameters" className="scroll-mt-24">
          <h2 className="text-3xl font-bold tracking-tight mb-6">Ranking Parameters and Weights</h2>
          <p className="text-muted-foreground mb-6">
            Our rankings are based on five core parameters, each carrying a specific weight in the overall score 
            calculation. The default weight distribution has been carefully designed to provide a balanced assessment, 
            but users can customize these weights to create personalized rankings.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* TLR Card */}
            <Card>
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/20">
                <div className="rounded-full bg-blue-100 dark:bg-blue-900/50 p-3 w-fit mb-2">
                  <LineChart className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                </div>
                <CardTitle>Teaching, Learning & Resources (TLR)</CardTitle>
                <CardDescription className="font-semibold text-blue-600 dark:text-blue-400">Default Weight: 30%</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Evaluates the quality of faculty, facilities, and resources available to students. Includes metrics such as:
                </p>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>• Faculty-student ratio</li>
                  <li>• Faculty qualifications (PhDs)</li>
                  <li>• Financial resources and utilization</li>
                  <li>• Library and laboratory facilities</li>
                </ul>
                <p className="mt-3 text-xs">
                  <b>Range:</b> 10-60%
                </p>
              </CardContent>
            </Card>

            {/* RPP Card */}
            <Card>
              <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/20">
                <div className="rounded-full bg-purple-100 dark:bg-purple-900/50 p-3 w-fit mb-2">
                  <Lightbulb className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                </div>
                <CardTitle>Research & Professional Practice (RPP)</CardTitle>
                <CardDescription className="font-semibold text-purple-600 dark:text-purple-400">Default Weight: 30%</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Measures the institution's research output and professional contributions to the field. Includes:
                </p>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>• Published research papers</li>
                  <li>• Patents filed and granted</li>
                  <li>• Funded research projects</li>
                  <li>• Citations and impact factor</li>
                </ul>
                <p className="mt-3 text-xs">
                  <b>Range:</b> 5-50%
                </p>
              </CardContent>
            </Card>

            {/* GO Card */}
            <Card>
              <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/40 dark:to-green-900/20">
                <div className="rounded-full bg-green-100 dark:bg-green-900/50 p-3 w-fit mb-2">
                  <Award className="h-5 w-5 text-green-600 dark:text-green-300" />
                </div>
                <CardTitle>Graduation Outcomes (GO)</CardTitle>
                <CardDescription className="font-semibold text-green-600 dark:text-green-400">Default Weight: 20%</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Assesses the success of students in academics and career placement after graduation:
                </p>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>• Graduation rate</li>
                  <li>• Placement rate and median salary</li>
                  <li>• Higher education pursuit</li>
                  <li>• University examination performance</li>
                </ul>
                <p className="mt-3 text-xs">
                  <b>Range:</b> 5-50%
                </p>
              </CardContent>
            </Card>

            {/* OI Card */}
            <Card>
              <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-950/40 dark:to-amber-900/20">
                <div className="rounded-full bg-amber-100 dark:bg-amber-900/50 p-3 w-fit mb-2">
                  <Users className="h-5 w-5 text-amber-600 dark:text-amber-300" />
                </div>
                <CardTitle>Outreach & Inclusivity (OI)</CardTitle>
                <CardDescription className="font-semibold text-amber-600 dark:text-amber-400">Default Weight: 10%</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Evaluates the institution's efforts to be inclusive and accessible:
                </p>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>• Gender diversity</li>
                  <li>• Economically disadvantaged students</li>
                  <li>• Geographical diversity</li>
                  <li>• Facilities for physically challenged</li>
                </ul>
                <p className="mt-3 text-xs">
                  <b>Range:</b> 5-20%
                </p>
              </CardContent>
            </Card>

            {/* PERC Card */}
            <Card>
              <CardHeader className="bg-gradient-to-r from-rose-50 to-rose-100 dark:from-rose-950/40 dark:to-rose-900/20">
                <div className="rounded-full bg-rose-100 dark:bg-rose-900/50 p-3 w-fit mb-2">
                  <Users className="h-5 w-5 text-rose-600 dark:text-rose-300" />
                </div>
                <CardTitle>Perception (PERC)</CardTitle>
                <CardDescription className="font-semibold text-rose-600 dark:text-rose-400">Default Weight: 10%</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Measures how the institution is perceived by academic peers, employers, and research organizations:
                </p>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>• Academic peer review</li>
                  <li>• Employer feedback</li>
                  <li>• Industry perception</li>
                  <li>• Research organization perception</li>
                </ul>
                <p className="mt-3 text-xs">
                  <b>Range:</b> 5-20%
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Default Weight Distribution</CardTitle>
              <CardDescription>
                Our rankings use these default weights to calculate the initial scores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Parameter</TableHead>
                    <TableHead>Default Weight</TableHead>
                    <TableHead>Allowed Range</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">TLR</TableCell>
                    <TableCell>30%</TableCell>
                    <TableCell>10-60%</TableCell>
                    <TableCell>Teaching, Learning & Resources</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">RPP</TableCell>
                    <TableCell>30%</TableCell>
                    <TableCell>5-50%</TableCell>
                    <TableCell>Research & Professional Practice</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">GO</TableCell>
                    <TableCell>20%</TableCell>
                    <TableCell>5-50%</TableCell>
                    <TableCell>Graduation Outcomes</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">OI</TableCell>
                    <TableCell>10%</TableCell>
                    <TableCell>5-20%</TableCell>
                    <TableCell>Outreach & Inclusivity</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">PERC</TableCell>
                    <TableCell>10%</TableCell>
                    <TableCell>5-20%</TableCell>
                    <TableCell>Perception</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <p className="text-muted-foreground">
            These parameters and weights are designed to provide a comprehensive assessment of institutions. The weight ranges allow for customization while ensuring that each parameter maintains a meaningful contribution to the overall score.
          </p>
        </section>

        {/* Data Collection Process */}
        <section id="data-collection" className="scroll-mt-24">
          <h2 className="text-3xl font-bold tracking-tight mb-6">Data Collection Process</h2>
          <p className="text-muted-foreground mb-6">
            Our data collection process is rigorous and comprehensive, ensuring the accuracy and reliability of our rankings. We collect data through multiple channels and verify it through a multi-stage validation process.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Primary Data Collection</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><b>Institutional Submissions:</b> Data provided directly by institutions through our secure portal.</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><b>Survey Data:</b> Collected from students, faculty, employers, and academic peers.</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><b>Research Database:</b> Publication and citation data from recognized scholarly databases.</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><b>Official Records:</b> Government and regulatory body records of institutions.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Verification Process</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><b>Initial Screening:</b> Automated checks for data completeness and basic validation.</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><b>Cross-Verification:</b> Comparing data from multiple sources to identify discrepancies.</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><b>Expert Review:</b> Subject matter experts review unusual or inconsistent data points.</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><b>Institutional Confirmation:</b> Final verification with institutions for accuracy.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Data Collection Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200 ml-2.5 dark:bg-gray-700"></div>
                
                <div className="space-y-8 relative">
                  <div className="ml-6 relative">
                    <div className="absolute -left-8 mt-1.5 w-4 h-4 rounded-full bg-primary"></div>
                    <h3 className="text-lg font-semibold">January-February</h3>
                    <p className="text-muted-foreground">
                      Registration period for institutions to participate in rankings.
                    </p>
                  </div>
                  
                  <div className="ml-6 relative">
                    <div className="absolute -left-8 mt-1.5 w-4 h-4 rounded-full bg-primary"></div>
                    <h3 className="text-lg font-semibold">March-May</h3>
                    <p className="text-muted-foreground">
                      Data submission period. Institutions upload required data through our portal.
                    </p>
                  </div>
                  
                  <div className="ml-6 relative">
                    <div className="absolute -left-8 mt-1.5 w-4 h-4 rounded-full bg-primary"></div>
                    <h3 className="text-lg font-semibold">June-July</h3>
                    <p className="text-muted-foreground">
                      Data verification and validation. Our team checks for accuracy and completeness.
                    </p>
                  </div>
                  
                  <div className="ml-6 relative">
                    <div className="absolute -left-8 mt-1.5 w-4 h-4 rounded-full bg-primary"></div>
                    <h3 className="text-lg font-semibold">August</h3>
                    <p className="text-muted-foreground">
                      Ranking calculations and finalization of results.
                    </p>
                  </div>
                  
                  <div className="ml-6 relative">
                    <div className="absolute -left-8 mt-1.5 w-4 h-4 rounded-full bg-primary"></div>
                    <h3 className="text-lg font-semibold">September</h3>
                    <p className="text-muted-foreground">
                      Release of annual rankings and reports.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Score Calculation Section */}
        <section id="calculation" className="scroll-mt-24">
          <h2 className="text-3xl font-bold tracking-tight mb-6">Score Calculation</h2>
          <p className="text-muted-foreground mb-6">
            Our ranking algorithm uses a weighted formula to calculate the overall score for each institution. The process involves normalizing individual parameters and applying weights to determine the final score.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Calculation Process</h3>
              <ol className="space-y-4">
                <li className="p-4 bg-muted rounded-md">
                  <div className="font-semibold mb-2">1. Parameter Score Calculation</div>
                  <p className="text-sm">Each parameter (TLR, RPP, GO, OI, PERC) has its own metrics and sub-parameters. Raw data for each metric is converted to a standardized score between 0-100.</p>
                </li>
                <li className="p-4 bg-muted rounded-md">
                  <div className="font-semibold mb-2">2. Parameter Aggregation</div>
                  <p className="text-sm">The scores of sub-parameters are aggregated using their respective weights to get the total parameter score.</p>
                </li>
                <li className="p-4 bg-muted rounded-md">
                  <div className="font-semibold mb-2">3. Apply Parameter Weights</div>
                  <p className="text-sm">The parameter weights (default or customized) are applied to the respective parameter scores.</p>
                </li>
                <li className="p-4 bg-muted rounded-md">
                  <div className="font-semibold mb-2">4. Final Score Calculation</div>
                  <p className="text-sm">The weighted parameter scores are summed to get the final overall score.</p>
                </li>
                <li className="p-4 bg-muted rounded-md">
                  <div className="font-semibold mb-2">5. Ranking Assignment</div>
                  <p className="text-sm">Institutions are ranked in descending order based on their final scores.</p>
                </li>
              </ol>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Calculation Formula</h3>
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="mb-4 text-center">
                    <p className="text-xl font-mono bg-muted/50 p-4 rounded-lg">
                      Final Score = (TLR × w<sub>1</sub>) + (RPP × w<sub>2</sub>) + (GO × w<sub>3</sub>) + (OI × w<sub>4</sub>) + (PERC × w<sub>5</sub>)
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Where:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li><b>TLR, RPP, GO, OI, PERC</b>: Individual parameter scores (0-100)</li>
                    <li><b>w<sub>1</sub>, w<sub>2</sub>, w<sub>3</sub>, w<sub>4</sub>, w<sub>5</sub></b>: Parameter weights (sum equals 1)</li>
                    <li><b>Default weights</b>: w<sub>1</sub> = 0.3, w<sub>2</sub> = 0.3, w<sub>3</sub> = 0.2, w<sub>4</sub> = 0.1, w<sub>5</sub> = 0.1</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Score Normalization</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Raw data for each metric is normalized to ensure fair comparison using the following approaches:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><b>Min-Max Scaling:</b> For metrics where higher values are better, scaling between 0-100.</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><b>Inverse Scaling:</b> For metrics where lower values are better (like student-faculty ratio).</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><b>Percentile Method:</b> For highly skewed distributions.</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><b>Threshold-based Scoring:</b> For metrics with defined standards or benchmarks.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Customization Section */}
        <section id="customization" className="scroll-mt-24">
          <h2 className="text-3xl font-bold tracking-tight mb-6">Customizing Rankings</h2>
          <p className="text-muted-foreground mb-6">
            Our platform allows users to create personalized rankings by adjusting parameter weights based on their 
            priorities and preferences. This customization feature empowers users to focus on aspects that matter most 
            to them.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>How to Customize Your Rankings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 border rounded-md">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                        <span className="font-semibold">1</span>
                      </div>
                      <h3 className="font-semibold">Visit Parameters Page</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Navigate to our Parameters page where you can adjust the weights for each ranking parameter.
                    </p>
                    <div className="mt-4">
                      <Button asChild>
                        <Link href="/parameters">
                          Go to Parameters <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-md">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                        <span className="font-semibold">2</span>
                      </div>
                      <h3 className="font-semibold">Adjust Parameter Weights</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Use the sliders to increase or decrease the importance of each parameter according to your priorities. 
                      The total weight must remain 100%.
                    </p>
                  </div>

                  <div className="p-4 border rounded-md">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                        <span className="font-semibold">3</span>
                      </div>
                      <h3 className="font-semibold">View & Save Custom Rankings</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Click "Update Rankings" to generate your personalized rankings. Login to save your custom 
                      parameter configurations for future use.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Example Scenarios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-muted rounded-md">
                    <h4 className="font-semibold mb-1">Research-Focused</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      If you prioritize research output and academic excellence:
                    </p>
                    <div className="text-sm">
                      <div className="flex justify-between mb-1">
                        <span>RPP (Research)</span>
                        <span className="font-medium">50%</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span>TLR (Teaching)</span>
                        <span className="font-medium">20%</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span>GO (Outcomes)</span>
                        <span className="font-medium">15%</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span>OI (Inclusivity)</span>
                        <span className="font-medium">5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>PERC (Perception)</span>
                        <span className="font-medium">10%</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-muted rounded-md">
                    <h4 className="font-semibold mb-1">Career-Oriented</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      If you value job placement and career outcomes:
                    </p>
                    <div className="text-sm">
                      <div className="flex justify-between mb-1">
                        <span>GO (Outcomes)</span>
                        <span className="font-medium">40%</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span>TLR (Teaching)</span>
                        <span className="font-medium">30%</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span>RPP (Research)</span>
                        <span className="font-medium">10%</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span>PERC (Perception)</span>
                        <span className="font-medium">15%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>OI (Inclusivity)</span>
                        <span className="font-medium">5%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Benefits of Customization</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><b>Personalized Results:</b> Rankings that align with your specific educational priorities and goals.</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><b>Better Decision Making:</b> Focus on factors that matter most to you in selecting an institution.</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><b>Scenario Testing:</b> Compare different weight configurations to see how rankings change.</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    <span><b>Saved Configurations:</b> Create and save multiple parameter settings for future reference (requires login).</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="scroll-mt-24">
          <h2 className="text-3xl font-bold tracking-tight mb-6">Frequently Asked Questions</h2>

          <div className="space-y-4 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">How often are the rankings updated?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Rankings are updated annually, with new data collection beginning in January and final rankings released in September. This schedule allows institutions time to compile and submit comprehensive data and our team to verify and process it thoroughly.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Why are parameter weights important?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Parameter weights determine the relative importance of different aspects of institutional quality in the overall ranking. They allow for customization based on individual priorities—whether that's research excellence, teaching quality, or career outcomes.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">How are new institutions added to the rankings?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Institutions must register during our annual registration window and provide complete data for all required parameters. New institutions undergo the same rigorous data verification process as existing ones before being included in the rankings.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Can institutions dispute their ranking?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes, institutions can request a review of their ranking through our formal dispute resolution process. This includes providing evidence to support their claim, which our team will thoroughly investigate. If an error is found, we promptly correct the ranking.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">How can I compare specific institutions side by side?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our platform offers a comparison feature that allows you to select up to three institutions and compare them across various parameters. This feature is available on the Parameters page by enabling "Compare Mode" and selecting the institutions you wish to compare.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Resources Section */}
        <section className="scroll-mt-24">
          <h2 className="text-3xl font-bold tracking-tight mb-6">Additional Resources</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 flex flex-col h-full">
                <div className="rounded-full bg-primary/10 p-3 w-fit mb-4">
                  <Download className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Full Methodology Guide</h3>
                <p className="text-muted-foreground mb-4 flex-grow">
                  Download our comprehensive methodology guide with detailed explanations of all parameters and calculation methods.
                </p>
                <Button variant="outline" className="w-full">
                  Download PDF <Download className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex flex-col h-full">
                <div className="rounded-full bg-primary/10 p-3 w-fit mb-4">
                  <LineChart className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Explore Rankings</h3>
                <p className="text-muted-foreground mb-4 flex-grow">
                  View the current rankings across different categories and years to compare educational institutions.
                </p>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/ranking/2024">
                    View Rankings <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex flex-col h-full">
                <div className="rounded-full bg-primary/10 p-3 w-fit mb-4">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Institution Guide</h3>
                <p className="text-muted-foreground mb-4 flex-grow">
                  Information for institutions on how to participate in the ranking process, data requirements, and submission guidelines.
                </p>
                <Button variant="outline" className="w-full">
                  Institution Guide <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-12">
          <Card className="bg-primary/5">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Start Customizing Your Rankings Today</h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-6">
                Create personalized rankings based on the parameters that matter most to you. Compare institutions, save your custom presets, and make better-informed decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80" asChild>
                  <Link href="/parameters">
                    Go to Parameter Page <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/ranking/2024">
                    View Current Rankings
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </motion.div>
    </div>
  )
}
