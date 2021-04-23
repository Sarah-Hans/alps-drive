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

app.post('/api/drive', (req, res) => {
  console.log('ok')
  const name = req.query.name;
  const regex = /^[a-zA-Z0-9-_]*$/;
  const test = regex.test(name)
  console.log(test)
  if (test === true) {
    console.log('Ok bon nom de dossier')
    const promesse = drive.createFolder(name);
    promesse.then(result => {
      res.status(201).send(result)
    }).catch(() => {
      res.send('Contenu introuvable')
    })
  } else {
    console.log('Utilisez des caractères alphanumériques')
    res.sendStatus(400)
  } 
})

app.post('/api/drive/:folder', (req, res) => {
  const folder = req.params.folder
  const name = req.query.name
  const regex = /^[a-zA-Z0-9-_]*$/;
  const test = regex.test(name)
  console.log(test)
  if (test === true) {
    console.log('Ok bon nom de dossier')
    const promesse = drive.createFolderInFolder(folder, name);
    promesse.then(result => {
      res.status(201).send(result)
    }).catch(() => {
      res.send('Contenu introuvable')
    })
  } else {
    console.log('Utilisez des caractères alphanumériques')
    res.sendStatus(400)
  }
})

app.delete('/api/drive/:name', (req, res) => {
  const name = req.params.name
  const promesse = drive.deleteElement(name)
  promesse.then(result => {
    res.status(201).send(result)
  }).catch(() => {
    res.sendStatus(400)
  })
})

app.delete('/api/drive/:folder/:name', (req, res) => {
  console.log('Ok delete')
  const folder = req.params.folder
  const name = req.params.name
  console.log('Folder : '+ folder)
  console.log('Name : ' + name)
  const promesse = drive.deleteElementInFolder(folder, name)
  promesse.then(result => {
    res.status(201).send(result)
  }).catch(() => {
    console.log('Erreur pffffff')
    res.sendStatus(400)
  })
})


//exporter l'application pour pouvoir l'utiliser dans les autres fichiers
module.exports = app;