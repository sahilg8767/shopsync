async function testOCR() {
    try {
        const ocrData = {
            text: "Sample OCR Text",
            confidence: 0.98,
            timestamp: new Date().toISOString()
        };

        console.log('Sending OCR data:', ocrData);

        const response = await fetch('http://localhost:5000/api/ocr', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ocrData)
        });

        const data = await response.json();

        console.log('Response Status:', response.status);
        console.log('Response Data:', data);

        if (response.status === 200 && data.receivedData.text === ocrData.text) {
            console.log('SUCCESS: OCR endpoint verified.');
        } else {
            console.log('FAILURE: OCR endpoint response mismatch.');
        }
    } catch (error) {
        console.error('Error testing OCR endpoint:', error.message);
    }
}

testOCR();
