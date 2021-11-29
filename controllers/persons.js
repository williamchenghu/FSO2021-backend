const personsRouter = require('express').Router();
const Person = require('../models/person');

// personsRouter.get('/info', (req, res) => {
//   Person.find({}).then((result) =>
//     res.send(
//       `<div><p>Phone book has info for ${result.length}
//          people</p><p>${Date()}</p></div>`
//     )
//   );
// });

personsRouter.get('/', (req, res) =>
  Person.find({}).then((result) => res.json(result))
);

personsRouter.get('/:id', (req, res, next) => {
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

personsRouter.delete('/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch((err) => next(err));
});

personsRouter.post('/', (req, res, next) => {
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

personsRouter.put('/:id', (req, res, next) => {
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

module.exports = personsRouter;
