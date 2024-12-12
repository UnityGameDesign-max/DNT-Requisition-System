"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/common/nav-main";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"


const data = {

  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: SquareTerminal,
      isActive: true
    },
    {
      title: "Models",
      url: "#",
      icon: Bot
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="bg-customTheme-primary text-white rounded-tr-3xl rounded-br-3xl" collapsible="icon" {...props}>
      <SidebarHeader className="flex items-center justify-center mb-5">
        <img 
            src="https://ndt.co.za/wp-content/uploads/2024/06/New-Dawn-Technologies-Logo-01-edited-1920x1441.png"
            width={'100'}
        />
        <h1 className="font-bold">NEW DAWN <span className="text-customTheme-secondary">Requisition</span></h1>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
