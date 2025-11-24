const readline = require('readline');

// Native fetch is available in Node 18+
// Native fetch is available in Node 18+
// const BASE_URL = 'http://localhost:5000/api/auth';
const BASE_URL = 'https://shopsync-nu.vercel.app/api/auth';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const askQuestion = (query) => new Promise((resolve) => rl.question(query, resolve));

let authToken = null;
let userEmail = null;

async function main() {
    console.log('\n--- ShopSync CLI Auth ---');

    while (true) {
        console.log('\n-------------------------');
        if (!authToken) {
            console.log('1. Register');
            console.log('2. Login');
            console.log('3. Exit');
        } else {
            console.log(`Logged in as: ${userEmail}`);
            console.log('1. Logout');
            console.log('2. Exit');
        }

        const choice = await askQuestion('Choose an option: ');

        if (!authToken) {
            if (choice === '1') await handleRegister();
            else if (choice === '2') await handleLogin();
            else if (choice === '3') break;
            else console.log('Invalid choice');
        } else {
            if (choice === '1') await handleLogout();
            else if (choice === '2') break;
            else console.log('Invalid choice');
        }
    }

    rl.close();
}

async function handleRegister() {
    const email = await askQuestion('Enter Email: ');
    const password = await askQuestion('Enter Password: ');

    try {
        const res = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();

        if (res.ok) {
            console.log('\n✅ Registration Successful!');
            authToken = data.token;
            userEmail = email;
        } else {
            console.log(`\n❌ Registration Failed: ${data.message}`);
        }
    } catch (err) {
        console.log('Error:', err.message);
    }
}

async function handleLogin() {
    const email = await askQuestion('Enter Email: ');
    const password = await askQuestion('Enter Password: ');

    try {
        const res = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();

        if (res.ok) {
            console.log('\n✅ Login Successful!');
            authToken = data.token;
            userEmail = email;
        } else {
            console.log(`\n❌ Login Failed: ${data.message}`);
        }
    } catch (err) {
        console.log('Error:', err.message);
    }
}

async function handleLogout() {
    try {
        const res = await fetch(`${BASE_URL}/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
        });
        const data = await res.json();

        if (res.ok) {
            console.log(`\n👋 ${data.message}`);
            authToken = null;
            userEmail = null;
        } else {
            console.log(`\n❌ Logout Failed: ${data.message}`);
            // Force logout locally if token is invalid
            if (res.status === 401) {
                authToken = null;
                userEmail = null;
            }
        }
    } catch (err) {
        console.log('Error:', err.message);
    }
}

main();
