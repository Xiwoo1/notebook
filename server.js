const express = require("express")
const ejs = require("ejs")

const server = express()
const port = 3030

// Middleware pour lire le JSON envoyé par le client
server.use(express.json());

// Dossier public pour les fichiers statiques (css, script.js)
server.use(express.static("public"))

// Import des routes
const note_router = require("./routes/note")

// Configuration du moteur de vue
server.set("view engine", "ejs")

// Route d'accueil
server.get("/", function (request, response){
    response.render("index", {})
})

// Utilisation du routeur pour /note
server.use("/note", note_router)

// Fonction Export (Corrigée et Sécurisée)
server.post('/export', (req, res) => {
  const { title, text } = req.body;

  // 1. Création du contenu du fichier (les accents fonctionnent ici)
  const contenu = `Titre: ${title}\n\n${text}`;

  // 2. Nettoyage du NOM du fichier
  // Remplace tout ce qui n'est pas lettre ou chiffre par "_" pour éviter l'erreur HTTP
  const safeTitle = (title || 'document').replace(/[^a-zA-Z0-9]/g, "_");

  // 3. Envoi des en-têtes
  res.setHeader('Content-Disposition', `attachment; filename="${safeTitle}.txt"`);
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');

  // 4. Envoi du texte
  res.send(contenu);
});

// Démarrage du serveur
server.listen(port, function () {
    console.log("server started! (Port " + port + ")")
})