const express = require("express")
const ejs = require ("ejs")

const server = express()
const port = 3030

server.use(express.json());

server.use(express.static("public"))

const note_router = require("./routes/note")

server.set("view engine", "ejs")

server.get("/", function (request, response){
    response.render("index", {})
})

server.use ("/note",note_router)

server.listen(port, function () {
    console.log("server started!")
})

//Fonction export
server.post('/export', (req, res) => {
  const { title, text } = req.body;
  const contenu = `Titre: ${title}\n\n${text}`;
  res.setHeader('Content-Disposition', `attachment; filename="${title || 'document'}.txt"`);
  res.setHeader('Content-Type', 'text/plain');
  res.send(contenu);
});
