//import express
const express = require("express")

// création application express
const app = express()


// Application utilisera ces fonctions pour tout types de requête
app.use((req, res, next) =>{
    console.log("requête reçue!")
    next()
})

app.use((req, res, next) =>{
    res.status(201)
    next()
})

app.use((req, res, next) =>{
    res.json({message: "Votre requête a bien été reçue !"})
    next()
})

app.use((res, req) =>{
    console.log("réponse envoyée avec succès !")
})

//exportation cette app, pour qu'on puisse y accéder depuis d'autres fichiers (notamment node)
module.exports = app