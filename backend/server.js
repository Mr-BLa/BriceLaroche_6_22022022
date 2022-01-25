/* 
**  Ecoute les requêtes http et y répond
*/


// Objet http qui permet de créer serveur
const http = require('http')
// Import application 
const app = require("./app")


//Dire à l'app, sur quel port elle va tourner
app.set("port", process.env.PORT || 3000)

// Appel méthode createServer du package http. Cette methode prend comme argument, la fonction qui sera appeler à chaque reçue par le serveur
const server = http.createServer(app)

//Methode listen du serveur pour écouter requête
server.listen(process.env.PORT || 3000)