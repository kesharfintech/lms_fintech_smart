const authModel = require("../models/authModel");

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 */
exports.register = async (req, res) => {
  try {
    const user = await authModel.register(req.body);
    res.status(201).json({
      message: "User registered successfully",
      user
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login success
 */
exports.login = async (req, res) => {
  try {
    const result = await authModel.login(req.body);
    res.json({
      message: "Login successful",
      token: result.token
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
