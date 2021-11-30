const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 50,
  },
  number: {
    type: String,
    required: true,
    unique: true,
    minLength: 8,
    maxLength: 50,
  },
});
personSchema.plugin(uniqueValidator);

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    const formattedReturnedObject = {
      id: returnedObject._id.toString(),
      ...returnedObject,
    };
    delete formattedReturnedObject._id;
    delete formattedReturnedObject.__v;
    return formattedReturnedObject;
  },
});

module.exports = mongoose.model('Person', personSchema);
