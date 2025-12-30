const prisma = require("../lib/prismaClient");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async ({ name, email, password }) => {
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) throw new Error("Email already exists");

  const hashed = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: { name, email, password: hashed }
  });
};

exports.login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { token };
};
