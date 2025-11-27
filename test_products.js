const http = require('http');
const app = require('./server');

const PORT = 5001; // Use a different port for testing
let server;

const startServer = () => {
    return new Promise((resolve) => {
        server = app.listen(PORT, () => {
            console.log(`Test server running on port ${PORT}`);
            resolve();
        });
    });
};

const stopServer = () => {
    return new Promise((resolve) => {
        server.close(() => {
            console.log('Test server stopped');
            resolve();
        });
    });
};

const makeRequest = (path) => {
    return new Promise((resolve, reject) => {
        http.get(`http://localhost:${PORT}${path}`, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    resolve({ status: res.statusCode, body: JSON.parse(data) });
                } catch (e) {
                    resolve({ status: res.statusCode, body: data });
                }
            });
        }).on('error', reject);
    });
};

const runTests = async () => {
    try {
        await startServer();

        console.log('\n--- Testing GET /api/products ---');
        const allProducts = await makeRequest('/api/products');
        console.log('Status:', allProducts.status);
        console.log('Count:', allProducts.body.length);
        if (allProducts.status === 200 && allProducts.body.length > 0) {
            console.log('PASS');
        } else {
            console.log('FAIL');
        }

        console.log('\n--- Testing GET /api/products/category/Skincare ---');
        const skincare = await makeRequest('/api/products/category/Skincare');
        console.log('Status:', skincare.status);
        console.log('Count:', skincare.body.length);
        const allSkincare = skincare.body.every(p => p.category === 'Skincare');
        console.log('All are Skincare:', allSkincare);
        if (skincare.status === 200 && skincare.body.length > 0 && allSkincare) {
            console.log('PASS');
        } else {
            console.log('FAIL');
        }

        console.log('\n--- Testing GET /api/products/category/Invalid ---');
        const invalidCat = await makeRequest('/api/products/category/Invalid');
        console.log('Status:', invalidCat.status);
        if (invalidCat.status === 404) {
            console.log('PASS');
        } else {
            console.log('FAIL');
        }

        console.log('\n--- Testing GET /api/products/s1 ---');
        const product = await makeRequest('/api/products/s1');
        console.log('Status:', product.status);
        console.log('Product:', product.body.name);
        if (product.status === 200 && product.body.id === 's1') {
            console.log('PASS');
        } else {
            console.log('FAIL');
        }

    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        await stopServer();
        // Force exit because mongoose connection might keep it open
        process.exit(0);
    }
};

runTests();
