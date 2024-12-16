import { Bell, ClipboardPlus, LayoutDashboard, SquarePen } from "lucide-react";

export const data = {

    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
        role: ["Admin", "employee", "Human Resources", "Finance Manager"]
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
        role: ["Admin", "Human Resources", "Finance Manager"]
      },
      {
        title: "Approvals",
        url: "/dashboard/approvals",
        icon: Bell,
        role: ["employee"]
      },
    ]
  }