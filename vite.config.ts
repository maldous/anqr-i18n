import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

// Custom middleware to serve static files from public/gallery before SPA fallback
function serveGalleryFiles() {
  return {
    name: 'serve-gallery-files',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Check if request is for a gallery file
        if (req.url && req.url.startsWith('/gallery/')) {
          const filePath = path.join(__dirname, 'public', req.url)
          
          // Check if file exists
          if (fs.existsSync(filePath)) {
            const ext = path.extname(filePath).toLowerCase()
            const mimeTypes = {
              '.png': 'image/png',
              '.gif': 'image/gif',
              '.jpg': 'image/jpeg',
              '.jpeg': 'image/jpeg',
              '.webp': 'image/webp',
              '.svg': 'image/svg+xml',
              '.json': 'application/json',
            }
            
            const contentType = mimeTypes[ext] || 'application/octet-stream'
            res.setHeader('Content-Type', contentType)
            res.setHeader('Cache-Control', 'public, max-age=31536000')
            
            const fileStream = fs.createReadStream(filePath)
            fileStream.pipe(res)
            return
          }
        }
        next()
      })
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    serveGalleryFiles(), // Serve gallery files before React plugin
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
