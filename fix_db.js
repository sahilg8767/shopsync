const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const fixIndexes = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const collection = mongoose.connection.collection('users');

        // List indexes
        const indexes = await collection.indexes();
        console.log('Current Indexes:', indexes);

        // Drop phoneNumber index if it exists
        try {
            await collection.dropIndex('phoneNumber_1');
            console.log('✅ Dropped index: phoneNumber_1');
        } catch (err) {
            console.log('ℹ️ Index phoneNumber_1 not found or already dropped.');
        }

        console.log('Done.');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

fixIndexes();
