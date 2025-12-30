const express = require("express");
const app = express();

const { swaggerUi, swaggerSpec } = require("./config/swagger");

app.use(express.json());

app.use("/api/auth", require("./routes/routes"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
