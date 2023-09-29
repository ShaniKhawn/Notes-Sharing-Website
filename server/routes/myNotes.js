const express = require("express");
const Note = require('../models/Note');
const router = express();

router.get('/:userId', async (req, res) => {
    // console.log('my notes api triggered....');
    const notes = await Note.find({user:req.params.userId}).populate({path: 'user', model: 'Users'}).exec();
    if(notes.length > 0){
         res.json(notes);
        // console.log('getting my notes backend', notes);
    }else{
         res.json("no notes found");
    }
});

// Delete a specific note by ID
router.delete('/:noteId', async (req, res) => {
    try {
      const noteId = req.params.noteId;
      const note = await Note.findById(noteId);
  
      if (!note) {
        return res.status(404).json({ error: 'Note not found' });
      }
 
      await Note.findByIdAndDelete(noteId);
  
      res.json({ message: 'Note deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;
