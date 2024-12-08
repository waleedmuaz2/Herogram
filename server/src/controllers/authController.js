const { registerUser, loginUser } = require("../repositories/userRepository");
const { sendJsonResponse } = require("../helpers/jsonResponse");

const register = async (req, res) => {
    const { email, password, userName } = req.body;
    try {
        const token = await registerUser(email, password, userName);
        sendJsonResponse(res, 201, {
            token,
            message: "User registered successfully"
        });
    } catch (err) {
        sendJsonResponse(res, 400, { error: err.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await loginUser(email, password);
        sendJsonResponse(res, 200, {
            token,
            message: "User logged in successfully"
        });
    } catch (err) {
        sendJsonResponse(res, 500, { error: err.message });
    }
};

module.exports = { register, login };
