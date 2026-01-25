export const API_URL =
    process.env.NEXT_PUBLIC_API_URL?.trim() || "http://localhost:5005";

/**
 * Makes an authenticated fetch request.
 * - Supports absolute URLs and relative endpoints
 * - Includes cookies for cross-site auth (Render + Vercel)
 * - Returns the raw Response (caller can handle JSON/text)
 */
export const fetchWithAuth = async (
    endpoint: string,
    options: RequestInit = {}
): Promise<Response> => {
    const url = endpoint.startsWith("http") ? endpoint : `${API_URL}${endpoint}`;

    const headers = new Headers(options.headers || {});

    // ✅ Only set JSON header if caller didn't set it
    if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }

    const finalOptions: RequestInit = {
        ...options,
        headers,
        credentials: "include", // ✅ REQUIRED for cookies
    };

    try {
        const res = await fetch(url, finalOptions);
        return res;
    } catch (err) {
        console.error(`❌ Fetch failed: ${url}`, err);
        throw new Error(
            `Network error: Unable to reach backend (${API_URL}). Check if backend is running / URL is correct.`
        );
    }
};

/**
 * Helper: fetch + auto-parse JSON response
 * Throws useful error messages for toast.
 */
export const fetchJSON = async <T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> => {
    const res = await fetchWithAuth(endpoint, options);

    const contentType = res.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data?.error || data?.message || "Request failed");
        }

        return data as T;
    }

    // non-json response
    const text = await res.text();
    if (!res.ok) {
        console.error("Server returned non-JSON error:", text);
        throw new Error("Server error occurred. Please try again.");
    }

    // If it was ok but not JSON, still fail safely
    throw new Error("Unexpected server response.");
};
