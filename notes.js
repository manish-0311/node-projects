
const yarg = require('yargs');
const fs = require('fs');
const chalk = require("chalk");



// Add-note Command
yarg.command({
	command: 'add',
	describe: 'add a new note',
	builder: {
		title: {
			describe: 'Title of note',
			demandOption: true,
			type: 'string'	
		},
		body: {
			describe: 'Body of note',
			demandOption: true,
			type: 'string'
		}
	},

	// Function for add-note command
	handler(argv) {

		fs.readFile('notes.json', 'utf8',(err, data) => {
			if (err){
				console.log(err);
			} else {
				const notes = JSON.parse(data); 
				//check if the notes.json already has the same title
				let searchField = "title";
				let searchVal = argv.title;
				let titleFound = false;
				for (let i=0 ; i < notes.length ; i++)
				{	
					//Check whether the note title already exists
					if (notes[i][searchField].toUpperCase() == searchVal.toUpperCase()) {
						titleFound = true;
						console.log(chalk.bold.red("Title already taken!"));
						break;
					}
				}
				if (titleFound == false) {
					notes.push({
						"title": argv.title,
						"body": argv.body
					}); 
					const json = JSON.stringify(notes); //convert it back to string

					// //writing new note to notes.json file
					fs.writeFile('notes.json', json, 'utf8',() => {
						console.log("New note added");
					});
				}


			}
		});
	}
});

// Remove-note Command
yarg.command({
	command: 'remove',
	describe: 'remove a note',
	builder: {
		title: {
			describe: 'Title of note',
			demandOption: true,
			type: 'string'	
		}
	},

	// Function for remove-note command
	handler(argv) {

		fs.readFile('notes.json', 'utf8',(err, data) => {
			if (err){
				console.log(err);
			} else {
				const notes = JSON.parse(data); 
				
				let searchField = "title";
				let searchVal = argv.title;
				let titleFound = false;
				for (let i=0 ; i < notes.length ; i++)
				{	
					//check whether the note tobe removed exists in the file
					if (notes[i][searchField].toUpperCase() == searchVal.toUpperCase()) {
						titleFound = true;
						// delete notes[i];
						notes.splice(i,1);
						console.log(i,searchVal);
						
						const json = JSON.stringify(notes); //convert it back to string

						// //writing new note to notes.json file
						fs.writeFile('notes.json', json, 'utf8',() => {
							console.log("Note removed.")
						});
						break;
					}
				}
				if (titleFound == false) {
					console.log(chalk.bold.red("Note not found."))
				}
			}
		});
		
	}
});

//List-notes command
yarg.command({
	command: 'list',
	describe: 'list all note-titles',
	
	
	// Function for list-notes command
	handler(argv) {
		
		
		fs.readFile('notes.json', 'utf8',(err, data) => {
			if (err){
				console.log(err);
			} else {
				const notes = JSON.parse(data); 
				
				console.log(chalk.bgRed.black("List of all Notes :"))
				for (let i=0 ; i < notes.length ; i++)
				{	
					console.log(notes[i].title);
				}
			}
		});


	}
});


// Read-note command
yarg.command({
	command: 'read',
	describe: 'read a note',
	builder: {
		title: {
			describe: 'Title of note',
			demandOption: true,
			type: 'string'	
		}
	},

	// Function for read-note command
	handler(argv) {
		fs.readFile('notes.json', 'utf8',(err, data) => {
			if (err){
				console.log(err);
			} else {
				const notes = JSON.parse(data); 
				
				let titleFound = false;
				for (let i=0 ; i < notes.length ; i++)
				{	
					//check whether the note tobe removed exists in the file
					if (notes[i].title.toUpperCase() == argv.title.toUpperCase()) {
						titleFound = true;
						
						console.log(chalk.bgYellow.black(notes[i].title));
						console.log(notes[i].body);
					}
				}
				if (titleFound == false) {
					console.log(chalk.red("Note not found."));
				}
			}
		});
		
	}
});



yarg.parse() 


