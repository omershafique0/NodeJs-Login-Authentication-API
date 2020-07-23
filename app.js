const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser")
const user = require("./Router/auth.router")

mongoose.connect(process.env.MONGODB_CONNECTION_STRING,{
    useNewParser: true,
    useUnifiedTopology: true,

}).then(()=> console.log("DB Connected"))
.catch((error) => {
    console.log("Error Connection", error.message)
})

const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//app.get('/', (req,res) => res.json("api is sucessfully called"))

//app.use(express.json);
app.use("/user", user);

const PORT = process.env.PORT || 3002

app.listen(PORT, ()=>{
    console.log(`server start on: ${PORT}`)
})