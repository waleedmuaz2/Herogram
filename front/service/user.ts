import { API_URL, getAuthToken, invalidToken } from "@/lib/utils";

export async function getUser() {
    try {
        const token = getAuthToken();
        const response = await fetch(`${API_URL}/users`, {
        headers: { 'Authorization': `Bearer ${token}` }
        });
        if(response.status === 403) {
            invalidToken();
        }
        return response;
    } catch (error) {
        console.error('User fetch failed:', error);
        throw error;
    }
}       