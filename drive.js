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

//fonction qui vérifie si c'est un fichier
function isFile(name) {
    const absolutePath = path.join(ALPS_DRIVE_ROOT, name);
    //fs.stat permet d'extraire des informations à propos d'un fichier ou dossier comme isFile() ou isDirectory()
    const promise = fs.stat(absolutePath).then(result => {
        console.log('isFile', result);
        return result.isFile(); // renvoie vrai ou faux
    });
    return promise; // renvoie vrai ou faux
}

//fonction qui affiche le contenu d'un fichier
function seeContent (name) {
    const absolutePath = path.join(ALPS_DRIVE_ROOT, name);
    const promise = fs.readFile(absolutePath, 'utf-8').then((data) => {
        return data;
    }).catch(() => {
        console.log("erreur")
    })
    return promise;
}

//fonction qui affiche le contenu du sous dossier
function seeFolder(name) {
    const absolutePath = path.join(ALPS_DRIVE_ROOT, name);
    const promise = fs.readdir(absolutePath, {withFileTypes: true})
    const promiseTransformed = promise.then((results) => {
        const allFiles = []
        results.forEach((result) => {
            allFiles.push({
                name: result.name,
                isFolder: result.isDirectory(),
            })
        })
        return allFiles
    })
    .catch(() => {
        console.log('Erreur')
    })
    return promiseTransformed
}

//fonction pour créer un dossier
function createFolder(name) {  
    const folderPath = path.join(ALPS_DRIVE_ROOT, name)
    console.log(folderPath)
    const promise = fs.mkdir(folderPath).then((result) => {
        console.log('Directory created successfully!');
        return result;
    })
    return promise;   
    
}

//fonction pour créer un dossier dans un dossier
function createFolderInFolder(folder, name) {  
    const folderPath = path.join(ALPS_DRIVE_ROOT, folder, name)
    console.log(folderPath)
    const promise = fs.mkdir(folderPath).then((result) => {
        console.log('Directory created successfully!');
        return result;
    })
    return promise;   
    
}

//fonction qui supprime un élément (fichier ou dossier)
function deleteElement(name) {
    const absolutePath = path.join(ALPS_DRIVE_ROOT, name)
    const promesse = isFile(name);
     return promesse.then((isFile) => {
        if (isFile) {
            // C'est un fichier
            console.log('Fichier')
            const deletefile = fs.unlink(absolutePath).then((result) => {
                console.log('File deleted')
                return result
            })
            return deletefile
        } else {
            //C'est un dossier
            console.log('Dossier')
            const deletefolder = fs.rmdir(absolutePath, {recursive: true}).then((result) => {
                console.log('Folder deleted')
                return result
            })
            return deletefolder
        }
    })
}

//fonction qui supprime un fichier ou un dossier dans un sous dossier
function deleteElementInFolder(folder, name) {
    const absolutePath = path.join(ALPS_DRIVE_ROOT, folder, name)
    const deletefileorfolder = fs.rm(absolutePath, {recursive: true}).then(result => {
        console.log('Deleted')
        return result
    })
    return deletefileorfolder
}

function uploadFile(filepath, filename) {
    const fpath = path.join(ALPS_DRIVE_ROOT, filename)
    const promise = fs.copyFile(filepath, fpath).then(result => {
        console.log('File uploaded')
        return result
    })
    return promise
}

//export du module 
module.exports = {
    createRootFolder: createRootFolder,
    listFolder: listFolder,
    isFile: isFile,
    seeContent: seeContent,
    seeFolder: seeFolder,
    createFolder: createFolder,
    createFolderInFolder: createFolderInFolder,
    deleteElement: deleteElement,
    deleteElementInFolder: deleteElementInFolder,
    uploadFile: uploadFile,
};