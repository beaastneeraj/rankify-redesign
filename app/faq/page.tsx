"use client"

import React, { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, ChevronDown } from 'lucide-react'



type FAQItemProps = {
  faq: FaqItem;
  isExpanded: boolean;
  onToggle: () => void;
};



/**
 * @typedef {{ id: string; question: string; answer: string; category: string }} FaqItem
 * @typedef {{ name: string; label: string }} CategoryItem
 */


type FaqItem = {
  id: string;
  question: string;
  answer: string;
  category: string;
};
// FAQ data
/** @type {FaqItem[]} */
const faqs = [
  {
    id: '1',
    question: "How are the rankings calculated?",
    answer: "Our rankings are calculated based on five key parameters: Teaching, Learning & Resources (TLR), Research & Professional Practice (RPP), Graduation Outcomes (GO), Outreach & Inclusivity (OI), and Perception (PERC). Each parameter has a default weight, but users can customize these weights to create personalized rankings.",
    category: "methodology"
  },
  {
    id: '2',
    question: "Can I customize the parameter weights?",
    answer: "Yes, you can customize the weights of each parameter on the Parameters page. The dynamic sliders allow you to adjust the importance of each parameter, with longer sliders indicating higher importance. The total weight must equal 100%.",
    category: "parameters"
  },
  {
    id: '3',
    question: "How often is the ranking data updated?",
    answer: "We update our base ranking data annually, typically after the academic year ends. However, you can upload your own data via CSV at any time to create custom rankings.",
    category: "data"
  },
  {
    id: '4',
    question: "Can I export the customized rankings?",
    answer: "Yes, after customizing the parameters and updating the rankings, you can export the results as a CSV file by clicking the 'Export CSV' button on the Parameters page.",
    category: "features"
  },
  {
    id: '5',
    question: "What file format is required for data upload?",
    answer: "We accept CSV (Comma-Separated Values) files. The file should have a header row with column names including 'institution', 'rank', and 'score' at minimum. Additional columns for parameter scores and location information are recommended for better results.",
    category: "data"
  },
  {
    id: '6',
    question: "Is there a mobile app available?",
    answer: "Currently, we offer a responsive web application that works well on mobile devices. A dedicated mobile app is in our development roadmap for future releases.",
    category: "features"
  },
  {
    id: '7',
    question: "How do I interpret the parameter scores?",
    answer: "Parameter scores are on a scale of 0-100, with higher scores indicating better performance. The overall score is a weighted average of the parameter scores based on the weights you assign.",
    category: "methodology"
  },
  {
    id: '8',
    question: "Can I compare multiple institutions side by side?",
    answer: "Yes, you can select multiple institutions from the rankings table to compare them side by side. This feature allows you to see how different institutions perform across various parameters.",
    category: "features"
  },
  {
    id: '9',
    question: "What is the difference between 'New Rank' and 'Original Rank'?",
    answer: "The 'Original Rank' is the institution's position in the default ranking with standard parameter weights. The 'New Rank' is the position after applying your custom parameter weights.",
    category: "methodology"
  },
  {
    id: '10',
    question: "How can I report an issue or suggest a feature?",
    answer: "You can report issues or suggest features through our Contact page. We value user feedback and continuously work to improve the platform based on user suggestions.",
    category: "support"
  },
];



// FAQ categories
/** @type {CategoryItem[]} */
const categories = [
  { name: "all", label: "All Categories" },
  { name: "methodology", label: "Methodology" },
  { name: "parameters", label: "Parameters" },
  { name: "data", label: "Data Management" },
  { name: "features", label: "Features" },
  { name: "support", label: "Support" },
]

// FAQItem component
const FAQItem: React.FC<{ faq: FaqItem; isExpanded: boolean; onToggle: () => void }> = React.memo(({ faq, isExpanded, onToggle }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="border rounded-lg overflow-hidden"
  >
    <button
      onClick={onToggle}
      aria-expanded={isExpanded}
      className="flex items-center justify-between w-full p-4 text-left bg-background hover:bg-muted/50 transition-colors"
    >
      <h3 className="font-medium">{faq.question}</h3>
      <ChevronDown
        className={`h-5 w-5 text-muted-foreground transition-transform ${
          isExpanded ? 'rotate-180' : ''
        }`}
      />
    </button>

    <AnimatePresence initial={false}>
      {isExpanded && (
        <motion.div
          key="content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="p-4 pt-0 border-t">
            <p className="text-muted-foreground">{faq.answer}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
))
FAQItem.displayName = 'FAQItem'

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const handleToggle = useCallback((id: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }, [])

  const filteredFaqs = useMemo(() => {
    return faqs
      .filter((f) => activeCategory === 'all' || f.category === activeCategory)
      .filter((f) =>
        f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
  }, [activeCategory, searchQuery])

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12 max-w-5xl mx-auto">
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Find answers to common questions about our ranking platform,
          methodology, and features.
        </p>
      </div>

      <div className="flex flex-col gap-4 mb-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
            aria-label="Search questions"
          />
        </div>

        <div className="flex overflow-x-auto gap-2 w-full">
          {categories.map((cat) => (
            <Button
              key={cat.name}
              variant={activeCategory === cat.name ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(cat.name)}
              className="whitespace-nowrap"
              aria-pressed={activeCategory === cat.name}
            >
              {cat.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isExpanded={expandedItems.has(faq.id)}
              onToggle={() => handleToggle(faq.id)}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No results found for your search.
            </p>
            <Button
              variant="link"
              onClick={() => {
                setSearchQuery('')
                setActiveCategory('all')
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
