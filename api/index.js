var Express = require("express");
var Mongoclient = require("mongodb").MongoClient;
var cors = require("cors");
const multer = require("multer");
var app = Express();
app.use(cors());
var CONNECTION_STRING =
  "mongodb+srv://admin:Yrskrmsr@cluster0.nwljkhx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

var DATABASENAME = "todoappdb";
var database;
app.listen(5038, () => {
  Mongoclient.connect(CONNECTION_STRING, (error, client) => {
    if (error) {
      console.error("Error connecting to MongoDB:", error);
      return;
    }
    database = client.db(DATABASENAME);
    console.log("MongoDB Connection Successful");
  });
});

app.get("/api/todoapp/GetNotes", (request, response) => {
  database
    .collection("todoappcollect")
    .find({})
    .toArray((error, result) => {
      response.send(result);
    });
});

app.post("/api/todoapp/AddNotes", multer().none(), (request, response) => {
  database.collection("todoappcollect").count({}, function (error, numOfDocs) {
    database.collection("todoappcollect").insertOne({
      id: (numOfDocs + 1).toString(),
      description: request.body.newNotes,
    });
    response.json("Added Successfully");
  });
});

app.delete("/api/todoapp/DeleteNotes", (request, response) => {
  database.collection("todoappcollect").deleteOne({
    id: request.query.id,
  });
  response.json("Delete Successfully");
});
