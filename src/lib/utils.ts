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
