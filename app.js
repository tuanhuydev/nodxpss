const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const labRoutes = require('./src/routes/lab');
const sass = require('sass');

// App config
const app = express();
// body parser to handle POST request
app.use(bodyParser.urlencoded({ extended: true }));

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

app.post('/newsletter-signup', function(req, res) {
	console.log(req.body);
});

app.listen(3000, function() {
	console.log("App is running on port 3000");
});
