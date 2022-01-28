const express = require("express");
const app = express();
const PORT = 8080;
const gA = require("./geneticAlgorithm.js");
const bnb = require("./branchAndbound.js");
const btk = require("./backtracking.js");

app.use(express.json());

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://admin:admin@cluster0.4c9zr.mongodb.net/Licenta?retryWrites=true&w=majority";
var ObjectId = require('mongodb').ObjectID;

app.post("/insertCircuit", function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    db.db("Licenta").collection("circuits").insertOne(req.body, function (err, res) {
      if (err) throw err;
      db.close();
    });
  });
});

app.get("/getAllUserCircuits", function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    db.db("Licenta").collection("circuits").find({ user: req.query.user}).toArray(function (err, result) {
      if (err) throw err;
      res.send(JSON.stringify(result));
      db.close();
    });
  });
});

app.post("/renameCircuit", function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    db.db("Licenta").collection("circuits").updateOne({ _id: ObjectId(req.body.id) }, { $set: { name: req.body.name }}, function (err, res) {
      if (err) throw err;
      db.close();
    });
  });
});

app.post("/deleteCircuit", function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    db.db("Licenta").collection("circuits").deleteOne({ _id: ObjectId(req.body.id) }, function (err, obj) {
      if (err) throw err;
      db.close();
    });
  });
});

app.post("/insertUserSettings", function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    db.db("Licenta").collection("settings").insertOne(req.body, function (err, res) {
      if (err) throw err;
      db.close();
    });
  });
  res.send(JSON.stringify("OK"));
});

app.get("/getUserSettings", function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    db.db("Licenta").collection("settings").findOne({ user: req.query.id }, function (err, result) {
      if (err) throw err;
      res.send(JSON.stringify(result));
      db.close();
    });
  });
});

app.post("/updateUserSettings", function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
      db.db("Licenta").collection("settings").updateOne({ user: req.body.user }, {$set: {settings: req.body.settings}}, function (err, result) {
      if (err) throw err;
      db.close();
    });
  });
});

app.post("/backtracking", function (req, res) {
  var distancesMatrix = req.body;
  var optimizedRoute = btk.backtracking(distancesMatrix)
  var result = { "optimizedRoute": optimizedRoute["optimizedRoute"], "cost": optimizedRoute["cost"] }
  res.send(JSON.stringify(result));
});

app.post("/branchAndBound", function (req, res) {
  var distancesMatrix = req.body;
  var optimizedRoute = bnb.branchAndBound(distancesMatrix)
  var result = { "optimizedRoute": optimizedRoute["optimizedRoute"], "cost": optimizedRoute["cost"] }
  res.send(JSON.stringify(result));
});

app.post("/geneticAlgorithm", function (req, res) {
  var distancesMatrix = req.body;
  var optimizedRoute = gA.geneticAlgorithm(1000, 5000, 0.3, distancesMatrix)
  optimizedRoute["population"].unshift(0)
  optimizedRoute["population"].push(0)
  var result = { "optimizedRoute": optimizedRoute["population"], "cost": optimizedRoute["fitness"] }
  res.send(JSON.stringify(result));
});

app.listen(PORT, function () {
  console.log("Server is ready at " + PORT);
})




