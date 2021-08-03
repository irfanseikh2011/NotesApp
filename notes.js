const fs = require("fs");
const chalk = require("chalk");

const addNotes = function (title, body) {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });

    saveNotes(notes);
    console.log(chalk.green.inverse("Note has been added!"));
  } else {
    console.log(
      chalk.red.inverse("Title is already Taken! Choose another title.")
    );
  }
};

const removeNotes = function (title) {
  const notes = loadNotes();
  const notesToKeep = notes.filter(function (note) {
    return note.title !== title;
  });

  if (notes.length > notesToKeep.length) {
    console.log(chalk.green.inverse("Note removed!"));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.red.inverse("No note found!"));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  notes.forEach((element, i) => {
    console.log(
      chalk.green.inverse(i + 1 + ": " + element.title + " - " + element.body)
    );
  });
};

const readNotes = (title) => {
  const notes = loadNotes();
  const titleFound = notes.find((note) => note.title === title);

  if (titleFound) {
    console.log(chalk.blue.bold.inverse(titleFound.body));
  } else {
    console.log(chalk.red.bold.inverse("No Title Found..!!"));
  }
};

const saveNotes = function (notes) {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = function () {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const data = dataBuffer.toString();
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
};

module.exports = {
  addNotes: addNotes,
  readNotes: readNotes,
  removeNotes: removeNotes,
  listNotes: listNotes,
  readNotes: readNotes,
};
