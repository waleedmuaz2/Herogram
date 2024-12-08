const express = require('express');
const { addTagsToFile, listUserFiles, getFiles, updateViewCount, getFileById } = require('../controllers/fileController');
const router = express.Router();
const { fileMiddleware } = require('../middlewares/fileMiddleware');
const path = require('path');
const authenticateToken = require('../middlewares/authMiddleware');
// Routes

// Upload files
router.post("/upload", fileMiddleware, addTagsToFile);

// List files
router.post('/list', getFiles);

// Get files
router.post('/my-files', listUserFiles);

// Update view count
router.post('/update-view-count', updateViewCount);

// Get file by id
router.get('/file/:id',  getFileById);

module.exports = router;