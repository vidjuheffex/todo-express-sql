const express = require('express');
const mustacheExpress = require('mustache-express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = 7000;
const models = require("./models");

var app = express();

app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(express.static("./public"));
app.use(bodyParser.json());

app.get('/', (req,res) => {
    models.todos.findAll().then(todos => {
	let incompleteTodos = todos.filter(e => e.dataValues.completed_on == null );
	let completeTodos = todos.filter(e => e.dataValues.completed_on != null);
	res.render("index", {incompleteTodos: incompleteTodos, completeTodos: completeTodos });
    });
    
});

app.post('/add', (req,res) => {
    let data = req.body;
    models.todos.create({item: data.value}).then( item => {
	res.send(JSON.stringify(data));
    });
});

app.post('/update', (req, res) => {
    let data = req.body;
    models.todos.update({
	completed_on: new Date().toLocaleString()
    },{
	where: {
	    id: data.id
	}
    }).then( item => {
	res.send(JSON.stringify(data));
    });
});

app.delete('/remove', (req, res) => {
    let data = req.body;
    models.todos.destroy({
	where: {
	    id: data.id
	}
    }).then(
	res.send(null)
    );
});

app.listen(port, ()=> console.log("Server running on port: ", port));
