import toast from 'react-hot-toast';
import { API_URL } from "@/lib/utils";

// Function to handle user login
export async function login(email: string, password: string) {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const errorData = await response.json();
            toast.error(errorData.error);
        }
        return await response.json();

    } catch (error) {
        const errorData = await (error as Response).json();
        toast.error(errorData.error);
    }
}

// Function to handle user registration
export async function register(email: string, password: string, userName: string) {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, userName })
        });

        if (!response.ok) {
            const errorData = await response.json();
            toast.error(errorData.error);

        }

        return await response.json();
    } catch (error) {
        const errorData = await (error as Response).json();
        toast.error(errorData.error);
    }
}