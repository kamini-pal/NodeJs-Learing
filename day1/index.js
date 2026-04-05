const express = require("express");

const app = express();

app.get("/" , (requestAnimationFrame,res) => {
    res.send("hi i am kamini today i start my backend jurney with node js");
})

app.get("/about" , (req , res) => {
    res.send("hi this is about page ")
})

app.listen(3000, () => {
    console.log("server is running on port 3000");
})