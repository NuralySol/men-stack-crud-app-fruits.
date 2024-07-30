// Here is where we import modules
// We begin by loading Express

//! const express = require("express"); old way of doing things

import express from "express"; // new way of doing express import express
const app = express();

// GET 
app.get("/", async (req, res) => {
    res.render("index.ejs");
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});

