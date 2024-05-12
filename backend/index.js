const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const zod = require("zod");
const Card = require("./db/Card");
const Admin = require("./db/admin");


const app = express();
const cardItemSchema = zod.object({
    name: zod.string(),
    description: zod.string(),
    twitter: zod.string().optional(),
    linkedin: zod.string().optional(),
    instagram: zod.string().optional(),
    hobbies: zod.array(zod.string()),   // we have to pass inside the zod.array that what type of data should array expect
    phoneNumber: zod.string().min(10),
    address: zod.string()
})
const userSchema = zod.object({
    username : zod.string().email(),
    password: zod.string()
})
app.use(cors());
app.use(express.json());

app.post("/card", async (req, res) => {
    try {
        const data = req.body;
        if (!((cardItemSchema.safeParse(data)).success)) {
            return res.status(403).json({ "Error": "Please Enter Valid Data" });
        }
        await Card.create(data);
        res.status(200).json({ "msg": "Card Added Succesfully" });
    }
    catch (e) {
        console.log(e);
        res.status(200).json({ "Error": "oops!" });
    }
})

app.get("/cards", async (req, res) => {
    try {
        const cardData = await Card.find({}, { _v: 0 });
        res.status(200).json({ cardData });
    }
    catch (err) {
        res.status(500).send("Something went wrong");
    }
});

app.post("/login",async (req,res)=>{
    try{
        const data = req.body;
        if (!((userSchema.safeParse(data)).success)) {
            return res.status(403).json({ "Error": "Please Enter Valid Data" });
        }
        const user = await Admin.findOne(data);
        if(!user){
            return res.status(403).json({"Error":"User Not Found"});
        }
        const token = jwt.sign({username : user.username},"123456@");
        res.status(200).json({'token':token});
    }
    catch(err){
        res.status(500).json({"Error":"Something Went Wrong"});
    }
});

app.post("/update",async(req,res)=>{
    try{
        const data = req.body;
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token,"123456@");
        if(user.username){
            console.log("in if");
            console.log(data + data.id);
            await Card.updateOne({_id:data.id},{$set:data});
            res.status(200).json({"msg":"Update Sucessfully"});
        }
        else{
            res.status(500).json({"Error":"Your Not Admin"});
        }
    }
    catch(err){
        res.status(500).json({"Error":"Your Not Admin"});
    }
});

app.use((err, req, res, next) => {
    res.status(500).send("Error Ocuured");
});

app.listen(4000, () => {
    mongoose.connect("mongodb+srv://pateldhairya0210:6WenZfAPR5pes1RM@cluster0.p3fudp9.mongodb.net/BusinessCard")
        .then(() => {
            console.log("connected");
        })
        .catch(() => {
            console.log("Not Connected");
        })
});