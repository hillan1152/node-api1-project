// implement your API here
const express = require('express');
const db = require('./data/db.js');

const server = express();

//Parse JSON from body
server.use(express.json());


// POST REQUEST Create user using the info sent inside the request body
server.post('/api/users', (req, res) => {
    const dbData = req.body;

    if(!dbData.name || !dbData.bio){
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
    db.insert(dbData)
        .then(thing => {
            res.status(201).json(thing);
        })
        .catch(error => {
            res.status(500).json({ error: "The users information could not be retrieved." })
        })}
})



// GET USERS Returns array of all user objects contained inside db.
server.get('/api/users', (req, res) => {
    db.find()
        .then(hubs => {
            res.status(200).json(hubs)
        })
        .catch(error => {
            res.status(500).json({ error: "The users information could not be retrieved." })
        })
})

// GET Users based on specified ID.
server.get('/api/users/:id', (req, res) => {
    const id = req.params.id
    db.findById(id)
        .then(thing => {
            if(thing){
                res.status(200).json(thing)
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The user information could not be retrieved." })
        })
})

// DELETE Removes the user with the specified id and returns deleted user.
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id

    db.remove(id)
        .then(removed => {
            if(removed){
                res.status(202).json({ message: "Removed Successfully"})
        }   else {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
        }})
        .catch(error => {
            res.status(500).json({ error: "The user could not be removed" })
        })
})


//Set up port
const port = 3333;
server.listen(port, () => console.log(`\n API running on port ${port}\n`))