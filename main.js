//import du package http de Node
const http = require('http');

//création du serveur http avec la méthode createServer du module http
//la méthode prend comme argument la fonction qui sera appelée à chaque requête reçue par le serveur
//cette fonction reçoit automatiquement deux arguments : la requête (req) et la réponse (res)
const server = http.createServer((req, res) => {
    res.end('Hello everybody !'); //on envoie une seule réponse, peut importe la requête
});

//le serveur va écouter les requêtes envoyées. On voit si l'environnement utiliser un port précis, sinon on utilise le port 3000 par défaut
server.listen(process.env.PORT || 3000);