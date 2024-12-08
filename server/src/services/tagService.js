const prisma = require('../config/prismaConnaction');


const createTag = async (name) => {
    return await prisma.tag.create({ data: { name } });
}
const findTagByName = async (name) => {
    return await prisma.tag.findUnique({ where: { name } });
}

module.exports = {
    createTag,
    findTagByName
}
