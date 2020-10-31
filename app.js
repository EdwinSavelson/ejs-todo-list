const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let item = "";
let items = [];
let workItems = [];

let day = date.getDate();

app.get("/", function(req, res){

  res.render('index', {listTitle: day, newListItems: items});

});

app.post("/", function(req, res){

  let item = req.body.newItem;
  console.log(req.body);
  if(req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work");
  }else{
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(res, res){
  res.render("index", {listTitle: "Work List", newListItems: workItems});
})

app.listen(3000, function(){
  console.log("server started on port 3000")
})
