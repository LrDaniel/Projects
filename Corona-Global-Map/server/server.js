const express = require("express");
require("dotenv").config();
const knex = require("knex");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const app = express();
const path = require("path");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const db = knex({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false },
  },
});

app.post("/register", async (req, res) => {
  (username = req.body.username),
    (password = await bcrypt.hash(req.body.password, 10)),
    (email = req.body.email),
    (name = req.body.name),
    db("users")
      .insert({
        username: username,
        password: password,
        email: email,
        name: name,
      })
      .then(() => {
        res.send({ created: "Account created successfuly" });
      })
      .catch((err) => {
        if (err.code == 23505) {
          res.send({ error: "Username or email already exists" });
        }
      });
});
app.post("/login", (req, res) => {
  db("users")
    .select("*")
    .where({ email: req.body.usernameemail })
    .orWhere({ username: req.body.usernameemail })
    .then(async (data) => {
      const match = await bcrypt.compare(req.body.password, data[0].password);
      console.log(data);
      console.log(match);
      if (match) {
        if (data.length > 0) {
          res.json({
            msg: "Login was successful",
            name: data[0].name,
            userid: data[0].id,
          });
        } else {
        }
      }
    })

    .catch((err) => {
      res.json({ err: "Invalid credentials" });
    });
});

const insertFav = async (obj) => {
  try {
    const data = await db("favorites")
      .insert({
        country: obj.country,
        user_id: obj.user_id,
      })
      .returning("*");
    return data;
  } catch (error) {
    return 102;
  }
};

app.post("/favorites", (req, res) => {
  const insert = insertFav(req.body);
  insert.then((data) => {
    res.json({ msg: data });
  });
});

app.post("/isfav", (req, res) => {
  db("favorites")
    .select("*")
    .where({
      country: req.body.country,
      user_id: req.body.user_id,
    })
    .returning("*")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json({ msg: err });
    });
});

app.post("/delfav", (req, res) => {
  db("favorites")
    .del()
    .where({
      country: req.body.country,
      user_id: req.body.user_id,
    })
    .returning("*")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json({ msg: err });
    });
});
app.post("/delall", (req, res) => {
  db("favorites")
    .del()
    .where({
      user_id: req.body.user_id,
    })
    .returning("*")

    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json({ msg: err });
    });
});

app.post("/singledel", (req, res) => {
  db("favorites")
    .del()
    .where({
      country: req.body.country,
    })
    .returning("*")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json({ msg: err });
    });
});

app.get("/favorites/:id", (req, res) => {
  db("favorites")
    .select("user_id", "country")
    .where({ user_id: req.params.id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});

app.listen(process.env.PORT, () => {
  console.log(`listen on port  ${process.env.PORT}`);
});

app.use("/", express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
