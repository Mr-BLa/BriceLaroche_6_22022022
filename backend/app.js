/*
**  Application utilisera ces fonctions pour tout types de requête
*/

// Import express
const express = require("express")

// Import mongoose
const mongoose = require('mongoose')

// Import de path (chemin de notre systeme de fichier)
const path = require('path')

// Import CORS
const cors = require('cors')

// Import routers
const sauceRoutes = require('./routes/sauce')
const userRoutes = require('./routes/user')

// Connexion MongoDB-Atlas
const { MongoClient } = require('mongodb')

// Variable environnement dotenv
const uri = process.env.MONGO_URL

//Connexion à la base de données
mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connexion à la base de données établie'))
    .catch((error) => console.log(error))


// Création application express
const app = express()



// Middleware général, pour permettre à l'app, d'accéder à l'API sans problèmes

const corsOptions ={
    origin:'http://127.0.0.1:8081'
}
app.use(cors(corsOptions))

// Pour gérer la requête POST venant de l'application front-end, on a besoin d'en extraire le corps JSON
app.use(express.json())

// Lors de requête /images, servir le dossier images
app.use('/images', express.static(path.join(__dirname, 'images')))

// Pour la route "/api/sauce", on utilise sauceRoutes (donc le router)
app.use('/api/sauces', sauceRoutes)

// Pour la route "/api/auth", on utilise userRoutes
app.use('/api/auth', userRoutes)

// Exportation cette app, pour qu'on puisse y accéder depuis d'autres fichiers (notamment node)
module.exports = app