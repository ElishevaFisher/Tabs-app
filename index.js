const express = require("express");
const app = express();
const port = 8080;

let DB = [
  {
    id: 0,
    text: "Text a",
    background: "green",
  },
  {
    id: 1,
    text: "Text b",
    background: "blue",
  },
  {
    id: 2,
    text: "Text c",
    background: "purple",
  },
  {
    id: 3,
    text: "Text d",
    background: "orange",
  },
];

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = DB.find((user) => user.id == id);
  res.json(user);
});

app.patch("/users/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  let user = DB.find((user) => user.id === id);
  if (!user) {
    return res.status(404).send({ error: "User not found" });
  }
  user = {
    ...user,
    ...req.body,
  };
  DB = DB.map((item) => (item.id === id ? user : item));
  res.json(user);
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  let index = DB.findIndex((user) => user.id == id);
  if (index !== -1) {
    DB.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send({ error: "user not found" });
  }
});

app.post("/users", (req, res) => {
  const user = {
    id: DB.length + 1,
    text: req.body.text,
    background: req.body.background,
  };
  DB.push(user);
  res.json(user);
});

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
