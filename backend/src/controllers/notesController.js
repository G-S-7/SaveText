import Note from '../models/Note.js';
export async function getAllNotes(req, res){
    try{
        const notes = await Note.find().sort({createdAt: -1});
        res.status(200).json(notes);
    }catch(err){
        res.status(500).json({message:"Error fetching notes", error: err.message});
    }
}
export async function getNote(req, res){
    try{
        const note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).json({message:"Note not found"});
        }
        res.status(200).json(note);
    }catch(err){
        res.status(500).json({message:"Error fetching note", error: err.message});
    }
}
export async function createNote(req, res){
    try{
        const {title, content} = req.body;
        const newNote = new Note({title, content});
        await newNote.save();
        res.status(201).json(newNote);
    }catch(err){
        res.status(500).json({message:"Error creating note", error: err.message});
    }
}
export async function updateNote(req, res){
    try{
        const {title, content} = req.body;
        const note = await Note.findByIdAndUpdate(req.params.id, {title, content}, {new: true});
        if(!note){
            return res.status(404).json({message:"Note not found"});
        }
        res.status(200).json(note);
    }catch(err){
        res.status(500).json({message:"Error updating note", error: err.message});
    }
}
export async function deleteNote(req, res){try{
        const note = await Note.findByIdAndDelete(req.params.id);
        if(!note){
            return res.status(404).json({message:"Note not found"});
        }
        res.status(200).json(note);
    }catch(err){
        res.status(500).json({message:"Error deleting note", error: err.message});
    }
}