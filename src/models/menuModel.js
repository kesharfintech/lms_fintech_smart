const prisma = require("../lib/prismaClient");

exports.menu = async ({ menuName, userId }) => {
  const exists = await prisma.menu.findUnique({
    where: { menuName }
  });

  if (exists) throw new Error("Menu already exists");

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { createdBy: true }
  });

  if (!user) throw new Error("User not found");

  return prisma.menu.create({
    data: {
      menuName,
      userId,
      createdBy: user.createdBy || "SYSTEM"
    }
  });
};

