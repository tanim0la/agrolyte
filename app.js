const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');

const app = express();

const db = require('./config/keys').mongoURI;
const contact = require('./routes/api/contact');
const newsletter = require('./routes/api/newsletter');

//connect db
mongoose
	.connect(
		db,
		{ useNewUrlParser: true }
	)
	.then(() => console.log('MongoDB is Connected...'))
	.catch(err => console.log(err));

// view engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout: 'layout' }));
app.set('view engine', 'handlebars');

// Bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Express validator
app.use(
	expressValidator({
		errorFormatter: function(param, msg, value) {
			var namespace = param.split('.'),
				root = namespace.shift(),
				formParam = root;

			while (namespace.length) {
				formParam += '[' + namespace.shift() + ']';
			}
			return {
				param: formParam,
				msg: msg,
				value: value,
			};
		},
	})
);

// routes
app.use('/', contact);
app.use('/newsletter', newsletter);

// Set port
const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server started on port ${port}`));
