const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.signup((req, res, next)=>{
    bcrypt.hash(req.body.passord, 10)    //ici 10 représente le salt du haschage soit combien de fois l'algorithme hashe le mp 10 c'est bien après plus c elevé plus c sécurisé
    .then(hash=>{
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(()=>{res.status(201).json({ message: 'Utilisateur créé' })})
        .catch(error=>res.status(500).json({ error }))
    })
    .catch(error=>res.status(500).json({ error }))
})

exports.login((req, res, next)=>{
    User.findOne({ email: req.body.email })
    .then(user=>{
        if(!user){
            return res.status(401).json({ error: 'Utilisateur non trouvé' })
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid=>{
            if(!valid){
                return res.status(401).json({ error: 'Mot de passe invalide' })
            }
            res.status(200).json({
                userId: user._id, 
                token: 'TOKEN'
            })
        })
        .catch(error=>res.status(500).json({ error }))
    })
    .catch(error=>res.status(500).json({ error }))
})