/*
*       CONTROLLERS / Logique métier de chaque routes
*/


//Import mongoose schema Sauce
const Sauce = require("../models/Sauce")

// Import package File System (accès aux différentes opérations liées au système de fichier)
const fs = require('fs')


//Controller LIKE et DISLIKE
exports.likeDislikeSauce = (req, res, next) => {
    let like = req.body.like
    let userId = req.body.userId
    let sauceId = req.params.id
    console.log(req.body)
}


//Controller POST
exports.createSauce = (req, res, next) => {
    // Objet Js sous forme de chaine caractere
    const sauceObject = JSON.parse(req.body.sauce)
    // Retire le champ id renvoyé par mongoDb, avant de le copier
    delete sauceObject._id
    // Création nouvelle instance de notre model Sauce
    const sauce = new Sauce({
        // Copie les champs du model Sauce, dans le body/corps de la request
        ...sauceObject,
        // Modification url de l'image
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    // Enregistrement du "sauce" dans la base de données
    sauce.save()
        .then(() => res.status(201).json({ message: "Objet Enregistré !"}))
        .catch(error => res.status(400).json({ error }))
}


// Controller PUT
exports.modifySauce = (req, res, next) => {
    // 
    const sauceObject = req.file ?
    {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body }
    // Mettre à jour/ modifier une sauce dans la base de données, en fonction de l'id
    Sauce.updateOne({ _id: req.params.id }, {...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: "Objet Modifié !"}))
        .catch(error => res.status(400).json({ error }))
}


//Controller DELETE
exports.deleteSauce = (req, res, next) => {
    // S'assurer que l'utilisateur qui fait la requête est bien le propriétaire de l'objet avant de pouvoir supprimer
    Sauce.findOne({ _id: req.params.id })
        .then(
            (sauce) => {
                // Cas d'erreur: si sauce n'existe pas
                if (!sauce) {
                    return res.status(404).json({
                        error: new Error('Objet non trouvé !')
                    })
                }
                // Vérification du userId 
                if (sauce.userId !== req.auth.userId) {
                    return res.status(401).json({
                        error: new Error('Requête non autorisée !')
                    })
                }
                // Retrouver le bon nom du fichier
                const filename = sauce.imageUrl.split('/images/')[1]
                // Supression du fichier
                fs.unlink(`images/${filename}`, () => {
                    //Si bon propriétaire: supprimer une sauce de la base de données, en fonction de l'id
                    Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
                    .catch(error => res.status(400).json({ error }))
                })
            })
        .catch(error => res.status(500).json({ error }))
}


//Controller GET ONE
exports.getOneSauce = (req, res, next) =>{
    //Trouver un seul objet dans la base de données. Via objet req.param.id (car c'est un paramètre de route dynamique)
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }))
}


//Controller GET
exports.getAllSauces = (req, res) =>{
    //renvoyer un tableau contenant toutes les Sauces
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }))
}