"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FileText, Download, Search, Filter, Calendar, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample document data
const documents = [
  {
    id: 1,
    title: "Ranking Methodology 2024",
    description: "Comprehensive guide to our ranking methodology and parameters",
    category: "methodology",
    date: "2024-01-15",
    type: "pdf",
    size: "2.4 MB",
    views: 1245,
  },
  {
    id: 2,
    title: "Parameter Definitions and Calculations",
    description: "Detailed explanation of each parameter and how scores are calculated",
    category: "parameters",
    date: "2024-01-20",
    type: "pdf",
    size: "1.8 MB",
    views: 987,
  },
  {
    id: 3,
    title: "Data Collection Guidelines",
    description: "Standards and procedures for collecting and validating ranking data",
    category: "data",
    date: "2024-02-05",
    type: "pdf",
    size: "1.2 MB",
    views: 756,
  },
  {
    id: 4,
    title: "CSV Format Specification",
    description: "Technical specification for CSV data format and requirements",
    category: "data",
    date: "2024-02-10",
    type: "pdf",
    size: "0.9 MB",
    views: 543,
  },
  {
    id: 5,
    title: "Parameter Weight Analysis",
    description: "Research on the impact of different parameter weights on rankings",
    category: "research",
    date: "2024-02-25",
    type: "pdf",
    size: "3.1 MB",
    views: 432,
  },
  {
    id: 6,
    title: "Historical Ranking Trends (2020-2024)",
    description: "Analysis of ranking trends and changes over the past five years",
    category: "research",
    date: "2024-03-10",
    type: "pdf",
    size: "4.2 MB",
    views: 876,
  },
  {
    id: 7,
    title: "User Guide: Customizing Parameters",
    description: "Step-by-step guide to using the parameter customization features",
    category: "guide",
    date: "2024-03-15",
    type: "pdf",
    size: "1.5 MB",
    views: 1098,
  },
  {
    id: 8,
    title: "API Documentation",
    description: "Technical documentation for the Rankify API",
    category: "technical",
    date: "2024-03-20",
    type: "pdf",
    size: "2.0 MB",
    views: 321,
  },
]

// Document categories
const categories = [
  { value: "all", label: "All Categories" },
  { value: "methodology", label: "Methodology" },
  { value: "parameters", label: "Parameters" },
  { value: "data", label: "Data Management" },
  { value: "research", label: "Research" },
  { value: "guide", label: "User Guides" },
  { value: "technical", label: "Technical" },
]

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [activeTab, setActiveTab] = useState("all")
  const [sortBy, setSortBy] = useState("date")

  // Filter documents based on search query, category, and tab
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      searchQuery === "" ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = activeCategory === "all" || doc.category === activeCategory

    return matchesSearch && matchesCategory
  })

  // Sort documents
  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    } else if (sortBy === "views") {
      return b.views - a.views
    } else if (sortBy === "title") {
      return a.title.localeCompare(b.title)
    }
    return 0
  })

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
          <p className="text-muted-foreground mt-1">
            Access methodology guides, technical documentation, and research papers
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="relative w-full md:w-2/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-1/3">
          <div className="w-full">
            <Select value={activeCategory} onValueChange={setActiveCategory}>
              <SelectTrigger>
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by category" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Sort by" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Newest First</SelectItem>
                <SelectItem value="views">Most Viewed</SelectItem>
                <SelectItem value="title">Alphabetical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="all">All Documents</TabsTrigger>
          <TabsTrigger value="recent">Recently Added</TabsTrigger>
          <TabsTrigger value="popular">Most Popular</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedDocuments.length > 0 ? (
              sortedDocuments.map((doc, index) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="h-full flex flex-col">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <Badge variant="outline" className="mb-2">
                          {doc.category.charAt(0).toUpperCase() + doc.category.slice(1)}
                        </Badge>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Eye className="h-3 w-3 mr-1" />
                          {doc.views}
                        </div>
                      </div>
                      <CardTitle className="text-lg">{doc.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{doc.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-3 pt-0">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        {formatDate(doc.date)}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <FileText className="h-3.5 w-3.5 mr-1" />
                        {doc.type.toUpperCase()} • {doc.size}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-3 mt-auto">
                      <Button variant="outline" className="w-full" asChild>
                        <a href="#" onClick={(e) => e.preventDefault()}>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium mb-2">No documents found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
                <Button
                  variant="link"
                  onClick={() => {
                    setSearchQuery("")
                    setActiveCategory("all")
                  }}
                  className="mt-2"
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedDocuments
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .slice(0, 6)
              .map((doc, index) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="h-full flex flex-col">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <Badge variant="outline" className="mb-2">
                          {doc.category.charAt(0).toUpperCase() + doc.category.slice(1)}
                        </Badge>
                        <Badge variant="secondary">New</Badge>
                      </div>
                      <CardTitle className="text-lg">{doc.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{doc.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-3 pt-0">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        {formatDate(doc.date)}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <FileText className="h-3.5 w-3.5 mr-1" />
                        {doc.type.toUpperCase()} • {doc.size}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-3 mt-auto">
                      <Button variant="outline" className="w-full" asChild>
                        <a href="#" onClick={(e) => e.preventDefault()}>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="popular" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedDocuments
              .sort((a, b) => b.views - a.views)
              .slice(0, 6)
              .map((doc, index) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="h-full flex flex-col">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <Badge variant="outline" className="mb-2">
                          {doc.category.charAt(0).toUpperCase() + doc.category.slice(1)}
                        </Badge>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Eye className="h-3 w-3 mr-1" />
                          {doc.views}
                        </div>
                      </div>
                      <CardTitle className="text-lg">{doc.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{doc.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-3 pt-0">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        {formatDate(doc.date)}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <FileText className="h-3.5 w-3.5 mr-1" />
                        {doc.type.toUpperCase()} • {doc.size}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-3 mt-auto">
                      <Button variant="outline" className="w-full" asChild>
                        <a href="#" onClick={(e) => e.preventDefault()}>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
