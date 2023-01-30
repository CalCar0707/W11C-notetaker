//boilerplate
const express = require('express');
const path = require('path');

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

app.get('/api/notes', (req, res) =>
    res.json(database)
); 

//app.get('*', (req, res) => 
//res.sendFile(path.join(__dirname, 'public/index.html'))
//);

//listen at port
app.listen(PORT, () => 
    console.log(`Example app listening at http://localhost:${PORT}`)
);  