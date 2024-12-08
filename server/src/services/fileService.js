const prisma = require('../config/prismaConnaction');
const { user } = require('../helpers/jwtHelper');
const { createTagRepository, findTagByNameRepository } = require('../repositories/tagRepository');
const { getUserByIdRepository } = require('../repositories/userRepository');
const saveFileTags = async (req, res) => {
    try {
        const userId = user(req).id;
        const file = req.files.file?.[0];
        const tagsInput = req.body.tags;
        let options = {};
        if (tagsInput) {
            const tags = tagsInput.split(',').map(tag => tag.trim());
            const tagConnections = await Promise.all(tags.map(async (tagName) => {
                let tag = await findTagByNameRepository(tagName);
                if (!tag) {
                    tag = await createTagRepository(tagName);
                }
                return { id: tag.id };
            }));
            options = {
                tags: {
                    connect: tagConnections
                }
            }
        }


        await prisma.file.create({
            data: {
                path: file.destination,
                mimeType: file.mimetype,
                size: file.size,
                userId: Number(userId),
                filename: file.filename,
                ...options
            }
        });
        return { message: "File and tags saved successfully." };
    } catch (error) {
        console.error('Error:', error.message);
        if (!res.headersSent) {
            return res.status(500).json({ error: 'An error occurred while saving file and tags: ' + error.message });
        }
    }
};

const getFiles = async (req, res, userId = null) => {
    try {
        let totalFiles = 0;
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const files = await prisma.file.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize, 
            where: userId ? { userId: userId } : {},
            include: {
                tags: true,
                user: true
            },
            orderBy: {
                id: 'desc'
            }
        });

        if(userId) {
            totalFiles = await prisma.file.count({ where: { userId: userId } }); // Get total number of files for pagination info
        } else {
            totalFiles = await prisma.file.count(); // Get total number of files for pagination info
        }

        return {
            data: files,
            totalFiles,
            totalPages: Math.ceil(totalFiles / pageSize),
            currentPage: page,

        };
    } catch (error) {
        throw new Error('An error occurred while retrieving user files.');
    }
};

const getUserFiles = async (req, res) => {
    try {
        const userId = req.user.id; 
        const files = await getFiles(req, res, userId);
        return files;
    } catch (error) {
        throw new Error('An error occurred while retrieving user files.');
    }
};

const getFileById = async (fileId) => {
    try {
        const file = await prisma.file.findFirst({
            where: { uuid: fileId },
            include: {
                tags: true,
                user: true
            }
        });
        if (file) {
            return { success: true, file: file };
        } else {
            throw new Error('File not found.');
        }
    } catch (error) {
        console.error(`Error retrieving file by id ${fileId}:`, error.message);
        throw new Error('An error occurred while retrieving file by id.');
    }
};

const updateViewCount = async (fileId) => {
    await prisma.file.update({
        where: { id: fileId },
        data: { views: { increment: 1 } }
    });
    return { message: "View count updated successfully." };
};

module.exports = { saveFileTags, getFiles, getFileById, getUserFiles, updateViewCount }; 