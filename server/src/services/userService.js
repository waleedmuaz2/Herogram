const prisma = require('../config/prismaConnaction');

const createUser = async (email, password, userName) => {
  try {
    return await prisma.user.create({ data: { email, password, userName } });
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    return await prisma.user.findUnique({ where: { email } });
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    return await prisma.user.findUnique({ where: { id } });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

const getAllUsers = async () => {
  try {
    return await prisma.user.findMany({
      orderBy: {
        id: 'desc'
      },
      take: 10
    });
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};

module.exports = { createUser, getUserByEmail, getUserById, getAllUsers }; 