//boilerplate
//const { response } = require('express');
const express = require('express');
const path = require('path');
const fs = require('fs');

//uuid for generating a unique note id
const { v4: uuidv4 } = require('uuid');


const database = require('./db/db.json');

const app = express();
const PORT = 3001;

//const notes = require('./public/notes.html');


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(express.static('public'));

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
    console.info(`${req.method} request received to add a newnote.`);
  
    const {title, text} = req.body;

    if(title && text ) {
        
        const newNote = {
            title,
            text,
            review_id: uuidv4(),
        };
        
        
        fs.readFile('./db/db.json', 'utf8', (error, data) => {
            const parsedNotesArray = data ? JSON.parse(data) : [];
            const notes = parsedNotesArray || [];
    

        notes.push(newNote);

        // Convert the data to a string so we can save it
        const noteString = JSON.stringify(notes);


                // Write the string to a file-- COPY PASTE HAVE NOT WORKED ON
            fs.writeFile('./db/db.json', noteString, (err) =>
                err
                 ? console.error(err)
                : console.log(
                  `Note for ${newNote.title} has been written to JSON file`

        )
  );
            

        const response = {
            status: 'success',
            body: newNote,
        };

        //res.json(`Note: ${response.body.title}, ${response.body.text} has been added!`);
        res.status(201).json(response);
    })
        } else {
            res.status(500).json('Note must contain a title and text.');
        
    }
    
    // Log the response body to the console
    //console.log(res);

});



//listen at port
app.listen(PORT, () => 
    console.log(`Example app listening at http://localhost:${PORT}`)
);  