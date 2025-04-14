const express = require("express");
const bodyParser = require("body-parser");
var app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/todo");
const trySchema = new mongoose.Schema({
    name:String
});
const item =mongoose.model("task",trySchema);
const todo = new item({
    name:"Create some videos"
});
app.get("/",function(req,res){
    item.find({})
    .then(foundItems => {
        res.render("list",{ejes : foundItems});
    })
    .catch(err => {
        console.log(err);
    });
});

app.post("/",function(req,res){
    const itemName = req.body.ele1;
    const todo4 = new item({
        name:itemName
    });
    todo4.save();
    res.redirect("/");
});

app.post("/delete", async (req, res) => {
    try {
        const checked = req.body.checkbox1;
        await item.findByIdAndDelete(checked);
        console.log("Deleted");
        res.redirect("/");
    } catch (error) {
        console.error("Error deleting item:", error);
    }
});

app.listen("3000",function(){
    console.log("Server is running");
});