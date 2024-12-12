import { AppSidebar } from "@/components/common/app-sidebar"

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export function Dashboard() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "19rem",
        } as React.CSSProperties
      }
    >
      <div className="bg-customTheme-light flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset>
            <div className="w-full ">
                <header className="p-6">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                </header>
                <div className="p-6 md:p-8 lg:p-12">
                
                    <h1>content</h1>
                </div>

            </div>
            
        </SidebarInset>

      </div>
     
    </SidebarProvider>
  )
}
