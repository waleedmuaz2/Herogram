const { hashPassword } = require('../src/helpers/jwtHelper');
const prisma = require('../src/config/prismaConnaction');

async function main() {
  // Create some users
  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      password: await hashPassword('hashedpassword1'),
      userName: 'user1',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'user2@example.com',
      password: await hashPassword('hashedpassword2'), 
      userName: 'user2',
    },
  });

  // Create some tags
  const tag1 = await prisma.tag.create({
    data: {
      name: 'Tag1',
    },
  });

  const tag2 = await prisma.tag.create({
    data: {
      name: 'Tag2',
    },
  });

  // Create some files with mimeType and size
  await prisma.file.create({
    data: {
      filename: 'file1.txt',
      path: '/path/to/file1.txt',
      mimeType: 'text/plain',
      size: 1024,
      userId: user1.id,
      tags: {
        connect: [{ id: tag1.id }, { id: tag2.id }],
      },
    },
  });

  await prisma.file.create({
    data: {
      filename: 'file2.txt',
      path: '/path/to/file2.txt',
      mimeType: 'text/plain',
      size: 2048,
      userId: user2.id,
      tags: {
        connect: [{ id: tag1.id }],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 