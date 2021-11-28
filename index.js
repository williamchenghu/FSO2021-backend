require('dotenv').config();
const express = require('express');

const app = express();
const cors = require('cors');
const morgan = require('morgan');
const Person = require('./models/person');

morgan.token('reqJSON', (req) => JSON.stringify(req.body));

const PORT = process.env.PORT || 3001;

app.use(express.static('build'));
app.use(express.json());
app.use(cors());
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :reqJSON'
  )
);

app.get('/info', (req, res) => {
  Person.find({}).then((result) =>
    res.send(
      `<div><p>Phone book has info for ${result.length}
       people</p><p>${Date()}</p></div>`
    )
  );
});

app.get('/api/persons', (req, res) =>
  Person.find({}).then((result) => res.json(result))
);

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((result) => {
      if (result) {
        res.json(result);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => next(err));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(res.status(204).end())
    .catch((err) => next(err));
});

app.post('/api/persons', (req, res, next) => {
  const newPerson = new Person({
    name: req.body.name,
    number: req.body.number
  });

  newPerson
    .save()
    .then((savedResult) => savedResult.toJSON())
    .then((savedAndFormattedResult) => res.json(savedAndFormattedResult))
    .catch((err) => next(err));
});

app.put('/api/persons/:id', (req, res, next) => {
  const updatePerson = {
    name: req.body.name,
    number: req.body.number
  };

  Person.findByIdAndUpdate(req.params.id, updatePerson, {
    new: true,
    runValidators: true,
    context: 'query'
  })
    .then((updatedResult) => res.json(updatedResult))
    .catch((err) => next(err));
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ err: 'unknown endpoint' });
};
app.use(unknownEndpoint);

const errorHandler = (err, req, res, next) => {
  console.log(`errorHandler`, err.message);

  if (err.name === 'CastError') {
    return res.status(400).send({ err: 'malformatted id' });
  }
  if (err.name === 'ValidationError') {
    return res.status(400).json({ err: err.message });
  }

  return next(err);
};
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
