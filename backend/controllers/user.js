/*
*          CONTROLLERS AUTHENTIFICATION
*/

// Import package bcrypt
const bcrypt = require('bcrypt')

// Import Model User
const User = require('../models/User')



// Création de nouveaux utilisateurs
exports.signup = (req, res, next) => {
    // Hacher le mdp
    bcrypt.hash(req.body.password, 10)
        // On récupère le hash...
        .then(hash => {
            // ... Qu'on enregistre dans un nouvel User...
            const user = new User({ 
                email: req.body.email,
                password: hash
            })
            //... qu'on enregistre dans la BDD
            user.save()
                .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
}

// Connecter utilisateurs existants
exports.login = (req, res, next) => {

}