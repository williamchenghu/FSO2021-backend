/* eslint-disable no-underscore-dangle */
require('dotenv').config();
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URI;
console.log(`connecting to`, url);

mongoose
  .connect(url)
  .then(() => console.log(`connected to MongoDB`))
  .catch((error) => console.log(`error connecting to MongoDB:`, error.message));

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 50
  },
  number: {
    type: String,
    required: true,
    unique: true,
    minLength: 8,
    maxLength: 50
  }
});
personSchema.plugin(uniqueValidator);

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    const formattedReturnedObject = {
      id: returnedObject._id.toString(),
      ...returnedObject
    };
    delete formattedReturnedObject._id;
    delete formattedReturnedObject.__v;
    return formattedReturnedObject;
  }
});

module.exports = mongoose.model('Person', personSchema);
