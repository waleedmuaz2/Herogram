const mime = require("mime-types");

// Allowed MIME types for images and videos
const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "video/mp4",
];

// Max file size in bytes (e.g., 10 MB)
const maxFileSize = process.env.MAX_FILE_SIZE * 1024 * 1024;

module.exports = { allowedMimeTypes, maxFileSize };