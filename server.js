//on récupère le module Express
const express = require('express');

//création de l'application
const app = express();

//exporter l'application pour pouvoir l'utiliser dans les autres fichiers
module.exports = app;