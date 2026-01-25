export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5005';

export const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
    const url = endpoint.startsWith('http') ? endpoint : `${API_URL}${endpoint}`;

    // Ensure credentials are included for cross-site cookies
    const defaultOptions: RequestInit = {
        ...options,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    };

    try {
        const response = await fetch(url, defaultOptions);
        return response;
    } catch (error) {
        console.error(`Failed to fetch ${url}:`, error);
        throw new Error(`Network error: Unable to reach ${API_URL}. Please check if the backend is running.`);
    }
};
