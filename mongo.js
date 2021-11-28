const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  );
  process.exit(1);
}

const dbPass = process.argv[2];
const newPersonName = process.argv[3];
const newPersonNumber = process.argv[4];

const url = `mongodb+srv://fullstack_2021:${dbPass}@cluster0.cx6st.mongodb.net/phonebookEntryDatabase?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model('Person', personSchema);

const person = new Person({
  name: newPersonName,
  number: newPersonNumber
});

if (newPersonName && newPersonNumber) {
  person.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((result) => {
    console.log(`phonebook:`);
    result.forEach((e) => console.log(`${e.name} ${e.number}`));
    mongoose.connection.close();
  });
}
