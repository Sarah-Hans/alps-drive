const fs = require('fs/promises'); // appel à la librairie fs avec les promesses
const path = require('path');
const os = require ('os');

const ALPS_DRIVE_ROOT = path.join(os.tmpdir(), 'alpsdrive'); // création d'une constante qui va chercher l'emplacement des fichiers sur notre ordi

console.log('Mon dossier racine est: ' + ALPS_DRIVE_ROOT);

//fonction qui crée le dossier racine du drive
function createRootFolder() {
    const promise = fs.access(ALPS_DRIVE_ROOT)
        .then(() => {
            console.log('Le dossier existe');
        }).catch(() => {
            return fs.mkdir(ALPS_DRIVE_ROOT, {recursive: true});
        })
    return promise;
}

//fonction qui liste l'ensemble du contenu du drive
function listFolder() {
    const promise = fs.readdir(ALPS_DRIVE_ROOT, {withFileTypes: true}); //promesse qui va lire le dossier root, whithFilesTypes true pour retourner des objets (dirent) auxquels on peut appliquer des méthodes
    //création d'une promesse transformée qui va retourner tout le contenu du drive sous forme de tableau d'objets avec des attributs (name, isFolder)
    const promiseTransformed = promise.then((results) => {
        const allFiles = [];
        results.forEach((result) => {
            allFiles.push({
                name: result.name,
                isFolder: result.isDirectory(),
            })
        })
        console.log(allFiles);
        return allFiles;
    })
    .catch(() => {
        console.log('Erreur')
    })
    return promiseTransformed;
}

function contentFolder() {
    
}

//export du module 
module.exports = {
    createRootFolder: createRootFolder,
    listFolder: listFolder,
    contentFolder: contentFolder,
};