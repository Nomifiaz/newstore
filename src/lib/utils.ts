import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(path: string) {
  if (!path) return "https://images.unsplash.com/photo-1594932224828-b4b059b6fe68?auto=format&fit=crop&q=80&w=800";
  if (path.startsWith("http")) return path;
  // Use absolute URL to ensure it works across different routes
  return `${window.location.origin}${path}`;
}
