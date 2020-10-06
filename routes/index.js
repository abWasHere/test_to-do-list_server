var express = require('express');
var router = express.Router();

var fs = require("fs"); //to manipulate data in JSON file
var shortid = require("shortid"); //get random ids

var data = fs.readFileSync("./tasks.json"); 
var todos = JSON.parse(data); // JSON to array of obj

//  ---------  routes prefix = /api  -----------

/* GET ALL */
//
router.get("/", (req, res) => {
	if (todos.length) {
		res.status(200).json(todos);
	} else {
		res.status(500).json(err);
	}
});

/* CREATE */
//
router.post("/add", (req, res) => {
	if (req.body.task) {
		let newTask = { task: req.body.task, _id: shortid.generate() };

		todos.push(newTask);

		let datas = JSON.stringify(todos, null, 2); // array to JSON
		fs.writeFileSync("tasks.json", datas, () => {
			console.log("error");
		}); // save new JSON with new data

		res.status(201).json(newTask);
	} else {
		res.status(500).json({message:"Invalid content"});
	}
});

/* DELETE */
//
router.delete("/delete/:id", (req, res) => {
	let cleanArr = todos.filter((x) => x._id != req.params.id);
	let cleanData = JSON.stringify(cleanArr, null, 2);
	fs.writeFileSync("tasks.json", cleanData, () => {
		console.log("error");
	});
	res.sendStatus(204);
});


module.exports = router;
