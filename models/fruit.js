//! models/fruit.js methods, queries from models, Schema

import mongoose from "mongoose";

// you can add aditional validations for Schema
const fruitSchema = new mongoose.Schema({
    name: String,
    isReadyToEat: Boolean,
});

const Fruit = mongoose.model("Fruit", fruitSchema); 

export default Fruit; // new synthax if using type:module in JSON