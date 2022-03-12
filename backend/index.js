const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('combined'))

app.get("/", (req, res) => {
  res.send("Hallo test");
});

app.post("/boafrm/formNoticeRegister", (req, res) => {
    console.log(req.body)
    res.send("okay")
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
