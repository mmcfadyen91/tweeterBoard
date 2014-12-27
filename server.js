var express = require('express'),
	bodyParser = require('body-parser'),
	gutil = require ('gulp-util');

var	app = express(),
	port = 8888;

app.use(bodyParser.json());
app.engine('jade', require('jade').__express);
app.set('views', __dirname + '/public/assets/views')


app.use(require('./controllers/api/posts'));
app.use(require('./controllers/static'));

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public/assets/"));


app.listen(port, function() {
	gutil.log(gutil.colors.green("Listening on localhost:" + port));
})
