const express = require('express');
const router = express.Router();


const stuffCtrl = require('../controllers/stuff');

//toujours mettre la requete post avant le get
router.post('/', stuffCtrl.createThing)

router.put('/:id', stuffCtrl.modifyThing)

router.delete('/:id', stuffCtrl.deleteThing)

router.get('/:id', stuffCtrl.getOneThing)

router.get('/', stuffCtrl.getAllThings)

module.exports = router;