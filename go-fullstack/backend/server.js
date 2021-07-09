//console.log('test serveur')  //test serveur on peut taper node server dans le terminal pour afficher

const http = require('http');
const app = require('./app');

app.set('port', process.env.PORT || 3000);

const server = http.createServer(app);


// const server = http.createServer((req, res)=>{
//     res.end('voilà la réponse du serveur modifiée')
// }); //on utiliserai cette méthode pour traiter les requetes du serveur si on avait pas créer le app avec express

server.listen(process.env.PORT || 3000)//va utiliser le 3000 par défaut sauf si celui ci n'est pas dispo ou que le process passe par un autre port // voir postman pour tester les différents types de requetes





//stabilisation serveur en cas d'hébergement en ligneconst http = require('http');
// const app = require('./app');

// const normalizePort = val => {
//   const port = parseInt(val, 10);

//   if (isNaN(port)) {
//     return val;
//   }
//   if (port >= 0) {
//     return port;
//   }
//   return false;
// };
// const port = normalizePort(process.env.PORT || '3000');
// app.set('port', port);

// const errorHandler = error => {
//   if (error.syscall !== 'listen') {
//     throw error;
//   }
//   const address = server.address();
//   const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
//   switch (error.code) {
//     case 'EACCES':
//       console.error(bind + ' requires elevated privileges.');
//       process.exit(1);
//       break;
//     case 'EADDRINUSE':
//       console.error(bind + ' is already in use.');
//       process.exit(1);
//       break;
//     default:
//       throw error;
//   }
// };

// const server = http.createServer(app);

// server.on('error', errorHandler);
// server.on('listening', () => {
//   const address = server.address();
//   const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
//   console.log('Listening on ' + bind);
// });

// server.listen(port);
