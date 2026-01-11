const menuModel = require("../models/menuModel");

/**
 * @swagger
 * /api/auth/menu:
 *   post:
 *     summary: Create menu
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [menuName]
 *             properties:
 *               menuName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Menu Created successfully
 *       401:
 *         description: Unauthorized
 */

exports.menu = async (req, res) => {
  try {
    // 🔐 Safety check
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    const { menuName } = req.body;

    if (!menuName) {
      return res.status(400).json({ error: "menuName is required" });
    }

    const menu = await menuModel.menu({
      menuName,
      userId: req.user.id
    });

    res.status(201).json({
      message: "Menu Created successfully",
      menu
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * @swagger
 * /api/auth/menus:
 *   get:
 *     summary: Get all menus
 *     tags: [Menu]
 *     responses:
 *       200:
 *         description: Menus fetched successfully
 */

exports.getAllMenus = async (req, res) => {
  try {
    const menus = await menuModel.getAllMenus();
    res.status(200).json(menus); // only data
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
