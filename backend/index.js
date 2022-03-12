const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan('combined'))

app.get("/", (req, res) => {
  res.send("Hallo");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
