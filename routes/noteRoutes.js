// Import modules
const express = require('express')
const fs = require('fs');
const path = require('path')
const {v4: uuidv4} = require('uuid')
// Initialize express router
const router = express.Router();
// Database pathing
const notesPath = path.join(__dirname, '../db/db.json');

// HTML routes
router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
})
router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

// API routes
router.get('/api/notes', (req, res) => {
    fs.readFile(notesPath, 'utf8', (err, data) => {
        const notes = JSON.parse(data);
        res.json(notes);
    })
})

router.post('/api/notes', (req, res) => {
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4()
    }

    fs.readFile(notesPath, 'utf8', (err, data) => {
        const notes = JSON.parse(data);
        notes.push(newNote);

        fs.writeFile(notesPath, JSON.stringify(notes), (err) => {
            res.json(newNote)
        })
    })
})

module.exports = router;