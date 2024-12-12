"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  SquareTerminal,
} from "lucide-react"


import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavLink } from "react-router-dom";


const data = {

  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true
    },
    {
      title: "Models",
      url: "/models",
      icon: Bot
    },
    {
      title: "Documentation",
      url: "/documentation",
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
      <nav className="space-y-2">
          {data.navMain.map(({ title, url, icon: Icon }) => (
            <NavLink
              key={url}
              to={url}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-2 rounded-md ${
                  isActive ? "font-bold text-white" : "hover:text-customTheme-secondary"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{title}</span>
            </NavLink>
          ))}
        </nav>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
