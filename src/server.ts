import express from "express";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { connectDB } from "./database.js";
import { UserController } from "./controller/usercontroller.js";

dotenv.config();

// Corrigindo __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "view")));

const usercontroller = new UserController();

connectDB();

app.get("/users", async (req, res, next) => {
  try {
    await usercontroller.getAll(req, res);
  } catch (error) {
    next(error);
  }
});

app.get("/users/:id", async (req, res, next) => {
  try {
    await usercontroller.getById(req, res);
  } catch (error) {
    next(error);
  }
});

app.post("/users", async (req, res, next) => {
  try {
    await usercontroller.create(req, res);
  } catch (error) {
    next(error);
  }
});

app.delete("/users/:id", async (req, res, next) => {
  try {
    await usercontroller.delete(req, res);
  } catch (error) {
    next(error);
  }
});

app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "view", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
