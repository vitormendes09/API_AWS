var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { connectDB } from "../src/database.js";
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
app.get("/users", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield usercontroller.getAll(req, res);
    }
    catch (error) {
        next(error);
    }
}));
app.get("/users/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield usercontroller.getById(req, res);
    }
    catch (error) {
        next(error);
    }
}));
app.post("/users", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield usercontroller.create(req, res);
    }
    catch (error) {
        next(error);
    }
}));
app.delete("/users/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield usercontroller.delete(req, res);
    }
    catch (error) {
        next(error);
    }
}));
app.get("/", (_, res) => {
    res.sendFile(path.join(__dirname, "view", "index.html"));
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
