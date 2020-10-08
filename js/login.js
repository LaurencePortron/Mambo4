const loginBody = document.querySelector('.login-body');
const homeBody = document.querySelector('.home-body');
const loginButton = document.querySelector('.login-button');
const loginJoueur = document.querySelector('#nomJoueur');

loginJoueur.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    console.log(document.getElementById('nomJoueur').value);
    // loginBody.style.display = 'none';
    // homeBody.style.display = 'block';
    // sessionStorage.setItem('user', document.getElementById('nomJoueur').value);
  }
});

loginButton.addEventListener('click', function () {
  loginBody.style.display = 'none';
  homeBody.style.display = 'block';
  sessionStorage.setItem('user', document.getElementById('nomJoueur').value);
});
