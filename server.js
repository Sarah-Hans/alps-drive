//on récupère le module Express
const express = require('express');

const drive = require('./drive');

//création de l'application
const app = express();

//va chercher à afficher des pages static se trouvant dans le dossier frontend
app.use(express.static('frontend'));

//affiche la liste contenant les dossiers et fichiers à la racine du drive
app.get('/api/drive', (req, res) => {
    const mapromesse = drive.listFolder();
    mapromesse.then((result) => {
        res.send(result);
      }).catch(() => {
        res.status(500);
        res.send('Erreur serveur')
      })
})

app.get('/api/drive/:name', (req, res) => {
  const name = req.params.name;
  const promesse = drive.isFile(name);
  promesse.then((isFile) => {
    if (isFile) {
      //fichier
      console.log('C\'est un fichier');
      //on affiche le contenu du fichier
      const fileContent = drive.seeContent(name);
      fileContent.then((result) => {
        res.send(result)
      }).catch(() => {
        res.status(404).send('Contenu introuvable')
      })
    } else {
      //dossier
      console.log('C\'est un dossier');
      const promesse = drive.seeFolder(name)
      promesse.then((result) => {
        res.send(result)
      }).catch(() => {
        res.statut(404).send('Contenu introuvable')
      })
      
    }
  })
  

})



//exporter l'application pour pouvoir l'utiliser dans les autres fichiers
module.exports = app;