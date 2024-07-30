import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import methodOverride from "method-override";
import logger from "morgan";
import Fruit from "./models/fruit.js";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("Failed to connect to MongoDB", err);
});

// GET 
app.get("/", async (req, res) => {
    res.render("index.ejs");
});

// GET /fruits
app.get("/fruits", async (req, res) => {
    const allFruits = await Fruit.find();
    res.render("fruits/index.ejs", { fruits: allFruits });
});

// GET /fruits/new
app.get("/fruits/new", async (req, res) => {
    res.render("fruits/new.ejs");
});

// GET /fruits/:fruitId
app.get("/fruits/:fruitId", async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render("fruits/show.ejs", { fruit: foundFruit });
});

// GET /fruits/:fruitId/edit
app.get("/fruits/:fruitId/edit", async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render("fruits/edit.ejs", { fruit: foundFruit });
});

// POST 
app.post("/fruits", async (req, res) => {
    req.body.isReadyToEat = req.body.isReadyToEat === "on";
    await Fruit.create(req.body);
    res.redirect("/fruits");
});

// DELETE /fruits/:fruitId
app.delete("/fruits/:fruitId", async (req, res) => {
    await Fruit.findByIdAndDelete(req.params.fruitId);
    res.redirect("/fruits");
});

// PUT /fruits/:fruitId
app.put("/fruits/:fruitId", async (req, res) => {
    req.body.isReadyToEat = req.body.isReadyToEat === "on";
    await Fruit.findByIdAndUpdate(req.params.fruitId, req.body);
    res.redirect(`/fruits/${req.params.fruitId}`);
});

// connection listener to MONGODB and listening to port 3000
mongoose.connection.on("connected", () => {
    app.listen(3000, () => {
        console.log("Listening on port 3000");
    });
});