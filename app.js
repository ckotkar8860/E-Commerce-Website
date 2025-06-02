const express = require("express");
const session = require('express-session');
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const flash = require("connect-flash");
const adminsRouter = require("./routes/adminsRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");
const indexRouter = require("./routes/indexRouter");

require("dotenv").config();

const db = require("./config/mongoose-connection");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET || 'fallback-secret',
  resave: false,
  saveUninitialized: true
}));

app.use(flash());

app.use("/", indexRouter);
app.use("/admins", adminsRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on PORT ${port}`);
});

