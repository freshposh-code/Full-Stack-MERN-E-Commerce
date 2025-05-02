/**
 * Makes an authenticated request that works across all browsers, including Safari
 * @param {string} url - The API endpoint URL
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE, etc.)
 * @param {object|null} body - Request body (optional)
 * @returns {Promise<object>} - JSON response
 */
export const makeAuthenticatedRequest = async (url, method, body = null) => {
    // Get token from multiple sources for better Safari compatibility
    const tokenFromLocalStorage = localStorage.getItem('authToken');
    const tokenFromCookies = getTokenFromCookies();
    
    // Prefer cookie token if available (works better in most browsers)
    // But fall back to localStorage token (for Safari)
    const token = tokenFromCookies || tokenFromLocalStorage;
    
    // If we have a token from localStorage but not cookies, try to set it in cookies
    if (tokenFromLocalStorage && !tokenFromCookies) {
        setTokenInCookies(tokenFromLocalStorage);
    }
    
    // Add timestamp to prevent caching
    const urlWithTimestamp = url.includes('?') 
        ? `${url}&_t=${Date.now()}` 
        : `${url}?_t=${Date.now()}`;
    
    // Add token to URL for GET requests (helps with Safari)
    const finalUrl = (method === 'GET' && token) 
        ? `${urlWithTimestamp}&token=${token}` 
        : urlWithTimestamp;
    
    const options = {
        method: method,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate', 
            'Pragma': 'no-cache',
            'Expires': '0',
        }
    };

    // Add token to headers in multiple ways for maximum compatibility
    if (token) {
        options.headers['Authorization'] = `Bearer ${token}`;
        options.headers['x-auth-token'] = token; // Custom header for middleware
    }

    if (body) {
        options.body = JSON.stringify(body);
    }
    
    try {
        const response = await fetch(finalUrl, options);
        
        // Handle token refresh in response headers if server sends a new token
        const newToken = response.headers.get('x-auth-token');
        if (newToken) {
            localStorage.setItem('authToken', newToken);
            setTokenInCookies(newToken);
        }
        
        // Check for unauthorized or forbidden status which often means token issues
        if (response.status === 401 || response.status === 403) {
            console.warn('Authentication error:', response.status);
            
            // Try to refresh the page once if it seems to be a token issue
            // This helps with Safari's cookie issues on the first load
            const hasAttemptedRefresh = sessionStorage.getItem('auth_refresh_attempted');
            if (!hasAttemptedRefresh && response.status === 401) {
                sessionStorage.setItem('auth_refresh_attempted', 'true');
                
                // Try resubmitting the same request once more before giving up
                const retryResponse = await fetch(finalUrl, options);
                if (retryResponse.ok) {
                    // If retry worked, clear the refresh attempt flag
                    sessionStorage.removeItem('auth_refresh_attempted');
                    return await retryResponse.json();
                } else {
                    // If retry still failed, handle normally
                    sessionStorage.removeItem('auth_refresh_attempted');
                }
            }
        }
        
        if (!response.ok) {
            console.error('API error:', response.status);
     
            // Try to parse error response but handle case where it's not JSON
            const errorData = await response.json().catch(() => ({
                success: false,
                message: `Server error: ${response.status}`
            }));
            
            return errorData;
        }
        
        return await response.json();
    } catch (error) {
        console.error('Request error:', error);
        return { success: false, error: true, message: error.message };
    }
};

/**
 * Helper to get token from cookies
 */
const getTokenFromCookies = () => {
    if (typeof document === 'undefined') return null;
    
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split('=');
        acc[key] = value;
        return acc;
    }, {});
    
    return cookies.token || null;
};

/**
 * Helper to set token in cookies with Safari-compatible settings
 */
const setTokenInCookies = (token) => {
    if (typeof document === 'undefined') return;
    
    // Use SameSite=Lax for better compatibility
    document.cookie = `token=${token}; path=/; SameSite=Lax`;
    
    // Also make cookie available in secure contexts
    if (window.location.protocol === 'https:') {
        document.cookie = `token=${token}; path=/; SameSite=Lax; Secure`;
    }
};