require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const Person = require("./models/person");

morgan.token("reqJSON", (req) => JSON.stringify(req.body));

const PORT = process.env.PORT || 3001;

app.use(express.static("build"));
app.use(express.json());
app.use(cors());
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :reqJSON"
  )
);

// let persons = [
//   {
//     id: 1,
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: 2,
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: 3,
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: 4,
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
// ];

app.get("/info", (req, res) => {
  Person.find({}).then((result) =>
    res.send(
      `<div><p>Phone book has info for ${
        result.length
      } people</p><p>${Date()}</p></div>`
    )
  );
});

app.get("/api/persons", (req, res) =>
  Person.find({}).then((result) => res.json(result))
);

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id)
    .then((result) => {
      if (result) {
        res.json(result);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      console.log(`error at finding by id:`, error.message);
      res.status(400).send({ error: "malformatted id" });
    });
});

// app.delete("/api/persons/:id", (req, res) => {
//   const id = Number(req.params.id);
//   persons = persons.filter((e) => e.id !== id);
//   res.status(204).end();
// });

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (body.name && body.number === undefined) {
    return res
      .status(400)
      .json({ error: "person info to be saved are incomplete." });
  }

  const newPerson = new Person({
    name: body.name,
    number: body.number,
  });

  newPerson.save().then((savedPerson) => res.json(savedPerson));
});

// app.put("/api/persons/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const person = {
//     id: id,
//     name: req.body.name,
//     number: req.body.number,
//   };
//   const existingPerson = persons.find((e) => e.id === id);
//   if (existingPerson) {
//     persons = persons.filter((e) => e.id !== id).concat(person);
//     res.json(person);
//   }
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
