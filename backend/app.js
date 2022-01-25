//import express
const express = require("express")

// création application express
const app = express()

//exportation cette app, pour qu'on puisse y accéder depuis d'autres fichiers (notamment node)
module.exports = app