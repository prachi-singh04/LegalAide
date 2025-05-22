const mongoose=require("mongoose");
const initData= require("./data.js");
const Lawyer = require("../models/lawyer.js");

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
};

const initDB = async() =>{
    await Lawyer.deleteMany({});
    await Lawyer.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();