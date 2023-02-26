const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/User.route");
require("dotenv").config();
const cors = require("cors");
const passport = require("passport");
const passportSetup = require("./passport");
const authRoute = require("./routes/auth");
const cookieSession = require("cookie-session");

const app = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/auth", authRoute);

app.use(
  cookieSession({
    name: "session",
    keys: ["cyberwolve"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Home Page");
});

app.use("/users", userRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to the DB");
  } catch (err) {
    console.log("Trouble connecting to the DB");
    console.log(err);
  }
  console.log(`Running at ${process.env.port} Port`);
});
