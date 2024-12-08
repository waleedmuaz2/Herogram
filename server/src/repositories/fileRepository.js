const { saveFileTags, getFiles, getUserFiles, updateViewCount, getFileById } = require('../services/fileService');
const { sendJsonResponse } = require('../helpers/jsonResponse');
const { getUserByIdRepository } = require('./userRepository');

const saveFileTagsRepository = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return { message: "No files uploaded!" };
        }
        const user = await getUserByIdRepository(req.user.id);
        if(!user){
            return {message : "User not found"};
        }
        const result = await saveFileTags(req, res);
        return {message : result.message};
    } catch (error) {
        sendJsonResponse(res, 500, {
            message: 'Unexpected error occurred.',
            error: error
        });
    }
};

const getFilesRepository = async (req, res) => {
    const files = await getFiles(req, res);
    return files;
}
const getUserFilesRepository = async (req, res) => {
    const files = await getUserFiles(req, res);
    return files;
}

const updateViewCountRepository = async (req, res) => {
    const fileId = req.body.postId;
    const result = await updateViewCount(fileId);
    return result;
}   

const getFileByIdRepository = async (req, res) => {
    const fileId = req.params.id;
    const file = await getFileById(fileId);
    return file;
}
    
module.exports = {
    saveFileTagsRepository,
    getFilesRepository,
    getUserFilesRepository,
    updateViewCountRepository,
    getFileByIdRepository
};