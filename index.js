// implement your API here
const express = require('express');
const db = require('./data/db.js');

const server = express();

//Parse JSON from body
server.use(express.json());

// GET USERS Returns array of all user objects contained inside db.
server.get('/api/users', (req, res) => {
    db.find()
        .then(hubs => {
            res.status(200).json(hubs)
        })
        .catch(error => {
            req.cancel(error);
            res.status(500).json({ message: "The user with the specified ID does not exist." })
        })
})


// POST REQUEST



//Set up port
const port = 3333;
server.listen(port, () => console.log(`\n API running on port ${port}\n`))