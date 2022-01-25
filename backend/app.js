//import express
const express = require("express")

// création application express
const app = express()

// Application utilisera cete fonction pour tout types de requête
app.use((req, res) =>{
    res.json({message: "Votre requête a bien été reçue !"})
})

//exportation cette app, pour qu'on puisse y accéder depuis d'autres fichiers (notamment node)
module.exports = app