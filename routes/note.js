const express = require("express")
const router = express.Router()

router.get ("/", functio (request, response){
    response.render("note", {})
})

module.exports = routers