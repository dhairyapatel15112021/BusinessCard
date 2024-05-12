const mongoose = require("mongoose");

mongoose.pluralize(null);

const cardSchema = new mongoose.Schema({
    name:String,
    description:String,
    twitter: String,
    linkedin: String,
    instagram: String,
    hobbies:Array,
    phoneNumber:Number,
    address:String,
});

const Card = mongoose.model("Card",cardSchema);

module.exports = Card;
