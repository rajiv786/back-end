const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
	try {
		const { error } = validate(req.body);//input schema validation
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email }); //email check in data
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));//salt ek library jo use hoti hai to create a number in whcih password is saved 
		const hashPassword = await bcrypt.hash(req.body.password, salt);//hash form password save

		await new User({ ...req.body, password: hashPassword }).save();//sari value name email ,password save database jati hai
		res.status(201).send({ message: "User created successfully" });//user successful login 
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
