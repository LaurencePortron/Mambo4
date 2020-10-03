// // Initialisation des variables

// const carreRouge = document.querySelector('.carreRouge');
// const carreBleu = document.querySelector('.carreBleu');
// const carreJaune = document.querySelector('.carreJaune');
// const carreVert = document.querySelector('.carreVert');
// const sequence = [];

// // Création des fonctions

// function randomInteger(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// function addOpacity(square) {
//   square.style.opacity = '0.7';
// }

// function removeOpacity(square) {
//   square.style.opacity = '1';
// }

// // Fonction principale

// function scaleSquare() {
//   const currentRandomInteger = randomInteger(1, 4);

//   if (currentRandomInteger === 1) {
//     addOpacity(carreRouge);
//     // removeOpacity(carreRouge);
//   } else if (currentRandomInteger === 2) {
//     addOpacity(carreBleu);
//     // removeOpacity(carreBleu);
//   } else if (currentRandomInteger === 3) {
//     addOpacity(carreJaune);
//     // removeOpacity(carreJaune);
//   } else if (currentRandomInteger === 4) {
//     addOpacity(carreVert);
//     // removeOpacity(carreVert);
//   } else null;

//   sequence.push(currentRandomInteger);
// }

// // Lancement du jeu

// scaleSquare();

const carreRouge = document.querySelector('.carreRouge');

console.log(carreRouge);

function modifyOpacity() {
  carreRouge.style.opacity = '0.7';
}

function removeOpacity() {
  carreRouge.style.opacity = '1';
}

modifyOpacity();
setTimeout(removeOpacity, 2000);
