const express = require('express');
const router = express.Router();
const fecthuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');


//fecth notes of loged in user
router.get('/fecthnotes', fecthuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)
    }
    catch (error) {
        console.log(error)
        res.status(500).send("some error occured")
    }

})

//adding notes
router.post('/addnotes', fecthuser, [body('title', 'title cannot be empty').exists(), body('description', 'description cannot be empty').exists()], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { title, description, tag } = req.body;
    try {

        const notes = new Notes({
            title, description, tag, user: req.user.id
        })

        const savednotes = await notes.save();

        res.send(savednotes)



    }
    catch (error) {
        console.log(error)
        res.status(500).send("some error occured")
    }

})

//update the note by getting id
router.put('/updatenotes/:id', fecthuser, async (req, res) => {
    const { title, description, tag } = req.body
    const newNote = {}

    try {
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(400).send("not found")
        }
        if (note.user.toString() != req.user.id) {
            return res.status(401).send("not allowed")
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json(note)
    }
    catch (error) {
        console.log(error)
        res.status(500).send("some error occured")
    }

})

//delete a node by id
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(400).send("not found")
        }
        if (note.user.toString() != req.user.id) {
            return res.status(401).send("not allowed")
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ successs: "note deleted" })
    }
    catch (error) {
        console.log(error)
        res.status(500).send("some error occured")
    }


})
module.exports = router;