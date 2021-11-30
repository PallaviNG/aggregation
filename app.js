const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const routes = require("./app/routes/indexRoutes");
const httpErrors = require("http-errors");
const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.urlencoded({extended:false}));

app.use('/',routes);

app.use(function(error,req,res){
    next(httpErrors(404));
});

app.use(function(error,req,res,next){
    res.status(error.status || 500);
    res.send({status:false, ...error});
});

let remoteURL = "mongodb+srv://PallaviTS:PallaviNG@mongo.3hmzr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(remoteURL)
.then(function(){
    app.listen(5000,function(){
        console.log("Server is running on port ",5000);
    });
}).catch(function(error){
    console.log(error);
    process.exit(1);
});