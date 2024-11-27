const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");

const port = 8080;

// app.use((req, res, next) => {
//   let { query } = req.query;
//   //   console.log(query);
//   console.log("I am a middleware");
//   next();
// });
// app.use((req, res, next) => {
//   let { query } = req.query;
//   //   console.log(query);
//   console.log("I am a  2nd middleware");
//   next();
// });

// utility middleware

// app.use((req, res, next) => {
//   req.time = new Date(Date.now());
//   console.log(req.method, req.path, req.hostname, req.time);
//   next();
// });

let arr = [1, 2, 3];
arr.sayHello = () => {
  console.log("Asslam O Alaikum");
};

const checkToken = (req, res, next) => {
  let { token } = req.query;
  if (token === "givenaccess") {
    next();
  }
  throw new ExpressError(401, "Access Denied");
};

app.get("/api", checkToken, (req, res) => {
  res.send("Data");
});

app.get("/", (req, res) => {
  res.send(`index route is working`);
});

app.get("/err", (req, res) => {
  abcd = abcd;
});

app.get("/admin", (req, res) => {
  throw new ExpressError(403, "Admin is forbidden");
});

app.use((err, req, res, next) => {
  let { status = 500, message = "some error occured" } = err;
  res.status(status).send(message);

  // console.log(`-------ERROR-------`);
  // res.send(err);
  next(err);
});

// app.use("/err", (req, res) => {});

app.listen(port, () => {
  console.log(`app is listening on port: ${port}`);
});
