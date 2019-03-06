const express = require("express");
const router = express.Router();

const NotesController = require('../controllers/notes');

router.get('/', NotesController.get_all_notes);

router.post('/', NotesController.post_note);

router.get('/user/:id', NotesController.get_one_user_notes);

router.get('/:id', NotesController.get_one_note);

router.patch('/:id', NotesController.edit_one_note);

router.delete('/:id', NotesController.delete_one_note);


module.exports = router;