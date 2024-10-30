const express = require("express");
const app = express();
const port = 8080;

const cors = require("cors"); 

app.use(cors());

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

app.get("/cards", (req, res) => {
  res.json(DB);
});

app.get("/cards/:id", (req, res) => {
  const id = req.params.id;
  const card = DB.find((card) => card.id == id);
  res.json(card);
});

app.patch("/cards/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  let card = DB.find((card) => card.id === id);
  if (!card) {
    return res.status(404).send({ error: "card not found" });
  }
  card = {
    ...card,
    ...req.body,
  };
  DB = DB.map((item) => (item.id === id ? card : item));
  res.json(card);
});

app.delete("/cards/:id", (req, res) => {
  const id = req.params.id;
  let index = DB.findIndex((card) => card.id == id);
  if (index !== -1) {
    DB.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send({ error: "card not found" });
  }
});

app.post("/cards", (req, res) => {
  const card = {
    id: req.body.id,
    text: req.body.text,
    background: req.body.background,
  };
  DB.push(card);
  res.json(card);
});

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
