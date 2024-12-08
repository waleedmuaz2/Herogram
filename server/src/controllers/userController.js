const { getAllUsersRepository } = require("../repositories/userRepository");
const { sendJsonResponse } = require("../helpers/jsonResponse");

const getUser = async (req, res) => {
    try {
        const users = await getAllUsersRepository();
        sendJsonResponse(res, 201, {
            users,
            message: "Users fetched successfully"
        });
    } catch (err) {
        sendJsonResponse(res, 400, { error: err.message });
    }
};

module.exports = { getUser };
