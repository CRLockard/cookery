import express from "express";
import cors from "cors";
import "dotenv/config";
import { pool } from "./db.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Cookery API is running!" });
});

app.get("/api/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ status: "connected", time: result.rows[0].now });
  } catch (error) {
    console.error("Database connection failed:", error);
    res.status(500).json({ status: "error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/api/recipes", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM recipes");
    res.json(result.rows);
  } catch (error) {
    console.error("Failed to fetch recipes", error);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

app.post("/api/recipes", async (req, res) => {
  const { name } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO recipes (name) VALUES ($1) RETURNING *",
      [name],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Failed to create recipe:", error);
    res.status(500).json({ error: "Failed to create recipe" });
  }
});
