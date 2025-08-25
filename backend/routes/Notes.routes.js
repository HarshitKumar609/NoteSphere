import { Router } from "express";
import fetchuser from "../middleware/fetchuser.js";
import { Notes } from "../module/Notes.js";
import { body, validationResult } from "express-validator";

const router = Router();

//........................................................route-1 for all notes using get............................................
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    //find user and his notes
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    //if some code error
    console.error(error.Message);
    res.status(500).send("internal server error");
  }
});

//.....................................................route-2 for addnotes using post...............................................

router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();
      res.json({ success: true, note: savedNote });
    } catch (error) {
      //if some code error
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//....................................................route-3 for update notes using put............................................

router.put("/updateNote/:id", fetchuser, async (req, res) => {
  try {
    //creating New Note that will be updated with existing Note...
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    //find the Note and update it
    let note = await Notes.findById(req.params.id);

    //it checks Note is Present or not in Database
    if (!note) {
      return req.status(404).send("Not Found");
    }
    //it checks user is same or not
    if (note.user.toString() !== req.user.id) {
      return req.status(401).send("Not allowed");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    //if some code error
    console.error(error.Message);
    res.status(500).send("internal server error");
  }
});

//......................................route-4 for Delete an existing notes using DELETE............................................

router.delete("/deleteNote/:id", fetchuser, async (req, res) => {
  try {
    //find the Note and delete it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return req.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return req.status(401).send("Not allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ success: "note has been deleted", note: note });
  } catch (error) {
    //if some code error
    console.error(error.Message);
    res.status(500).send("internal server error");
  }
});

export default router;
