"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Save, Trash2, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'
import { WeightsConfig, validateWeights, sanitizePresetName } from '@/lib/parameter-utils'

export type SavedPreset = {
  name: string
  weights: WeightsConfig
  category?: string
  year?: string
}

// For MongoDB stored format
type StoredPreset = {
  weights: WeightsConfig
  category?: string
  year?: string
}

interface ParameterSaveLoadProps {
  weights: WeightsConfig
  category: string
  year: string
  onLoadPreset: (preset: SavedPreset) => void
  disabled?: boolean
}

export default function ParameterSaveLoad({ weights, category, year, onLoadPreset, disabled = false }: ParameterSaveLoadProps) {
  const { data: session } = useSession()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [saveName, setSaveName] = useState('')
  const [savedPresets, setSavedPresets] = useState<SavedPreset[]>([])
  const [saveLoading, setSaveLoading] = useState(false)
  const [loadLoading, setLoadLoading] = useState(false)

  // Load user parameters from API when component mounts
  useEffect(() => {
    if (session?.user) {
      loadUserParameters()
    }
  }, [session])
  
  // Refresh the preset list every time the component mounts
  useEffect(() => {
    if (session?.user) {
      loadUserParameters()
    }
  }, [])

  // Load user parameters from API
  const loadUserParameters = async () => {
    if (!session?.user) return
    
    setLoadLoading(true)
    try {
      const res = await fetch('/api/user-parameters')
      const data = await res.json()
      
      if (data.success && data.data) {
        // Load saved presets
        if (data.data.saved_presets) {
          const presets: SavedPreset[] = Object.entries(data.data.saved_presets).map(
            ([name, preset]) => {
              // Handle both formats: direct weights or nested object with weights
              const weights = (preset as any).weights || preset;
              const category = (preset as any).category;
              const year = (preset as any).year;
              
              return {
                name,
                weights: weights as WeightsConfig,
                category,
                year
              };
            }
          )
          setSavedPresets(presets)
        }
      }
    } catch (error) {
      console.error("Failed to load parameters:", error)
      toast.error("Failed to load saved parameters")
    } finally {
      setLoadLoading(false)
    }
  }

  // Save current parameters as named preset
  const saveParameters = async () => {
    if (!session?.user) {
      toast.error("You must be logged in to save parameters")
      return
    }
    
    if (!saveName || saveName.trim() === "") {
      toast.error("Please enter a name for this preset")
      return
    }
    
    // Validate weights before saving
    const validation = validateWeights(weights)
    if (!validation.valid) {
      toast.error(validation.message || "Invalid parameter weights")
      return
    }
    
    // Sanitize the preset name for MongoDB
    const sanitizedName = sanitizePresetName(saveName)
    
    // Check if name already exists
    const existingPreset = savedPresets.find(preset => 
      preset.name.toLowerCase() === sanitizedName.toLowerCase()
    );
    
    setSaveLoading(true)
    try {
      const payload = { 
        parameters: weights, 
        name: sanitizedName,
        category,
        year 
      }
      
      const res = await fetch('/api/user-parameters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      
      const data = await res.json()
      
      if (data.success) {
        // If a preset with this name already exists, update it instead of adding a new one
        if (existingPreset) {
          setSavedPresets(savedPresets.map(p => 
            p.name === saveName.trim() ? { name: saveName.trim(), weights, category, year } : p
          ))
        } else {
          // Add to local state
          setSavedPresets([...savedPresets, { name: saveName.trim(), weights, category, year }])
        }
        
        setSaveName('')
        setIsDialogOpen(false)
        toast.success(existingPreset ? "Preset updated successfully" : "Preset saved successfully")
      } else {
        throw new Error(data.message || "Failed to save")
      }
    } catch (error) {
      console.error("Failed to save parameters:", error)
      toast.error(`Failed to save parameters: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setSaveLoading(false)
    }
  }
  
  // Delete a saved preset
  const deletePreset = async (name: string) => {
    if (!session?.user) {
      toast.error("You must be logged in to delete presets")
      return
    }
    
    // Confirm deletion
    const confirmed = confirm(`Are you sure you want to delete the preset "${name}"?`)
    if (!confirmed) return
    
    try {
      const res = await fetch('/api/user-parameters', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
      })
      
      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || `Failed to delete (Status: ${res.status})`)
      }
      
      const data = await res.json()
      
      if (data.success) {
        // Remove from local state
        setSavedPresets(savedPresets.filter(preset => preset.name !== name))
        toast.success(`Preset "${name}" deleted successfully`)
      } else {
        throw new Error(data.message || data.error || "Failed to delete")
      }
    } catch (error) {
      console.error("Failed to delete preset:", error)
      toast.error(`Failed to delete preset: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  if (!session) {
    return (
      <Button 
        variant="outline" 
        size="sm" 
        asChild
      >
        <Link href="/login">
          <Save className="mr-2 h-4 w-4" />
          Login to Save
        </Link>
      </Button>
    );
  }

  return (
    <div className="flex gap-2 items-center">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" disabled={disabled || saveLoading}>
            <Save className={`mr-2 h-4 w-4 ${saveLoading ? "animate-pulse" : ""}`} />
            {saveLoading ? "Saving..." : "Save Preset"}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Parameter Preset</DialogTitle>
            <DialogDescription>
              Give your parameter configuration a name so you can easily find it later.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Input
                placeholder="My Custom Rankings"
                value={saveName}
                onChange={(e) => setSaveName(e.target.value)}
                disabled={saveLoading}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && saveName && !saveLoading) {
                    saveParameters();
                  }
                }}
              />
              {savedPresets.length > 0 && (
                <p className="text-xs text-muted-foreground mt-2">
                  You have {savedPresets.length} saved preset{savedPresets.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button 
              onClick={saveParameters} 
              disabled={!saveName || saveLoading}
            >
              {saveLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : "Save Preset"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {savedPresets.length > 0 ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" disabled={disabled || loadLoading}>
              {loadLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </>
              ) : (
                <>
                  Load Preset
                  <ChevronDown className="ml-2 h-4 w-4" /> 
                </>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60">
            <DropdownMenuLabel>My Saved Presets ({savedPresets.length})</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {savedPresets.map((preset) => (
              <DropdownMenuItem 
                key={preset.name} 
                onSelect={() => onLoadPreset(preset)}
                className="flex items-center justify-between"
              >
                <div className="flex flex-col">
                  <span className="font-medium">{preset.name}</span>
                  {(preset.category || preset.year) && (
                    <span className="text-xs text-muted-foreground">
                      {preset.category && `${preset.category.charAt(0).toUpperCase() + preset.category.slice(1)}`}
                      {preset.category && preset.year && ' · '}
                      {preset.year}
                    </span>
                  )}
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePreset(preset.name);
                  }}
                  className="ml-2 text-destructive hover:text-destructive/80"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button variant="outline" size="sm" disabled={true} title="No saved presets">
          No Saved Presets
        </Button>
      )}
    </div>
  )
}
