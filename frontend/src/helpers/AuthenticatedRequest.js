export const makeAuthenticatedRequest = async (url, method, body = null) => {
    const token = localStorage.getItem('authToken');
    
    const options = {
        method: method,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            ...(token && {'Authorization': `Bearer ${token}`})
        }
    };

    if (body) {
        options.body = JSON.stringify(body);
    }
    
    const response = await fetch(url, options);
    return await response.json();
};