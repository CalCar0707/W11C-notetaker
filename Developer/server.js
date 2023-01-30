//boilerplate
const express = require('express');
const path = require('path');

//uuid for generating a unique note id
const { v4: uuidv4 } = require('uuid');
uuidv4(); 

const database = require('./db/db.json');

const app = express();
const PORT = 3001;

//const notes = require('./public/notes.html');


//middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//add more in response
app.get('/', (req, res) => res.send('Navigate to /notes'));

// navigate to notes page
app.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, 'public/notes.html'))
);

//reads db.json file and returns as json
app.get('/api/notes', (req, res) =>
    res.json(database)
); 

//receives a new note to save on request body, add to db.json, and return new note to client
app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note.`);
  
    // Check if there is anything in the response body
    if (req.body && req.body.title) {
      response = {
        status: 'success',
        data: req.body,
      };
      res.json(`Note: ${response.data.title}, ${response.data.text} has been added!`);
    } else {
      res.json('Note must contain a title and text.');
    }
  
    // Log the response body to the console
    console.log(req.body);

});

//for loop for notes entered
// for(let i = 0; i < database.length; i++){

//}
// uuid for uniquie id for notes
//app.get('*', (req, res) => 
//res.sendFile(path.join(__dirname, 'public/index.html'))
//);

//listen at port
app.listen(PORT, () => 
    console.log(`Example app listening at http://localhost:${PORT}`)
);  