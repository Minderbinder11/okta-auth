// nodeSessions.js
import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import morgan from 'morgan';

var app = express();
app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({
	secret: 'mysecretkey',
	saveUninitialized: true,
	resave: true,
	cookie: {
		maxAge: 60000
	}
}));

app.get('/', function (req, res, next) {

	if(req.session.views) {
		console.log('Session', req.session)
		req.session.views ++;
		res.setHeader('Content-Type', 'text/html');
		res.write('<p>Views: ' + req.session.views + '</p>');
		res.write('<p>Expires in: ' + req.session.cookie.maxAge/1000 + 's</p>');
		res.end();
	} else {
		req.session.views = 1;
		res.end('Refresh Page');
	}

});

app.listen(1234, function() {
	console.log('server started');
})