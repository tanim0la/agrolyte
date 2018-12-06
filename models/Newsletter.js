const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const NewsletterSchema = new Schema({
	newsletter: {
		type: String,
		required: true,
	},
});

module.exports = Newsletter = mongoose.model('newsletter', NewsletterSchema);
