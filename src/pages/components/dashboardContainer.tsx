import { AppSidebar } from "@/components/common/app-sidebar"
import { Header } from "@/components/common/header-dashboard"
import MaxWidthWrapper from "@/components/common/max-width-wrapper"

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { getInitials } from "@/lib/utils";
import { useSelector } from "react-redux";


import { Outlet } from "react-router-dom";


export function DashboardContainer() {


  // const { name, role } = useSelector((state: any) => state.user);

  const name = localStorage.getItem("name") || '';
  const role = localStorage.getItem("role") || '';

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

                    <Header name={name} role={role} initials={getInitials(name)}/>
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
