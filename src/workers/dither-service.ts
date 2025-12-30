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

  constructor(maxWorkers = navigator.hardwareConcurrency || 4) {
    // Limit to reasonable number of workers
    this.maxWorkers = Math.min(maxWorkers, 8)
    
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
 */
export function shouldUseWorker(width: number, height: number): boolean {
  // Use worker for images larger than 256x256
  const pixels = width * height
  return pixels > 65536
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
