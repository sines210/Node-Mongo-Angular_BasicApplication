const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Thing = require('./models/Thing')



mongoose.connect('mongodb://127.0.0.1:27017/thing',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  const app = express();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//PRISE EN MAIN DES REQUETES ET MIDDLEWARES
// app.use((req, res, next)=>{
//     console.log('requete reçue');
//     next(); //renvoie vers le prochain middleware, prochaine fonction
// })

// app.use((req, res, next)=>{
//     res.status(201);
//     next();
// })

// app.use((req, res, next)=>{
//     res.json({message : 'votre requete a bien été reçue'}) //ici la réponse va etre affichée peu importe le type de requete au serveur car ce n'est pas précisé
//     next();
// })

// app.use((req, res)=>{
//     console.log('réponse envoyée avec succés!)')
// })

app.use(bodyParser.json()); //en .use car c'est pour toutes les routes de l'application transforme le corps de la requete en objet js utilisable


//toujours mettre la requete post avant le get
app.post('/api/stuff', (req, res, next)=>{
    delete req.body._id;
    const thing = new Thing({
    // title : req.body.title,
    // descritpion : req.body.descritpion,
    // imageUrl : req.body.imageUrl,
    // userId : req.body.userId,
    // price : req.body.price
    ...req.body //spread operator qui permet ici de ne pas réécrire tt l'objet comme commenté
});
    thing.save()
    .then(()=>res.status(201).json({message: 'Objet enregistré!'}))
    .catch(error=>res.status(400).json({error}))
})

app.put('/api/stuff/:id', (req, res, next)=>{
    Thing.updateOne({_id : req.params.id}, {...req.body, _id : req.params.id})
    .then(thing=>res.status(200).json({message : 'Objet modifié'}))
    .catch(error=>res.status(400).json({error}))
})

app.delete('/api/stuff/:id', (req, res, next)=>{
    Thing.deleteOne({_id : req.params.id})
    .then(thing=>res.status(200).json({message : 'Objet supprimé'}))
    .catch(error=>res.status(400).json({error}))
})

app.get('/api/stuff/:id', (req, res, next)=>{
    Thing.findOne({_id : req.params.id})
    .then(thing=>res.status(200).json(thing))
    .catch(error=>res.status(404).json({error}))
})

app.get('/api/stuff', (req, res, next)=>{ 
    Thing.find()
    .then(things=>res.status(200).json(things))
    .catch(error=>res.status(400).json({error}))
})

 
module.exports = app; //permet d'avoir accès à l'app express depuis les autres fichiers du projet 