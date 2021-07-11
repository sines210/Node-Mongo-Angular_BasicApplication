const Thing = require('../models/Thing');
const fs = require('fs');


exports.createThing = (req, res, next)=>{
   /*Méthode objet simple*/
    // delete req.body._id;
    // const thing = new Thing({
    // // title : req.body.title,
    // // descritpion : req.body.descritpion,
    // // imageUrl : req.body.imageUrl,
    // // userId : req.body.userId,
    // // price : req.body.price
    // ...req.body //spread operator qui permet ici de ne pas réécrire tt l'objet comme commenté dessus
// });
       /*Méthode objet avec file upload multer*/
    const thingObject = JSON.parse(req.body.thing);
     delete thingObject._id;
     const thing = new Thing({
         ...thingObject,
         imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
         //req.protocol = http ou https, host = host du serveur
     })


    thing.save()
    .then(()=>res.status(201).json({message: 'Objet enregistré!'}))
    .catch(error=>res.status(400).json({error}))
};

exports.modifyThing = (req, res, next)=>{
    const thingObject = req.file ? // ternaire si on trouve un objet on va utiliser la logique pour ajouter l'image url avec l'upload multer sinon on prend le req.body
    { 
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
     } 
    : { ...req.body }
    Thing.updateOne({_id : req.params.id}, {...thingObject, _id : req.params.id})
    .then(thing=>res.status(200).json({message : 'Objet modifié'}))
    .catch(error=>res.status(400).json({error}))
};

exports.deleteThing = (req, res, next)=>{
/*suppression de l'objet avec suppression de l'image de la bdd*/
    Thing.findOne({_id : req.params.id})
    .then(thing=>{
        const filename = thing.imageUrl.split('/images/')[1] //on récupere tt ce qui vient apres le /images/ ds l'url de l'image pour avoir le nom du fichier
        fs.unlink(`images/${filename}`, ()=>{
            Thing.deleteOne({_id : req.params.id})
            .then(thing=>res.status(200).json({message : 'Objet supprimé'}))
            .catch(error=>res.status(400).json({error}))
        }) //images pour le dossier image, le nom du fichier, puis callback de suppression de l'objet
    })
    .catch(error=>res.status(500).json({ error }))


};

exports.getOneThing = (req, res, next)=>{
    Thing.findOne({_id : req.params.id})
    .then(thing=>res.status(200).json(thing))  
    .catch(error=>res.status(404).json({error}))
};

exports.getAllThings =  (req, res, next)=>{ 
    Thing.find()
    .then(things=>res.status(200).json(things))
    .catch(error=>res.status(400).json({error}))
}