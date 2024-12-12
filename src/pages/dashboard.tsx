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


export function Dashboard() {

;
  const { name, role, isAuthenticated } = useSelector((state : any) => state.user);

  console.log("name", name)
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
