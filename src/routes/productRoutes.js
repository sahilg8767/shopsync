const express = require('express');
const router = express.Router();

// Hardcoded product data
const products = [
    // Skincare
    { id: 's1', category: 'Skincare', name: 'Hydrating Face Wash', price: 15.99, description: 'Gentle cleanser for daily use.' },
    { id: 's2', category: 'Skincare', name: 'Vitamin C Serum', price: 25.50, description: 'Brightens and evens skin tone.' },
    { id: 's3', category: 'Skincare', name: 'Moisturizing Cream', price: 18.00, description: 'Rich hydration for dry skin.' },
    { id: 's4', category: 'Skincare', name: 'Sunscreen SPF 50', price: 22.00, description: 'Broad spectrum protection.' },
    { id: 's5', category: 'Skincare', name: 'Exfoliating Scrub', price: 14.50, description: 'Removes dead skin cells.' },
    { id: 's6', category: 'Skincare', name: 'Night Repair Oil', price: 30.00, description: 'Rejuvenates skin while you sleep.' },
    { id: 's7', category: 'Skincare', name: 'Eye Cream', price: 20.00, description: 'Reduces puffiness and dark circles.' },
    { id: 's8', category: 'Skincare', name: 'Clay Mask', price: 16.50, description: 'Detoxifies and purifies pores.' },

    // Beverages
    { id: 'b1', category: 'Beverages', name: 'Organic Green Tea', price: 5.99, description: 'Refreshing and antioxidant-rich.' },
    { id: 'b2', category: 'Beverages', name: 'Cold Brew Coffee', price: 4.50, description: 'Smooth and bold flavor.' },
    { id: 'b3', category: 'Beverages', name: 'Sparkling Water', price: 2.00, description: 'Crisp and bubbly.' },
    { id: 'b4', category: 'Beverages', name: 'Almond Milk', price: 3.99, description: 'Dairy-free plant milk.' },
    { id: 'b5', category: 'Beverages', name: 'Fresh Orange Juice', price: 6.00, description: '100% natural squeezed juice.' },
    { id: 'b6', category: 'Beverages', name: 'Coconut Water', price: 3.50, description: 'Hydrating tropical drink.' },
    { id: 'b7', category: 'Beverages', name: 'Herbal Tea Blend', price: 5.50, description: 'Relaxing caffeine-free tea.' },
    { id: 'b8', category: 'Beverages', name: 'Energy Drink', price: 3.00, description: 'Boosts energy and focus.' },

    // Snacks
    { id: 'n1', category: 'Snacks', name: 'Potato Chips', price: 2.50, description: 'Classic salted crunch.' },
    { id: 'n2', category: 'Snacks', name: 'Mixed Nuts', price: 8.00, description: 'Healthy protein snack.' },
    { id: 'n3', category: 'Snacks', name: 'Chocolate Bar', price: 1.99, description: 'Rich milk chocolate.' },
    { id: 'n4', category: 'Snacks', name: 'Granola Bar', price: 1.50, description: 'Oats and honey energy bar.' },
    { id: 'n5', category: 'Snacks', name: 'Popcorn', price: 3.00, description: 'Buttery movie theater style.' },
    { id: 'n6', category: 'Snacks', name: 'Pretzels', price: 2.25, description: 'Twisted salty snacks.' },
    { id: 'n7', category: 'Snacks', name: 'Dried Fruit Mix', price: 5.00, description: 'Sweet and chewy treat.' },
    { id: 'n8', category: 'Snacks', name: 'Rice Cakes', price: 2.00, description: 'Light and crispy.' },

    // Oils
    { id: 'o1', category: 'Oils', name: 'Olive Oil', price: 12.99, description: 'Extra virgin cold pressed.' },
    { id: 'o2', category: 'Oils', name: 'Coconut Oil', price: 9.50, description: 'Organic unrefined oil.' },
    { id: 'o3', category: 'Oils', name: 'Avocado Oil', price: 14.00, description: 'High heat cooking oil.' },
    { id: 'o4', category: 'Oils', name: 'Sesame Oil', price: 8.99, description: 'Toasted aromatic oil.' },
    { id: 'o5', category: 'Oils', name: 'Sunflower Oil', price: 6.50, description: 'Light frying oil.' },
    { id: 'o6', category: 'Oils', name: 'Almond Oil', price: 11.00, description: 'Sweet almond oil for cooking or skin.' },
    { id: 'o7', category: 'Oils', name: 'Grapeseed Oil', price: 7.99, description: 'Neutral flavor oil.' },
    { id: 'o8', category: 'Oils', name: 'Canola Oil', price: 5.00, description: 'Versatile cooking oil.' }
];

// GET /api/products - Get all products
router.get('/', (req, res) => {
    res.json(products);
});

// GET /api/products/category/:category - Get products by category
router.get('/category/:category', (req, res) => {
    const category = req.params.category;
    // Case-insensitive matching
    const filteredProducts = products.filter(p => p.category.toLowerCase() === category.toLowerCase());

    if (filteredProducts.length === 0) {
        return res.status(404).json({ message: `No products found in category: ${category}` });
    }

    res.json(filteredProducts);
});

// GET /api/products/:id - Get single product by ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
});

module.exports = router;
