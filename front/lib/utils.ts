import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const getAuthToken = () => {
    return localStorage.getItem('authToken');
}

export const IMG_URL = process.env.NEXT_PUBLIC_IMG_URL || 'http://localhost:3000/';

export const invalidToken = () => {
    localStorage.removeItem('authToken');
}
