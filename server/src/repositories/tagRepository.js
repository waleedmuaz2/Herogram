const { createTag, findTagByName } = require("../services/tagService");

const createTagRepository = async (name) => {
    try {
        return await createTag(name);
    } catch (error) {
        throw error;
    }
};

const findTagByNameRepository = async (name) => {
    try {
        return await findTagByName(name);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createTagRepository,
    findTagByNameRepository
}


