const loginBody = document.querySelector('.login-body');
const homeBody = document.querySelector('.home-body');
const loginButton = document.querySelector('.login-button');

if (sessionStorage.user == undefined) {
  loginBody.style.display = 'flex';
  homeBody.style.display = 'none';
} else {
  loginBody.style.display = 'none';
  homeBody.style.display = 'block';
}

loginButton.addEventListener('click', function () {
  loginBody.style.display = 'none';
  homeBody.style.display = 'block';
  sessionStorage.setItem('user', document.getElementById('nomJoueur').value);
});
