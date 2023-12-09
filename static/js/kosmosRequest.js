export async function kosmos_get(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('GET request failed:', error);
        throw error;
    }
}

export async function kosmos_post(url, formData) {
    const headers = {
        'Accept': 'Application/json'
    }
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: formData
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('POST request failed:', error);
        throw error;
    }
}