// Native fetch

const url = 'https://shopsync-nu.vercel.app/api/debug-db';

async function poll() {
    console.log('Polling', url, '...');
    for (let i = 0; i < 10; i++) {
        try {
            const res = await fetch(url);
            console.log(`Attempt ${i + 1}: Status ${res.status}`);
            if (res.status === 200 || res.status === 500) {
                const text = await res.text();
                try {
                    const json = JSON.parse(text);
                    console.log('JSON Response:', JSON.stringify(json, null, 2));
                    return;
                } catch (e) {
                    console.log('Response is not JSON:', text.substring(0, 100));
                }
            }
        } catch (err) {
            console.log('Fetch error:', err.message);
        }
        await new Promise(r => setTimeout(r, 5000));
    }
}

// Native fetch wrapper if node-fetch is missing
if (typeof fetch === 'undefined') {
    global.fetch = async (...args) => {
        const { fetch: nativeFetch } = await import('node-fetch').catch(() => ({ fetch: global.fetch }));
        return nativeFetch(...args);
    };
}

// Actually, just use native fetch since we are on Node 22
poll();
