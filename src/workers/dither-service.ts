/**
 * Dither Service
 * 
 * Manages the dither Web Worker lifecycle with fallback to main thread processing.
 * Uses Comlink for seamless async communication.
 * 
 * Features:
 * - Lazy initialization of Web Worker
 * - Automatic fallback to main thread if Workers unavailable
 * - Connection pooling for multiple parallel operations
 * - Graceful error handling
 */

import * as Comlink from 'comlink'
import type { DitherWorkerApi, DitherWorkerInput, DitherWorkerResult } from './dither.worker'
import { applyDither, type DitherOptions as ModuleDitherOptions, type DitherResult } from '../modules/dither-algorithms'

// ============================================
// MOBILE DETECTION
// ============================================

let _isMobile: boolean | null = null

/**
 * Detect if running on a mobile device
 * Caches result for performance
 */
export function isMobile(): boolean {
  if (_isMobile !== null) return _isMobile
  
  if (typeof navigator === 'undefined') {
    _isMobile = false
    return false
  }
  
  // Check user agent for mobile indicators
  const ua = navigator.userAgent || ''
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)
  
  // Also check for touch capability as a secondary signal
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  
  // Consider mobile if user agent matches OR if it's a touch device with small screen
  const isSmallScreen = typeof window !== 'undefined' && window.innerWidth < 768
  
  _isMobile = isMobileUA || (hasTouch && isSmallScreen)
  return _isMobile
}

// ============================================
// TYPES
// ============================================

interface WorkerInstance {
  worker: Worker
  api: Comlink.Remote<DitherWorkerApi>
  busy: boolean
}

// ============================================
// WORKER POOL
// ============================================

class DitherWorkerPool {
  private workers: WorkerInstance[] = []
  private maxWorkers: number
  private initialized = false
  private useWorkers = true

  constructor(maxWorkers?: number) {
    // On mobile, limit to 2 workers to reduce overhead
    // On desktop, use hardware concurrency up to 8
    const defaultMax = isMobile() ? 2 : (navigator.hardwareConcurrency || 4)
    this.maxWorkers = Math.min(maxWorkers ?? defaultMax, isMobile() ? 2 : 8)
    
    // Check if Web Workers are supported
    if (typeof Worker === 'undefined') {
      this.useWorkers = false
    }
  }

  /**
   * Initialize the worker pool lazily
   */
  private async initializePool(): Promise<void> {
    if (this.initialized || !this.useWorkers) return

    try {
      // Create initial worker to test if workers work
      const testWorker = await this.createWorker()
      if (testWorker) {
        this.workers.push(testWorker)
        this.initialized = true
      }
    } catch (error) {
      console.warn('Web Workers not available, falling back to main thread:', error)
      this.useWorkers = false
    }
  }

  /**
   * Create a new worker instance
   */
  private async createWorker(): Promise<WorkerInstance | null> {
    try {
      // Use Vite's worker import syntax
      const worker = new Worker(
        new URL('./dither.worker.ts', import.meta.url),
        { type: 'module' }
      )
      
      const api = Comlink.wrap<DitherWorkerApi>(worker)
      
      // Test the connection
      const pong = await api.ping()
      if (pong !== 'pong') {
        throw new Error('Worker ping failed')
      }
      
      return { worker, api, busy: false }
    } catch (error) {
      console.error('Failed to create dither worker:', error)
      return null
    }
  }

  /**
   * Get an available worker, creating one if needed
   */
  private async getWorker(): Promise<WorkerInstance | null> {
    await this.initializePool()
    
    if (!this.useWorkers) return null

    // Find an idle worker
    const idle = this.workers.find(w => !w.busy)
    if (idle) {
      idle.busy = true
      return idle
    }

    // Create a new worker if under the limit
    if (this.workers.length < this.maxWorkers) {
      const newWorker = await this.createWorker()
      if (newWorker) {
        newWorker.busy = true
        this.workers.push(newWorker)
        return newWorker
      }
    }

    // Wait for a worker to become available
    return new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        const available = this.workers.find(w => !w.busy)
        if (available) {
          clearInterval(checkInterval)
          available.busy = true
          resolve(available)
        }
      }, 10)
      
      // Timeout after 5 seconds
      setTimeout(() => {
        clearInterval(checkInterval)
        resolve(null)
      }, 5000)
    })
  }

  /**
   * Release a worker back to the pool
   */
  private releaseWorker(instance: WorkerInstance): void {
    instance.busy = false
  }

  /**
   * Process dithering - uses worker if available, falls back to main thread
   */
  async dither(imageData: ImageData, options: ModuleDitherOptions): Promise<DitherResult> {
    const worker = await this.getWorker()
    
    if (worker) {
      try {
        const input: DitherWorkerInput = {
          imageData: {
            data: imageData.data,
            width: imageData.width,
            height: imageData.height,
          },
          options,
        }
        
        const result = await worker.api.ditherImage(input)
        this.releaseWorker(worker)
        
        // Convert colors back to the expected format
        return {
          matrix: result.matrix,
          colors: result.colors,
        }
      } catch (error) {
        console.error('Worker dithering failed, falling back to main thread:', error)
        this.releaseWorker(worker)
      }
    }
    
    // Fall back to main thread processing
    return applyDither(imageData, options)
  }

  /**
   * Terminate all workers
   */
  terminate(): void {
    for (const { worker } of this.workers) {
      worker.terminate()
    }
    this.workers = []
    this.initialized = false
  }
}

// ============================================
// SINGLETON INSTANCE
// ============================================

let poolInstance: DitherWorkerPool | null = null

/**
 * Get the shared worker pool instance
 */
export function getDitherWorkerPool(): DitherWorkerPool {
  if (!poolInstance) {
    poolInstance = new DitherWorkerPool()
  }
  return poolInstance
}

/**
 * Process dithering using the worker pool
 */
export async function ditherWithWorker(
  imageData: ImageData,
  options: ModuleDitherOptions
): Promise<DitherResult> {
  return getDitherWorkerPool().dither(imageData, options)
}

/**
 * Check if dithering should use workers (for large images)
 * On mobile, use higher threshold since worker overhead is more significant
 */
export function shouldUseWorker(width: number, height: number): boolean {
  const pixels = width * height
  // On mobile, only use worker for larger images (>512x512) due to overhead
  // On desktop, use worker for images >256x256
  const threshold = isMobile() ? 262144 : 65536
  return pixels > threshold
}

/**
 * Terminate the worker pool (call on app unmount)
 */
export function terminateDitherWorkers(): void {
  if (poolInstance) {
    poolInstance.terminate()
    poolInstance = null
  }
}

export default {
  getDitherWorkerPool,
  ditherWithWorker,
  shouldUseWorker,
  terminateDitherWorkers,
}
