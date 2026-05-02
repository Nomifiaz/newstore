import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(path: string) {
  if (!path) return "https://images.unsplash.com/photo-1594932224828-b4b059b6fe68?auto=format&fit=crop&q=80&w=800";
  if (path.startsWith("http")) return path;
  
  // Use the exposed APP_URL or fall back to window.location.origin
  const baseUrl = process.env.VITE_APP_URL || window.location.origin;
  const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${cleanBase}${cleanPath}`;
}
