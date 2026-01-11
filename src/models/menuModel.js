const prisma = require("../lib/prismaClient");

exports.menu = async ({ menuName, userId }) => {
  const exists = await prisma.menu.findUnique({
    where: { menuName }
  });

  if (exists) throw new Error("Menu already exists");

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { name: true }
  });

  if (!user) throw new Error("User not found");

  return prisma.menu.create({
    data: {
      menuName,
      userId,
      createdBy: user.name
    }
  });
};

exports.getAllMenus = async () => {
  return prisma.menu.findMany({
    select: {
      id: true,
      menuName: true,
      userId: true,
      createdBy: true,
      createdAt: true
    },
    orderBy: {
      id: "desc"
    }
  });
};


