const loginBody = document.querySelector('.login-body');
const homeBody = document.querySelector('.home-body');
const loginButton = document.querySelector('.login-button');
const loginJoueur = document.querySelector('#nomJoueur');

loginBody.addEventListener(
  'keyup',
  (event) => {
    event.preventDefault();
    console.log(event.keyCode);
    if (event.keyCode === 13) {
      console.log(event.keyCode);
      loginBody.style.display = 'none';
      homeBody.style.display = 'block';
      sessionStorage.setItem(
        'user',
        document.getElementById('nomJoueur').value
      );
    }
  },
  false
);

loginButton.addEventListener('click', function () {
  loginBody.style.display = 'none';
  homeBody.style.display = 'block';
  sessionStorage.setItem('user', document.getElementById('nomJoueur').value);
});
