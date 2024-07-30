// Here is where we import modules
// We begin by loading Express

//! const express = require("express"); old way of doing things

import dotenv from "dotenv";
dotenv.config()
import mongoose from "mongoose";

// Import fruit from models 
import Fruit from "./models/fruit.js";

import express from "express"; // new way of doing express import express
const app = express();

app.use(express.urlencoded({ extended: false })); //! read information from the body of request

mongoose.connect(process.env.MONGODB_URI) //! connect to MONGODB_URI

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
// GET
app.get("/fruits/:fruitId", async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render("fruits/show.ejs", { fruit: foundFruit });
});

// POST 
app.post("/fruits", async (req, res) => {
    console.log(req.body);
    // talk to the DB - through model
    if (req.body.isReadyToEat === "on") {
        req.body.isReadyToEat = true;
    } else {
        req.body.isReadyToEat = false;
    }
    await Fruit.create(req.body); // pushes the Schema to DB mongoose
    res.redirect("/fruits");      // redirect the UI/UX back to /fruits url and body index
});


// connection listener to MONGODB and listening to port 3000
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
    app.listen(3000, () => {
        console.log("Listening on port 3000");
    });
});
