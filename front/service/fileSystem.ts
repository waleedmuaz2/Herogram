import { API_URL, getAuthToken, invalidToken } from "@/lib/utils";

export async function uploadFile(file: File, tags: string[] = []): Promise<Response> {
    const formData = new FormData();
    formData.append('file', file);
    if (tags.length > 0) {
        formData.append('tags', tags.join(','));
    }
    const token = getAuthToken();
    try {
        const response = await fetch(`${API_URL}/files/upload`, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 403) {
            invalidToken();
        }
        if (!response.ok) {
            // Throw an error if the response is not successful
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        return response;
    } catch (error) {
        console.error('File upload failed:', error);
        throw error; // Rethrow the error for the caller to handle
    }
}

export async function getFiles(page: number = 1): Promise<Response> {
    const token = getAuthToken();
    try {
        const response = await fetch(`${API_URL}/files/list${page > 1 ? `?page=${page}` : ''}`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.status === 403) {
            invalidToken();
        }
        return response;
    } catch (error) {
        console.error('File fetch failed:', error);

        throw error;
    }
}

export async function getMyFiles(page: number = 1): Promise<Response> {
    const token = getAuthToken();
    try {
        const response = await fetch(`${API_URL}/files/my-files${page > 1 ? `?page=${page}` : ''}`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.status === 403) {
            invalidToken();
        }
        return response;
    } catch (error) {
        console.error('File fetch failed:', error);
        throw error;
    }
}
export const updateViewCountInDatabase = (postId: string) => {
    const token = getAuthToken();
    return fetch(`${API_URL}/files/update-view-count`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ postId }),
    });
}

export async function getFile(id: string): Promise<Response> {
    try {
        const response = await fetch(`${API_URL}/files/file/${id}`);
        return response;
    } catch (error) {
        console.error('File fetch failed:', error);
        throw error;
    }

}
