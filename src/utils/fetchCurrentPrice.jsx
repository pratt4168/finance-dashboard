// src/utils/fetchCurrentPrice.jsx
let cache = {};

function fetchWithTimeout(url, options, timeout = 7000) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error('Request timed out'));
        }, timeout);
        fetch(url, options).then(response => {
            clearTimeout(timer);
            resolve(response);
        }).catch(err => {
            clearTimeout(timer);
            reject(err);
        });
    });
}

export async function fetchCurrentPrice(symbol) {
    try {
        // Check if the data is in the cache
        if (cache[symbol]) {
            console.log('Returning cached data');
            return cache[symbol];
        }

        const apiKey = 'NJQ0X98BL9DZQH9F';
        const response = await fetchWithTimeout(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`, {}, 10000); // 10 seconds timeout

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);

        if (!data['Global Quote'] || !data['Global Quote']['05. price']) {
            throw new Error('Price data not found in the response');
        }

        const price = parseFloat(data['Global Quote']['05. price']);
        
        // Store the fetched data in the cache
        cache[symbol] = price;

        // Set cache expiration time (e.g., 5 minutes)
        setTimeout(() => {
            delete cache[symbol];
        }, 300000); // 300000 ms = 5 minutes

        return price;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}