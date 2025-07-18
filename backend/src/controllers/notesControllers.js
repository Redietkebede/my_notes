import Note from "../models/Notes.js";

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes", error });
  }
};

const getById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: "Error fetching note", error });
  }
};

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });

    const savedNote = await note.save();
    res.status(201).json({ savedNote });
  } catch (error) {
    res.status(500).json({ message: "Error creating note", error });
  }
};

const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: "Error updating note", error });
  }
};

const deleteNote = async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(204).send("Deleted Note !");
  } catch (error) {
    res.status(500).json({ message: "Error deleting note", error });
  }
};

export { getNotes, getById, createNote, updateNote, deleteNote };
