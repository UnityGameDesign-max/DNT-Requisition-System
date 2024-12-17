import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(name: string){
  if (!name) return "";

  const parts = name.split(" ").filter(Boolean);
  const initials = parts.map((part) => part[0].toUpperCase()).join("");

  return initials;
}


export function sortByKey<T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
  return array.slice().sort((a, b) => {
      const valueA = a[key];
      const valueB = b[key];

      if (valueA instanceof Date || valueB instanceof Date) {
          return order === 'asc'
              ? new Date(valueA as any).getTime() - new Date(valueB as any).getTime()
              : new Date(valueB as any).getTime() - new Date(valueA as any).getTime();
      }

      if (typeof valueA === 'string' && typeof valueB === 'string') {
          return order === 'asc'
              ? valueA.localeCompare(valueB)
              : valueB.localeCompare(valueA);
      }

      if (typeof valueA === 'number' && typeof valueB === 'number') {
          return order === 'asc' ? valueA - valueB : valueB - valueA;
      }

      return 0;
  });
}



export function formatDate( dateString:string ) {

  const date = new Date(dateString);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();


  return `${day} ${month} ${year}`;
}

export const approvalDetails = (requisition: any) => [
  { key: 'Requester Name:', value: requisition.requesterName },
  { key: 'Employment Type:', value: requisition.employmentType },
  { key: 'Resources Required:', value: requisition.resourcesRequired },
  { key: 'Proposed Start Date:', value: requisition.proposedStartDate ? formatDate(requisition.proposedStartDate) : '' },
  { key: 'Proposed End Date:', value: requisition.proposedEndDate ? formatDate(requisition.proposedEndDate) : '' },
  { key: 'Reason Request:', value: requisition.reasonRequest },
  { key: 'Salary Adjustment Reason:', value: requisition.salaryAdjustmentReason },
  { key: 'Current Salary:', value: requisition.currentSalary ? `R ${requisition.currentSalary}` : '' },
  { key: 'Recommended Salary:', value: requisition.recommendedSalary ? `R ${requisition.recommendedSalary}` : '' },
  { key: 'Budget Availability:', value: requisition.budgetAvailability },
  { key: 'Motivation:', value: requisition.motivation },
];