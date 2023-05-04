const mongoose = require("mongoose");//connect database mongodb likha moongooes
const jwt = require("jsonwebtoken");// token generation 
const Joi = require("joi");// check karta hia ki pattern shi hai nahi inputs ke 
const passwordComplexity = require("joi-password-complexity");// check karta hia ki pattern shi hai nahi inputs ke sirf password pattern check m use hota hia

const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	photo: Buffer,
});
// database m kis tarah save hoga

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};
// token generate ke liye use ho rha jiske token ke under database ki json ki id hai jo unique id hai

const User = mongoose.model("user", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data); //validate user schema  validation
};

module.exports = { User, validate };
