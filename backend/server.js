// Ecoute les requêtes http et y répond

// Objet http qui permet de créer serveur
const http = require('http')

// Appel méthode createServer du package http. Cette methode prend comme argument, la fonction qui sera appeler à chaque reçue par le serveur
const server = http.createServer((req, res) => {
    //methode "end" de l'objet réponse
    res.end('Voilà la réponse du nodemon serveur !')
})

//Methode listen du serveur pour écouter requête
server.listen(process.env.PORT || 3000)