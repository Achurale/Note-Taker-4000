// Import modules
const express = require('express')
const fs = require('fs');
const path = require('path')
const {v4: uuidv4} = require('uuid')
// Initialize express router
const router = express.Router();
// Database pathing
const notesPath = path.join(__dirname, '../db/db.json');



// API routes
router.get('/api/notes', (req, res) => {
    fs.readFile(notesPath, 'utf8', (err, data) => {
        const notes = JSON.parse(data);
        res.json(notes);
    })
})

// Post
router.post('/api/notes', (req, res) => {
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4()
    }

    fs.readFile(notesPath, 'utf8', (err, data) => {

        let notes = JSON.parse(data) || [];

        notes.push(newNote);

        fs.writeFile(notesPath, JSON.stringify(notes, null, 2), (err) => {

            res.json(newNote);
        });
    });
});

// HTML routes
router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
})
router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

// Bonus TO DO: Deletion

module.exports = router;