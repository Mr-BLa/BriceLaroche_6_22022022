/*
*      CREATION MODEL POUR STOCKER DOCUMENTS UTILISATEURS DANS BDD (Login, Mdp)
*/

// Import Mongoose
const mongoose = require("mongoose")

// Import plugin unique-validator
const uniqueValidator = require("mongoose-unique-validator")

// Création Schéma
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

// Plugin appliqué au schéma avant d'en faire un model (pas d'utilisateurs avec la même adresse mail)
userSchema.plugin(uniqueValidator)

// Export model schéma
module.exports = mongoose.model('User', userSchema)