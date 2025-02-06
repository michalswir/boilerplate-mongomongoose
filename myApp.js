require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
});
const Person = mongoose.model("Person", personSchema);


const createAndSavePerson = (person, done) => {
  person.save(person, (err, data) => {
    if (err) return console.error(err);
    done(null, data)
  });
};

// const person = new Person({ name: 'adamNEW', age: 30, favoriteFoods: ["pizza", "kebab"] });
// createAndSavePerson(person, (err, data) => {
//   if (err) {
//     console.error("Błąd podczas zapisu:", err);
//   } else {
//     console.log("Osoby zapisane do bazy:", data);
//   }
// });

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.error(err);
    done(null, data)
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return console.error(err);
    done(null, data)
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return console.error(err);
    done(null, data)
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return console.error(err);
    done(null, data)
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if (err) return console.error(err);
    person.favoriteFoods.push(foodToAdd);
    person.save((err, data) => {
      if (err) return console.error(err);
      done(null, data)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, (err, data) => {
    if (err) return console.error(err);
    done(null, data)
  })
};

// findAndUpdate("adam23", (err, data) => {
//   if (err) {
//     console.error("Błąd:", err);
//   } else {
//     console.log("Wynik:", data);
//   }
// });

const removeById = (personId, done) => {
  Person.findOneAndRemove({ _id: personId }, (err, data) => {
    if (err) return console.error(err);
    done(null, data)
  })
};

// removeById("67a51cc155c0c911004dddd7", (err, data) => {
//   if (err) {
//     console.error("Błąd:", err);
//   } else {
//     console.log("Wynik:", data);
//   }
// });

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, data) => {
    if (err) return console.error(err);
    done(null, data)
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch }).sort({ name: 'asc' }).limit(2).select('-age').exec((err, data) => {
    if (err) return console.error(err);
    done(null, data)
  })
};

// queryChain((err, data) => {
//   if (err) {
//     console.error("Błąd:", err);
//   } else {
//     console.log("Wynik:", data);
//   }
// });






//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
