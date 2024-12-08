const { upload } = require('../helpers/fileManager');
const multer = require('multer');

const fileMiddleware = (req, res, next) => {
    upload.fields([{ name: "file", maxCount: 1 }])(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // Handle Multer-specific errors
            return res.status(400).json({ error: err.message });
        } else if (err) {
            // Handle other errors
            return res.status(400).json({ error: err.message });
        }
        next(); // Proceed to the next middleware if no errors
    });
}

module.exports = { fileMiddleware };
