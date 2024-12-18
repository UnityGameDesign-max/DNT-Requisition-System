import { ClipboardPlus, LayoutDashboard, SquarePen } from "lucide-react";

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
    ]
  }

export const formTypes = {
  EmployeeRequisition: "Employee Requisition",
  SalaryAdjustmentRequisition: "Salary Adjustment Requisition",
  ExpenseRequestRequisition: "Expense Request Requisition"
}

export const status ={
  Pending: "Pending",
  Approved: "Approved",
  Rejected: "Rejected"
}

export const employmentType = ["Permanent", "Temporary"];

export const salaryAdjustmentReason = ["Promotion", "Performance", "Retention", "Normal Annual Adjustment"]