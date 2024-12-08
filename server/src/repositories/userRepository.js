const { createUser, getUserByEmail , getUserById, getAllUsers    } = require("../services/userService");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/jwtHelper");

const registerUser = async (email, password, userName) => {
    try {
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            throw new Error("Email already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await createUser(email, hashedPassword, userName);
        return generateToken(user.id);
    } catch (error) {
        throw error;
    }
};

const loginUser = async (email, password) => {
    try {
        const user = await getUserByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }
        return generateToken(user.id);
    } catch (error) {
        throw error;
    }
};

const getUserByIdRepository = async (id) => {
    try {
        return await getUserById(id);
    } catch (error) {
        throw error;
    }
};

const getAllUsersRepository = async () => {
    try {
        return await getAllUsers();
    } catch (error) {
        throw error;
    }
};

module.exports = { registerUser, loginUser, getUserByIdRepository, getAllUsersRepository };