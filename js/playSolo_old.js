let counter = 10;
let carreDejaSelectionne = false;

let carres = ['Rouge', 'Bleu', 'Jaune', 'Vert'];
function removeOpacity() {}

function addOpacity() {}
let randomCarre = Math.floor(Math.random() * 4) + 1;
let carreSelectionneParIA = document.querySelector(
  `.carre${carres[randomCarre - 1]}`
);

let intervalAddOpacity = setTimeout(function () {
  carreSelectionneParIA.style.opacity = 0.6;
  console.log(carreSelectionneParIA);
}, 1000);

let intervalRemoveOpacity = setTimeout(function () {
  carreSelectionneParIA.style.opacity = 1;
  console.log(carreSelectionneParIA);
}, 4000);
