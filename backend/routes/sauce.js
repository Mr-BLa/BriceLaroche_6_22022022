/*
**      ROUTERS
*/



//Implémentation des routes 
const express = require('express')
const router = express.Router()

//Import controllers
const sauceCtrl = require("../controllers/sauce")


//Router POST + import et application Controller POST
router.post('/', sauceCtrl.createSauce )

//Router PUT + import et application Controller PUT
router.put('/:id', sauceCtrl.modifySauce )

//Router DELETE + import et application Controller DELETE
router.delete('/:id', sauceCtrl.deleteSauce )

//Router GET/:id + import et application Controller GET/:id
router.get('/:id', sauceCtrl.getOneSauce)

//Router GET + import et application Controller GET
router.get("/", sauceCtrl.getSauce)


module.exports = router