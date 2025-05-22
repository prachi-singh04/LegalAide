const express=require("express");
const app=express();
const mongoose=require("mongoose");
const ejs=require("ejs");
const Lawyer =require("./models/lawyer.js");
const path = require("path");
const methodOverride=require("method-override");
const ejsMate = require("ejs-mate");

const MONGO_URL = "mongodb://127.0.0.1:27017/LegalAide";

main()
    .then(() => {
        console.log("Connected to DB");
    })
    .catch(err => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));



app.get("/",(req,res)=>{
    res.send("Hi,I am root");
});

//index route
app.get("/lawyers", async(req,res) =>{
    const allLawyers=await Lawyer.find({});
    res.render("lawyers/index",{ allLawyers });
});

//new route
app.get("/lawyers/new", async(req,res)=>{
    res.render("lawyers/new.ejs")
});

//show route
app.get("/lawyers/:id" , async(req,res) => {
    let {id}= req.params;
    const lawyer =await Lawyer.findById(id);
    res.render("lawyers/show.ejs",{ lawyer });
});

//create route
app.post("/lawyers", async(req,res) => {
    const newLawyer=new Lawyer(req.body.lawyer);
    await newLawyer.save();
    res.redirect("/lawyers");
});

//edit route
app.get("/lawyers/:id/edit" , async(req,res) => {
    let {id}= req.params;
    const lawyer =await Lawyer.findById(id);
    res.render("lawyers/edit.ejs" , { lawyer });
});

//update route
app.put("/lawyers/:id", async(req,res) => {
    let{id} =req.params;
    await Lawyer.findByIdAndUpdate(id, {...req.body.lawyer});
    res.redirect("/lawyers/${id}");
});

//deleteroute
app.delete("/lawyers/:id", async(req,res) => {
    let {id} = req.params;
    await Lawyer.findByIdAndDelete(id);
    res.redirect("/lawyers");
});

app.listen(8080,()=>{
    console.log("server is listening at port 8080");
});