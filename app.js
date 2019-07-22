const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const PORT = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

const connection = mysql.createConnection({
  host: "us-cdbr-iron-east-02.cleardb.net",
  user: "b0726f03963300",
  password: "93222f79",
  database: "heroku_08b6de1878e7653"
});

app.get("/", (req, res) => {
  const q = "SELECT COUNT(*) AS count FROM users";
  connection.query(q, (err, results) => {
    if (err) throw err;
    const count = results[0].count;
    res.render("home", { count: count });
  });
});

app.post("/register", (req, res) => {
  const data = { data: req.body.data };
  const insert = 'INSERT INTO users SET ?';
  connection.query(insert, data, (err, results) => {
    if (err) throw err;
    res.redirect("/");
  });
});

app.listen(PORT);
