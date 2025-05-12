"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FileText, Download, Search, Filter, Calendar, Eye } from "lucide-react"
import { FaChalkboardTeacher, FaFlask, FaGraduationCap, FaUsers, FaStar, FaCogs, FaSlidersH, FaUniversity, FaUserShield, FaCloudUploadAlt, FaCode, FaQuestionCircle, FaRegCheckCircle } from 'react-icons/fa';

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

function Section({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <div className="flex items-center mb-3">
        <span className="text-primary text-2xl mr-2">{icon}</span>
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      </div>
      <div className="pl-8 border-l-4 border-primary/20 bg-muted/40 rounded-md py-3">
        {children}
      </div>
    </section>
  );
}

function ParameterCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex items-start gap-3 bg-white/80 dark:bg-zinc-900/80 rounded-lg shadow p-4 border border-muted mb-3">
      <span className="text-xl text-primary mt-1">{icon}</span>
      <div>
        <div className="font-semibold text-lg">{title}</div>
        <div className="text-sm text-muted-foreground leading-relaxed">{description}</div>
      </div>
    </div>
  );
}

function DocumentationContent() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold mb-2 tracking-tight bg-gradient-to-r from-primary to-blue-500 text-transparent bg-clip-text">Rankify Documentation</h1>
        <p className="text-lg text-muted-foreground">A transparent, customizable, and data-driven ranking platform for Indian institutions.</p>
      </div>
      <Section icon={<FaCogs />} title="Overview">
        <p>
          <b>Rankify</b> is a modern platform for exploring, customizing, and comparing institutional rankings in India. Powered by official NIRF datasets, it lets you analyze, filter, and personalize rankings with full transparency and beautiful visualizations.
        </p>
      </Section>
      <Section icon={<FaSlidersH />} title="Ranking Parameters Explained">
        <p className="mb-4">
          Institutions are evaluated on five core parameters. Default weights follow NIRF methodology, but you can customize them on the Parameters page.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <ParameterCard icon={<FaChalkboardTeacher />} title="TLR (Teaching, Learning & Resources)" description="Faculty-student ratio, faculty qualifications, infrastructure, and resources. High TLR = strong teaching quality and support." />
          <ParameterCard icon={<FaFlask />} title="RPP (Research & Professional Practice)" description="Research output, publications, patents, projects, and industry engagement. High RPP = strong research culture." />
          <ParameterCard icon={<FaGraduationCap />} title="GO (Graduation Outcomes)" description="Student performance, placements, higher studies, entrepreneurship, and salaries. High GO = better student outcomes." />
          <ParameterCard icon={<FaUsers />} title="OI (Outreach & Inclusivity)" description="Diversity, outreach, and representation of disadvantaged groups. High OI = more inclusive and diverse campus." />
          <ParameterCard icon={<FaStar />} title="Perception (PR)" description="Peer, employer, and public perception. High PR = strong reputation and trust." />
        </div>
        <div className="mb-2">
          <b>Default Weights (NIRF 2024):</b> <span className="text-primary">TLR: 30%</span>, <span className="text-primary">RPP: 30%</span>, <span className="text-primary">GO: 20%</span>, <span className="text-primary">OI: 10%</span>, <span className="text-primary">Perception: 10%</span>
        </div>
        <div className="mb-2">
          <b>Allowed Ranges:</b>
          <ul className="list-disc ml-6">
            <li>TLR: 10% - 60%</li>
            <li>RPP: 5% - 50%</li>
            <li>GO: 5% - 50%</li>
            <li>OI: 5% - 20%</li>
            <li>Perception: 5% - 20%</li>
          </ul>
        </div>
      </Section>
      <Section icon={<FaRegCheckCircle />} title="Ranking Formula">
        <p className="mb-2">
          The overall score is a weighted sum of the five parameters:
        </p>
        <pre className="p-0 bg-transparent text-base mb-2 border-0 shadow-none">
{`Score =
  (TLR × (TLR_weight / Total_weight)) +
  (RPP × (RPP_weight / Total_weight)) +
  (GO × (GO_weight / Total_weight)) +
  (OI × (OI_weight / Total_weight)) +
  (Perception × (Perception_weight / Total_weight))
`}
        </pre>
        <div className="text-sm text-muted-foreground mb-2">
          <b>Example:</b> If TLR=80, RPP=60, GO=70, OI=50, Perception=40, and default weights:<br />
          <span className="font-mono">(80×0.3) + (60×0.3) + (70×0.2) + (50×0.1) + (40×0.1) = 65</span>
        </div>
      </Section>
      <Section icon={<FaUniversity />} title="Ranking Page">
        <ul className="list-disc ml-6">
          <li>Browse official rankings by category and year.</li>
          <li>Filter by region, state, or search by name/city.</li>
          <li>Sort by rank, score, or institution name.</li>
          <li>Export the current view as CSV.</li>
          <li>Click an institution for details and report.</li>
        </ul>
      </Section>
      <Section icon={<FaSlidersH />} title="Parameters Page">
        <ul className="list-disc ml-6">
          <li>Adjust weights for each parameter using sliders.</li>
          <li>Click "Update Rankings" to recalculate scores and ranks.</li>
          <li>Compare up to 3 institutions side-by-side.</li>
          <li>Export your custom rankings as CSV.</li>
        </ul>
      </Section>
      <Section icon={<FaChalkboardTeacher />} title="Institution Details">
        <ul className="list-disc ml-6">
          <li>Click any institution name to view its profile.</li>
          <li>See detailed scores, city/state, and download the official report.</li>
        </ul>
      </Section>
      <Section icon={<FaUserShield />} title="Authentication">
        <ul className="list-disc ml-6">
          <li>Sign up or log in to save preferences and compare lists.</li>
          <li>Reset your password via email if needed.</li>
        </ul>
      </Section>
      <Section icon={<FaCloudUploadAlt />} title="Data Upload (Admin)">
        <ul className="list-disc ml-6">
          <li>Admins can upload new ranking datasets via CSV.</li>
          <li>Uploaded data is validated and stored in the database.</li>
        </ul>
      </Section>
      <Section icon={<FaCode />} title="API">
        <ul className="list-disc ml-6">
          <li>Public API endpoints for fetching rankings and institution data.</li>
          <li>Supports filtering, parameter customization, and region/state queries.</li>
        </ul>
      </Section>
      <Section icon={<FaQuestionCircle />} title="Support & Feedback">
        <ul className="list-disc ml-6">
          <li>Visit the FAQ or contact page for help.</li>
          <li>Feedback and suggestions are welcome!</li>
        </ul>
      </Section>
    </div>
  );
}

export default function DocumentsPage() {
  return <DocumentationContent />;
}
