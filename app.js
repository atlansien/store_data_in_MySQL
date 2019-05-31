const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const PORT = process.env.PORT || 8000;

app.set("view enjine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

const connection = mysql.createConnection({
  host: "us-cdbr-iron-east-02.cleardb.net",
  user: "b69e15cdb05a1e",
  password: "1fe6eae5",
  database: "heroku_43c9e0299d8e801"
});

app.get("/", (req, res) => {
  const createTable =
    "CREATE TABLE users (data VARCHAR(255) PRIMARY KEY,created_at TIMESTAMP DEFAULT NOW())";
  const q = "SELECT COUNT(*) AS count FROM users";
  connection.query(createTable, q, (err, results) => {
    if (err) throw err;
    const count = results[0].count;
    res.render("home", { count: count });
  });
});

app.get("/register", (req, res) => {
  const data = { data: req.body.data };
  const insert = `INSERT INTO users(data) SET ${data}`;
  connection.query(insert, (err, results) => {
    if (err) throw err;
    res.redirect("/");
  });
});

app.listen(PORT, () => console.log("Example app listening on port 3000!"));
