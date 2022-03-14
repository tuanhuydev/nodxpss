const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const sass = require('sass');
const helmet = require('helmet');
const { v4: uuidv4 } = require('uuid');

const labRoutes = require('./src/routes/lab');
const apiRoutes = require('./src/routes/api');
const { credentials } = require('./src/configs/constants');
require('./src/services/terminal');

// App config
const app = express();


// Helmet for SEO purpose
app.use(helmet());

// Parse http request's body with bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Manage session in application
app.use(session({
	secret: credentials.sessionSecret,
	resave: false,
	saveUninitialized: true,
	genid: function(req) {
		return uuidv4() // use UUIDs for session IDs
	},
	cookie: { 
		httpOnly: true,
		secret: credentials.cookieSecret,
	}
}));

// Setup view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/views'));

// Setup Static directory
app.use(express.static(path.join(__dirname, 'public')));


// Setup sass for stylesheets
// TODO: Able to load multiple stylesheets
sass.compileAsync(path.join(__dirname, 'src/stylesheets/pages/lab.scss'))
.then(({ css }) => {
	fs.writeFile(path.join(__dirname, 'public/stylesheets/pages/lab.css'), css, (err) => {
		if(err) {
			console.log(err);
		}
	});
})
.catch((err) => console.log(err));

// Routing
app.use('/lab', labRoutes);
app.use('/api', apiRoutes);

// Force custom internal error page.
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Something broke!')
});

app.listen(3000, function() {
	console.log("App is running on port 3000");
});
