// Native fetch in Node 18+

async function test() {
    console.log('Testing connection to http://localhost:5000/ ...');
    try {
        const res = await fetch('http://localhost:5000/');
        console.log('Root status:', res.status);
        const text = await res.text();
        console.log('Root body:', text);
    } catch (err) {
        console.error('Root fetch failed:', err);
        if (err.cause) console.error('Cause:', err.cause);
    }

    console.log('\nTesting connection to http://localhost:5000/api/auth/register ...');
    try {
        const res = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'test_conn@example.com', password: 'password' })
        });
        console.log('Register status:', res.status);
        const json = await res.json();
        console.log('Register body:', json);
    } catch (err) {
        console.error('Register fetch failed:', err);
        if (err.cause) console.error('Cause:', err.cause);
    }
}

test();
