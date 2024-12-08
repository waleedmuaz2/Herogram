const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { maxFileSize } = require("../config/fileConfig");
const { fileFilter } = require("../validators/fileValidators");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        try {
            const userId = `user_${req.user.id}`; // Ensure `req.user` exists, e.g., via middleware
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');

            const fileType = file.mimetype.startsWith('image/') ? 'images' : 'videos';
            const dir = path.join('uploads', fileType, year.toString(), month.toString(), day.toString(), userId);

            // Create the directory if it doesn't exist
            fs.mkdirSync(dir, { recursive: true });

            cb(null, dir);
        } catch (error) {
            cb(error, null);
        }
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});


const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: maxFileSize }, // Limit file size to 10 MB
});

module.exports = { upload };
