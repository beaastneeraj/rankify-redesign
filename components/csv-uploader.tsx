"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Upload, Check, AlertCircle, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface CSVUploaderProps {
  onUpload: (data: any[]) => void
  accept?: string
  maxSize?: number // in MB
}

export function CSVUploader({ onUpload, accept = ".csv", maxSize = 5 }: CSVUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const processFile = (file: File) => {
    // Reset states
    setError(null)
    setSuccess(false)

    // Check file type
    if (!file.name.endsWith(".csv")) {
      setError("Please upload a CSV file")
      return
    }

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size exceeds ${maxSize}MB limit`)
      return
    }

    setFileName(file.name)
    setIsUploading(true)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 100)

    // Parse CSV
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const csv = event.target?.result as string
        const lines = csv.split("\n")
        const headers = lines[0].split(",")

        const data = lines
          .slice(1)
          .map((line) => {
            if (!line.trim()) return null

            const values = line.split(",")
            return headers.reduce(
              (obj, header, i) => {
                obj[header.trim()] = values[i]?.trim() || ""
                return obj
              },
              {} as Record<string, string>,
            )
          })
          .filter(Boolean)

        // Finish upload simulation
        setTimeout(() => {
          clearInterval(interval)
          setUploadProgress(100)

          setTimeout(() => {
            setIsUploading(false)
            setSuccess(true)
            onUpload(data)
          }, 500)
        }, 1000)
      } catch (err) {
        clearInterval(interval)
        setIsUploading(false)
        setError("Failed to parse CSV file. Please check the format.")
      }
    }

    reader.onerror = () => {
      clearInterval(interval)
      setIsUploading(false)
      setError("Failed to read file")
    }

    reader.readAsText(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0])
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="w-full">
      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept={accept} className="hidden" />

      {!isUploading && !success ? (
        <motion.div
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20"
          } transition-colors duration-200`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">Upload CSV File</h3>
          <p className="text-sm text-muted-foreground mb-4">Drag and drop your CSV file here, or click to browse</p>
          <Button onClick={triggerFileInput} variant="outline">
            Select File
          </Button>
          {error && (
            <div className="mt-4 p-3 bg-destructive/10 text-destructive text-sm rounded flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              {error}
            </div>
          )}
        </motion.div>
      ) : isUploading ? (
        <div className="border rounded-lg p-8">
          <h3 className="text-lg font-medium mb-4">Uploading {fileName}</h3>
          <Progress value={uploadProgress} className="h-2 mb-2" />
          <p className="text-sm text-muted-foreground">{uploadProgress}% complete</p>
        </div>
      ) : (
        <motion.div
          className="border rounded-lg p-8 bg-primary/5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mr-4">
              <Check className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Upload Complete</h3>
              <p className="text-sm text-muted-foreground">{fileName}</p>
            </div>
          </div>
          <div className="flex items-center">
            <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">CSV file processed successfully</span>
          </div>
          <div className="mt-4 flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSuccess(false)
                setFileName(null)
              }}
            >
              Upload Another
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
