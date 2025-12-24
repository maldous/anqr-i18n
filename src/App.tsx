import { TooltipProvider } from '@/components/ui/tooltip'
import { Sidebar } from '@/components/Sidebar'
import { Preview } from '@/components/Preview'
import { Header } from '@/components/Header'
import { useState } from 'react'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex-1 flex overflow-hidden relative">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <Preview sidebarOpen={sidebarOpen} />
        </div>
      </div>
    </TooltipProvider>
  )
}

export default App
