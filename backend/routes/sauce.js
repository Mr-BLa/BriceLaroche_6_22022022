/*
**      ROUTERS
*/


// Implémentation des routes 
const express = require('express')
const router = express.Router()

// Import controllers
const sauceCtrl = require("../controllers/sauce")
// Import Middleware Authentification Token
const auth = require("../middleware/auth")
// Import Middleware multer-config
const multer = require('../middleware/multer-config')

// Router POST + import et application Controller POST
router.post('/', auth, multer, sauceCtrl.createSauce )

// Router PUT + import et application Controller PUT
router.put('/:id', auth, sauceCtrl.modifySauce )

// Router DELETE + import et application Controller DELETE
router.delete('/:id', auth, sauceCtrl.deleteSauce )

// Router GET/:id + import et application Controller GET/:id
router.get('/:id', auth, sauceCtrl.getOneSauce)

// Router GET + import et application Controller GET
router.get("/", auth, sauceCtrl.getAllSauces)


module.exports = router