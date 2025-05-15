/**
 * Utility functions for parameter validation and management
 */

import { toast } from 'sonner';

export type WeightsConfig = {
  tlr: number
  rpp: number
  go: number
  oi: number
  perc: number
}

// Common parameter limits
export const PARAM_LIMITS = {
  tlr: { min: 10, max: 60 },
  rpp: { min: 5, max: 50 },
  go: { min: 5, max: 50 },
  oi: { min: 5, max: 20 },
  perc: { min: 5, max: 20 },
}

/**
 * Validate parameter weights to ensure they meet requirements
 */
export function validateWeights(weights: WeightsConfig): { valid: boolean; message?: string } {
  const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0);
  
  // Check if total is 100%
  if (totalWeight !== 100) {
    return { valid: false, message: `Total weight must be 100% (currently ${totalWeight}%)` };
  }
  
  // Check each parameter is within its limits
  for (const [param, value] of Object.entries(weights)) {
    const key = param as keyof typeof weights;
    const { min, max } = PARAM_LIMITS[key];
    
    if (value < min || value > max) {
      return { 
        valid: false, 
        message: `${param.toUpperCase()} must be between ${min}% and ${max}% (currently ${value}%)`
      };
    }
  }
  
  return { valid: true };
}

/**
 * Sanitize a preset name for MongoDB key safety
 */
export function sanitizePresetName(name: string): string {
  // Replace characters that could cause issues in MongoDB keys
  return name
    .replace(/\./g, '_') // Replace dots with underscores
    .replace(/\$/g, '_') // Replace $ with underscores
    .trim();
}

/**
 * Check if two weight configurations are equal
 */
export function areWeightsEqual(weights1: WeightsConfig, weights2: WeightsConfig): boolean {
  return (
    weights1.tlr === weights2.tlr &&
    weights1.rpp === weights2.rpp &&
    weights1.go === weights2.go &&
    weights1.oi === weights2.oi &&
    weights1.perc === weights2.perc
  );
}
