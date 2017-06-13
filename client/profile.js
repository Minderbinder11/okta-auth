//profile.js

var submit = document.getElementById('submit');

submit.addEventListener('click', (e) => { 
	
	axios.get('/profile').then(response => {
		console.log('response!!', response)
	});

}); 