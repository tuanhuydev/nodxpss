const express = require('express'); 

const app = express();

app.get('/', function(req, res) {
	res.end('App is running');
});

app.listen(3000, function() {
	console.log("App is running on port 3000");
});
