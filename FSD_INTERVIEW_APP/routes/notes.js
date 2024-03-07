import express from "express";
import { deletedNotes, getAllNotes, getUserNotes, postNewNotes, updatedNotes } from "../controllers/notes.js";

const router = express.Router();

// get all notes
router.get("/all", async (req, res) => {
    try {
        const notes = await getAllNotes();
        if (!notes || notes.length <= 0) {
            return res.status(404).json({
                error: "No Content Available"
            });
        }
        res.status(200).json({
            data: notes,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// get all individual user's notes
router.get("/user/all", async (req, res) => {
    try {
        const notes = await getUserNotes(req);
        if (!notes || notes.length <= 0) {
            return res.status(404).json({
                error: "No Content Available"
            });
        }
        res.status(200).json({
            data: notes,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Adding a new notes by the user
router.post("/user/add", async (req, res) => {
    try {
        const newpost = await postNewNotes(req);
        if (!newpost) {
            return res.status(400).json({
                error: "Error Occured While Uploading",
            })
        }
        res.status(201).json({
            message: "Successfully Uploaded",
            data: newpost,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Edit user's notes
router.put("/user/edit/:id", async (req, res) => {
    try {
        const editedNotes = await updatedNotes(req);
        if(!updatedNotes){
            return res.status(400).json({
                error: "Error Occured While Updating",
            })
        }
        res.status(200).json({
            message: "Successfully Updated",
            data: editedNotes,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Delete user's notes
router.delete("/user/delete/:id", async (req, res) => {
    try {
        const deleteNotes = await deletedNotes(req);
        if(!deleteNotes){
            return res.status(400).json({
                error: "Error Occured While Deleting",
            })
        }
        res.status(200).json({
            message: "Successfully Deleted",
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


export const notesRouter = router;