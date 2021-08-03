const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes");

yargs.command({
  command: "add",
  describe: "To add a Note",
  builder: {
    title: {
      describe: "The title of the note",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "The body of the note",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    notes.addNotes(argv.title, argv.body);
  },
});

yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    notes.removeNotes(argv.title);
  },
});

yargs.command({
  command: "list",
  description: "To list out all the notes",
  handler: function () {
    console.log(chalk.grey.inverse("Your Lists are as follows: "));
    notes.listNotes();
  },
});

yargs.command({
  command: "read",
  description: "To read the notes",
  handler: function () {
    console.log("Reading the notes..");
  },
});

yargs.parse();
