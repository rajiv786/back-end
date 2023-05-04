require("dotenv").config(); //enviromentals connect karne ke liye
const express = require("express"); //express server on karne ke liye 
const app = express(); //express ko call karne ke liye 
const cors = require("cors");
const connection = require("./db"); //to connect the data base from db file 
const userRoutes = require("./routes/users"); //router manlo maine index.js ke bajaye api kahi aur likhi hai to file ka path jo hoga wo likha jayega require wo same chaiye as filename jasie user.js means user.js kaha rakhi hai
const authRoutes = require("./routes/auth");
const rajiv = require('./routes/rajiv');
const Payment=require('./routes/Payment')
const aws=require('./routes/aws')
// database connection call kiya hai
connection(); 

// middlewares
app.use(express.json());
app.use(cors()); //manlo meri apu hai 5000 pe mera front-end 3000 lekin port alag alag agar jab bhi port alag ho aur muje connect karna ho to use hota cors

// routes
app.use(`/api/users`, userRoutes);
app.use(`/api/auth`, authRoutes); // oath- jo inverted comma m hai usme kuch bhi de dedo lekin jo comma ke baad wo naam same aayega jo tumne upar const m likha hia
app.use('/api/rajiv', rajiv);
app.use('/api/payment', Payment);
app.use('/api/aws', aws);
const PORT=process.env.PORT||3001
app.listen(PORT, () => {
	console.log("Server started on port 3000",`${PORT}`);
  });
