exports.receiveOCRData = async (req, res) => {
    try {
        const ocrData = req.body;

        if (!ocrData || Object.keys(ocrData).length === 0) {
            return res.status(400).json({ message: 'No OCR data provided' });
        }

        console.log('--- Received OCR Data ---');
        console.log(JSON.stringify(ocrData, null, 2));
        console.log('-------------------------');

        res.status(200).json({
            message: 'OCR data received successfully',
            receivedData: ocrData
        });
    } catch (error) {
        console.error('Error processing OCR data:', error);
        res.status(500).json({ message: 'Server error processing OCR data', error: error.message });
    }
};
