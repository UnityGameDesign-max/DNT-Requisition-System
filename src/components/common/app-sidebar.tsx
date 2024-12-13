import * as React from "react"
import {
  Bell,
  ClipboardPlus,
  LayoutDashboard,
  SquarePen,
} from "lucide-react"


import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavLink } from "react-router-dom";




export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const role = localStorage.getItem('role');

  const data = {

    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
        role: ["admin", "employee", "Human Resources", "Finance Manager"]
      },
      {
        title: "Requisition creation",
        url: "/dashboard/requisition-creation",
        icon: SquarePen,
        role: ["employee"]
      },
      {
        title: "Add approval",
        url: "/dashboard/add-approval",
        icon: ClipboardPlus,
        role: ["admin", "Human Resources", "Finance Manager"]
      },
      {
        title: "Approvals",
        url: "/dashboard/approvals",
        icon: Bell,
        role: ["employee"]
      },
    ]
  }

  const filteredNavMain = data.navMain.filter(item => item.role.includes(role || ""));
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
          {filteredNavMain.map(({ title, url, icon: Icon }) => (
            <NavLink
              key={url}
              to={url}
              end={url === "/dashboard"}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-2 rounded-md ${
                  isActive ? "font-bold text-customTheme-secondary" : "hover:text-customTheme-secondary"
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
