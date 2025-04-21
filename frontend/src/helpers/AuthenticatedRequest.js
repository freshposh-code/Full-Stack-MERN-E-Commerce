export const makeAuthenticatedRequest = async (url, method, body = null) => {
    const token = localStorage.getItem('authToken');
    
    const options = {
        method: method,
        credentials: 'include', // This ensures cookies are sent with the request
        headers: {
            'Content-Type': 'application/json',
        }
    };
    
    // Add Authorization header as fallback if token exists in localStorage
    if (token) {
        options.headers['Authorization'] = `Bearer ${token}`;
    }

    if (body) {
        options.body = JSON.stringify(body);
    }
    
    try {
        const response = await fetch(url, options);
        
        if (!response.ok) {
            console.error('API error:', response.status);
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