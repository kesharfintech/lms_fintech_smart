const prisma = require("../lib/prismaClient");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async ({ name, email, password }) => {

  console.log("PRISMA:", prisma);
console.log("PRISMA.USER:", prisma.user);

  const exists = await prisma.user.findUnique({
    where: { email }
  });

  if (exists) throw new Error("Email already exists");

  const hashed = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: { name, email, password: hashed }
  });
};


exports.login = async ({ email, password }) => {
  const emailLower = email.trim().toLowerCase();
  const passwordTrim = password.trim();
  const user = await prisma.user.findUnique({
    where: { email: emailLower }
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const match = await bcrypt.compare(passwordTrim, user.password);
  if (!match) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { token };
};


exports.getAllUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true
    },
    orderBy: {
      id: "desc"
    }
  });
};

