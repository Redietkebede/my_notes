import express from "express";
import {
  getNotes,
  getById,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/notesControllers.js";

const router = express.Router();

router.get("/", getNotes);
router.get("/:id", getById);
router.post("/", createNote);
router.put("/:id", updateNote); 
router.delete("/:id", deleteNote);

export default router;
