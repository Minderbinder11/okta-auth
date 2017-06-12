//index.js

var username = document.getElementById('username');
var password = document.getElementById('password');
var button = document.getElementById('submit');

button.addEventListener('click', () => {

  axios.get('/login')
  .then(response => {
    console.log('in respnse: ', response);
  });

});      
