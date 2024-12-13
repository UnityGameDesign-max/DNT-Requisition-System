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


export function formatDate(dateString:string) {

  const date = new Date(dateString);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();


  return `${day} ${month} ${year}`;
}