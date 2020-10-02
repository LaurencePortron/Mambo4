const login = document.querySelector('.current-login');
const currentLogin = login.innerHTML;

if (currentLogin === 'anonymous') {
  const promptLogin = prompt('Enter your name');
  login.innerText = promptLogin;
} else {
  null;
}
