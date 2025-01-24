const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const connectToDB = require("./config/db");
connectToDB();
const path = require('path')
const userRouter = require("./routes/user.routes");
const homeRouter = require("./routes/home.routes");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.use(express.static("public"));

// app.use('/public', express.static(path.join(__dirname, 'public')))

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRouter);
app.use("/user", userRouter);

app.listen(port, () => {
	console.log(`server is running at port: http://localhost:${port}/`);
});
