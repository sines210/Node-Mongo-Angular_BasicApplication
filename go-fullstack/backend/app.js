const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');


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


app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

 
module.exports = app; //permet d'avoir accès à l'app express depuis les autres fichiers du projet 