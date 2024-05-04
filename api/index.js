const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(cors());
const PORT = 5038;

const CONNECTION_STRING =
  "mongodb+srv://admin:Yrskrmsr@cluster0.nwljkhx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const DATABASE_NAME = "todoappdb";
let database;

app.listen(PORT, () => {
  MongoClient.connect(CONNECTION_STRING, (error, client) => {
    if (error) {
      console.error("Error connecting to MongoDB:", error);
      return;
    }
    database = client.db(DATABASE_NAME);
    console.log("MongoDB Connection Successful");
  });
});

app.use(express.json());

app.get("/api/todoapp/GetNotes", (req, res) => {
  database
    .collection("todoappcollect")
    .find({})
    .toArray((error, result) => {
      if (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      res.json(result);
    });
});

app.post("/api/todoapp/AddNotes", multer().none(), (req, res) => {
  const newNote = req.body.newNotes;
  database.collection("todoappcollect").countDocuments({}, (error, count) => {
    if (error) {
      console.error("Error counting documents:", error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    const newNoteObject = {
      id: (count + 1).toString(),
      description: newNote,
    };
    database.collection("todoappcollect").insertOne(newNoteObject, (error) => {
      if (error) {
        console.error("Error adding note:", error);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      res.json({ message: "Added Successfully" });
    });
  });
});

app.delete("/api/todoapp/DeleteNotes", (req, res) => {
  const noteId = req.query.id;
  database.collection("todoappcollect").deleteOne({ id: noteId }, (error) => {
    if (error) {
      console.error("Error deleting note:", error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json({ message: "Deleted Successfully" });
  });
});
