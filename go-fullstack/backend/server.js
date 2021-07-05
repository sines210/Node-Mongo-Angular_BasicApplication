//console.log('test serveur')  //test serveur on peut taper node server dans le terminal pour afficher

const http = require('http');
const app = require('./app');

app.set('port', process.env.PORT || 3000);

const server = http.createServer(app);


// const server = http.createServer((req, res)=>{
//     res.end('voilà la réponse du serveur modifiée')
// }); //on utiliserai cette méthode pour traiter les requetes du serveur si on avait pas créer le app avec express

server.listen(process.env.PORT || 3000)//va utiliser le 3000 par défaut sauf si celui ci n'est pas dispo ou que le process passe par un autre port // voir postman pour tester les différents types de requetes