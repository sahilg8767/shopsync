// Native fetch is available in Node 18+


const BASE_URL = 'http://localhost:5000/api/auth';
const PHONE = '1234567890';

async function testAuth() {
    try {
        console.log('1. Sending OTP...');
        const sendRes = await fetch(`${BASE_URL}/send-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phoneNumber: PHONE }),
        });
        const sendData = await sendRes.json();
        console.log('Send OTP Response:', sendData);

        if (sendRes.status !== 200) throw new Error('Failed to send OTP');

        console.log('\nNOTE: Please check server logs for OTP and update the verify step manually if running interactively.');
        // For automation, we might need to parse the server logs, but here we just check connectivity.

    } catch (error) {
        console.error('Test Failed:', error.message);
    }
}

testAuth();
