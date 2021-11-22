const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

morgan.token("reqJSON", (req) => JSON.stringify(req.body));

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :reqJSON"
  )
);
app.use(express.json());
app.use(express.static("build"));

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/info", (req, res) => {
  res.send(
    `<div><p>Phone book has info for ${
      persons.length
    } people</p><p>${Date()}</p></div>`
  );
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((e) => e.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((e) => e.id !== id);
  res.status(204).end();
});

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((e) => e.id)) : 0;
  return maxId + 1;
};

app.post("/api/persons", (req, res) => {
  const body = req.body;
  const name = persons.find((e) => e.name === body.name);
  if (name) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "name or number is missing",
    });
  }
  const person = {
    // id: Math.random(),
    id: generateId(),
    name: body.name,
    number: body.number,
  };
  persons = persons.concat(person);
  res.json(person);
});

app.put("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = {
    id: id,
    name: req.body.name,
    number: req.body.number,
  };
  const existingPerson = persons.find((e) => e.id === id);
  if (existingPerson) {
    persons = persons.filter((e) => e.id !== id).concat(person);
    res.json(person);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
