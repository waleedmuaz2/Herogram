const { sendJsonResponse } = require('../helpers/jsonResponse');
const { saveFileTagsRepository, getFilesRepository, getUserFilesRepository, updateViewCountRepository, getFileByIdRepository } = require('../repositories/fileRepository');

const addTagsToFile = async (req, res) => {
    try {
        const result = await saveFileTagsRepository(req, res);
        sendJsonResponse(res, 200, { message: result.message });
    } catch (error) {
        sendJsonResponse(res, 500, { error: error.message });
    }
};

const listUserFiles = async (req, res) => {
    try {
        const files = await getUserFilesRepository(req, res);
        sendJsonResponse(res, 200, { files });
    } catch (error) {
        sendJsonResponse(res, 500, { error: error.message });
    }
};

const getFiles = async (req, res) => {
    const files = await getFilesRepository(req, res);
    sendJsonResponse(res, 200, { files });
};

const updateViewCount = async (req, res) => {
    const result = await updateViewCountRepository(req, res);
    sendJsonResponse(res, 200, { message: result.message });
};

const getFileById = async (req, res) => {
    const result = await getFileByIdRepository(req, res);
    sendJsonResponse(res, 200, { file: result.file });
};

module.exports = { addTagsToFile, listUserFiles, getFiles, updateViewCount, getFileById }; 