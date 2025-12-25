import { TooltipProvider } from '@/components/ui/tooltip'
import { Sidebar } from '@/components/Sidebar'
import { Preview } from '@/components/Preview'
import { Header } from '@/components/Header'
import { useState } from 'react'
import { useQRGenerator } from '@/hooks/useQRGenerator'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { download } = useQRGenerator()

  return (
    <TooltipProvider>
      <div className="h-screen bg-background flex flex-col overflow-hidden">
        <Header 
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
          sidebarOpen={sidebarOpen} 
          onExport={download}
        />
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <Preview sidebarOpen={sidebarOpen} />
        </div>
        {/* Fixed Footer - always visible at bottom */}
        <footer className={`border-t bg-muted/30 py-2 flex-shrink-0 transition-all duration-300 ${sidebarOpen ? 'lg:ml-96' : ''}`}>
          {/* Inner wrapper with margins to center over QR area (between ad columns) */}
          <div className="px-4 lg:mx-[160px] text-center">
            <p className="text-xs text-muted-foreground">
              <a href="#about" className="hover:underline">About</a>
              {' · '}
              <a href="#privacy" className="hover:underline">Privacy</a>
              {' · '}
              <a href="#terms" className="hover:underline">Terms</a>
              {' · '}
              <a href="#contact" className="hover:underline">Contact</a>
              {' · '}
              © ANQR 2025
            </p>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  )
}

export default App
