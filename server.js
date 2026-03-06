const express = require("express");
const app = express();
const db = require("./database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(express.json());

const SECRET = "mysecretkey";

app.get("/", (req, res) => {
  res.send("Notes API running");
});


// REGISTER
app.post("/register", async (req, res) => {

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password required");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  db.run(
    "INSERT INTO users(username,password,role) VALUES(?,?,?)",
    [username, hashedPassword, "user"],
    function (err) {
      if (err) {
        return res.status(500).send("User creation failed");
      }

      res.send("User registered successfully");
    }
  );
});


// LOGIN
app.post("/login", (req, res) => {

  const { username, password } = req.body;

  db.get(
    "SELECT * FROM users WHERE username=?",
    [username],
    async (err, user) => {

      if (!user) {
        return res.status(401).send("User not found");
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.status(401).send("Invalid password");
      }

      const token = jwt.sign({ id: user.id }, SECRET);

      res.json({ token });

    }
  );
});


// CREATE NOTE
app.post("/notes", (req, res) => {

  const { title, content, user_id } = req.body;

  db.run(
    "INSERT INTO notes(title,content,user_id) VALUES(?,?,?)",
    [title, content, user_id],
    function (err) {

      if (err) {
        return res.status(500).send("Note creation failed");
      }

      res.send("Note created");

    }
  );

});


// GET NOTES
app.get("/notes", (req, res) => {

  db.all("SELECT * FROM notes", [], (err, rows) => {

    if (err) {
      return res.status(500).send("Error fetching notes");
    }

    res.json(rows);

  });

});


// DELETE NOTE
app.delete("/notes/:id", (req, res) => {

  const id = req.params.id;

  db.run(
    "DELETE FROM notes WHERE id=?",
    [id],
    function (err) {

      if (err) {
        return res.status(500).send("Delete failed");
      }

      res.send("Note deleted");

    }
  );

});


app.listen(3000, () => {
  console.log("Server running on port 3000");
});
