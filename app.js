const express = require("express");
const app = express();

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

const checkToken = (req, res, next) => {
  let { token } = req.query;
  if (token === "givenaccess") {
    next();
  } else {
    res.send("access Denied");
  }
};

app.get("/api", checkToken, (req, res) => {
  res.send("Data");
});

app.get("/", (req, res) => {
  res.send(`index route is working`);
});
app.listen(port, () => {
  console.log(`app is listening on port: ${port}`);
});
