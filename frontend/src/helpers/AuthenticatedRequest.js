export const makeAuthenticatedRequest = async (url, method, body = null) => {
    const token = localStorage.getItem('authToken');
    
    const urlWithTimestamp = url.includes('?') 
        ? `${url}&_t=${Date.now()}` 
        : `${url}?_t=${Date.now()}`;
    
    const options = {
        method: method,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate', 
            'Pragma': 'no-cache',
            'Expires': '0', 
            ...(token && {'Authorization': `Bearer ${token}`})
        }
    };

    if (body) {
        options.body = JSON.stringify(body);
    }
    
    try {
        const response = await fetch(urlWithTimestamp, options);
        
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