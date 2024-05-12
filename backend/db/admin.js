const mongoose = require("mongoose");

mongoose.pluralize(null);

const adminSchema = new mongoose.Schema({
    username : String,
    password : String
});

const Admin = mongoose.model("Admin",adminSchema);

module.exports = Admin;