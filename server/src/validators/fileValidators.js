const { allowedMimeTypes, maxFileSize } = require("../config/fileConfig");


const fileFilter = (req, file, cb) => {
  if (!file || !file.originalname) {
      return cb(new Error("No file uploaded."), false);
  }

  // Validate MIME type
  if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(new Error("Invalid file type. Only images and videos are allowed."), false);
  }

  // Validate file size
  if (file.size > maxFileSize) {
      return cb(new Error(`File size exceeds the maximum limit of ${maxFileSize / (1024 * 1024)} MB.`), false);
  }

  cb(null, true); // File is valid
};


module.exports = { fileFilter };
