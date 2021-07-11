const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const stuffCtrl = require('../controllers/stuff');


//toujours mettre la requete post avant le get
router.post('/', auth, multer, stuffCtrl.createThing) //le multer middelware doit etre placé après l'authentification

router.put('/:id', auth, multer, stuffCtrl.modifyThing)

router.delete('/:id', auth, stuffCtrl.deleteThing)

router.get('/:id', auth, stuffCtrl.getOneThing)

router.get('/', auth, stuffCtrl.getAllThings)

module.exports = router;