const mongoose = require("mongoose");

module.exports = () => {
	const connectionParams = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}; //connections
	try {
		mongoose.connect(process.env.DB, connectionParams);//database ki value kya hai jaise altas local pe hai konsa database connected
		console.log("Connected to database successfully");
	} catch (error) {
		console.log(error);
		console.log("Could not connect database!");
	}
};
