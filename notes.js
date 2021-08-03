const fs = require("fs");
const chalk = require("chalk");

const addNotes = function (title, body) {
  const notes = readNotes();
  const duplicateNotes = notes.filter((note) => note.title === title);

  if (duplicateNotes.length === 0) {
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
  const notes = readNotes();
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

const saveNotes = function (notes) {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const readNotes = function () {
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
};
