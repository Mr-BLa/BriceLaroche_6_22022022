// Import express
const express = require("express")
// Import mongoose
const mongoose = require('mongoose')

//Import mongoose schema Sauce
const Sauce = require('./models/Sauce');

//Connexion MongoDB-Atlas
const { MongoClient } = require('mongodb')
const uri = "mongodb+srv://hot-takes:hottakes1@cluster0.5q2kg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
client.connect(err => {
    const collection = client.db("test").collection("devices")
    // perform actions on the collection object
    client.close()
})

// création application express
const app = express()


/*
**  Application utilisera ces fonctions pour tout types de requête
*/

//Pour gérer la requête POST venant de l'application front-end, on a besoin d'en extraire le corps JSON
app.use(express.json())


//Middleware général, pour permettre  l'app, d'accéder  l'API sans problèmes
app.use((req, res, next) => {
    //accéder à notre API depuis n'importe quelle origine ( '*' )
    res.setHeader('Access-Control-Allow-Origin', '*')
    //ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.)
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    //envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})

app.post('/api/sauces', (req, res, next) => {
    //Retire le champ id renvoyé par mongoDb, avant de le copier
    delete req.body._id
    //créaton nouvelle instance de notre model Sauce
    const sauce = new Sauce({
        //copie les champs du model Sauce, dans le body/corps de la request
        ...req.body
    })
    //enregistrement du "sauce" dans la base de données
    sauce.save()
        .then(() => res.status(201).json({ message: "Objet Enregistré !"}))
        .catch(error => res.status(400).json({ error }))
})

app.get("/api/sauces", (req, res) =>{
    console.log("requête reçue!")
})


//exportation cette app, pour qu'on puisse y accéder depuis d'autres fichiers (notamment node)
module.exports = app