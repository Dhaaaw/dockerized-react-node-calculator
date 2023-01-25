const express = require("express");
const cors = require("cors");
const path = require("path");
const calculate = require("./calculator");

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static(path.join(__dirname, "../calculator_client/build")));

app.post('/calculator', (req, res) => {
    let result = calculate(req.body.equation.split(""));
  if (result === "Error") res.status(500).send({ result });
  else {
    res.status(200).send({ result });
    }
});

app.get("/*", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "../calculator_client", "build", "index.html")
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;