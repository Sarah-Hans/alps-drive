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

app.get('/api/drive/:name'), (req, res) => {
  console.log('ok')
  const name = req.params.name;
  const promesse = drive.isFile(name);
  promesse.then((isFile) => {
    if (isFile) {
      //fichier
      console.log('C\'est un fichier');
      //on affiche le contenu du fichier
      const fileContent = drive.seeContent(name);
      fileContent.then((result) => {
        console.log(result)
        res.sendFile(name)
      }).catch(() => {
        res.status(404).send('Contenu introuvable')
      })
    } else {
      //dossier
      console.log('C\'est un dossier');
      
    }
  })
  

}



//exporter l'application pour pouvoir l'utiliser dans les autres fichiers
module.exports = app;