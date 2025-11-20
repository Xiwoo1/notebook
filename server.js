const express = require("express")
const ejs = require ("ejs")

const server = express()
const port = 3030

server.set("view engine", "ejs")

server.get("/", function (request, response){
    response.render("index", {})
})

server.listen(port, function () {
    console.log("server started!")
})
