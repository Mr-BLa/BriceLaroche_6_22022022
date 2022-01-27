/*
*       CONTROLLERS / Logique métier de chaque routes
*/


//Import mongoose schema Sauce
const { prependListener } = require("../app")
const Sauce = require("../models/Sauce")


//Controller POST
exports.createSauce = (req, res, next) => {
    //Retire le champ id renvoyé par mongoDb, avant de le copier
    delete req.body._id
    //création nouvelle instance de notre model Sauce
    const sauce = new Sauce({
        //copie les champs du model Sauce, dans le body/corps de la request
        ...req.body
    })
    //enregistrement du "sauce" dans la base de données
    sauce.save()
        .then(() => res.status(201).json({ message: "Objet Enregistré !"}))
        .catch(error => res.status(400).json({ error }))
}


//Controller PUT
exports.modifySauce = (req, res, next) => {
    // Mettre à jour/ modifier une sauce dans la base de données, en fonction de l'id
    Sauce.updateOne({ _id: req.params.id }, {...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: "Objet Modifié !"}))
        .catch(error => res.status(400).json({ error }))
}


//Controller DELETE
exports.deleteSauce = (req, res, next) => {
    //Supprimer une sauce de la base de données, en fonction de l'id
    Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({ error }))
}


//Controller GET ONE
exports.getOneSauce = (req, res, next) =>{
    //Trouver un seul objet dans la base de données. Via objet req.param.id (car c'est un paramètre de route dynamique)
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }))
}


//Controller GET
exports.getAllSauces = (req, res) =>{
    //renvoyer un tableau contenant toutes les Sauces
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }))
}