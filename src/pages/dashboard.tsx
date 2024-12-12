import { AppSidebar } from "@/components/common/app-sidebar"
import { Header } from "@/components/common/header-dashboard"
import MaxWidthWrapper from "@/components/common/max-width-wrapper"

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

import { Outlet } from "react-router-dom";


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
            <MaxWidthWrapper className="w-full">
                <header className="p-2">
                    <Header name="Tumelo" role="employee" initials="TM"/>
                </header>
                <div className="p-2 md:p-6 lg:p-8">
                    <Outlet />
                </div>
            </MaxWidthWrapper>
            
        </SidebarInset>

      </div>
     
    </SidebarProvider>
  )
}
