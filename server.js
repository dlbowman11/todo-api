var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var app = express();
var PORT = 3000;
var todos = [];
var todoNextId = 1;
//Allows us to parse incoming JSON requests
app.use(bodyParser.json());

app.get('/', function (req, res){
    res.send('TODO API Root');
});

//GET /todos
app.get('/todos', function(req, res){
   res.json(todos); 
});

//GET /todos/:id
    app.get('/todos/:id', function (req, res){
    var todoId = parseInt(req.params.id);
    var matched = _.findWhere(todos, {id: todoId});

    if(matched)
        {
            res.json(matched);
        }else{
            res.status(404).send("Not Found");
        }
});

//POST /todos

app.post('/todos', function(req, res){
    var body = _.pick(req.body, 'description', 'completed');
    
    if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0)
        {
            return res.status(400).send();
        }
    //adds ID field
    body.id = todoNextId;
    body.description = body.description.trim();
    todoNextId++;
    //Adds body to array
    todos.push(body);
    //Shows user the response body
    res.json(body);
});
//DELETE /todos/:id
//use _.without
app.delete('/todos/:id', function(req, res){
    var delId = parseInt(req.params.id);
    var delItem = _.findWhere(todos, {id: delId});
    if(!delItem){
        res.status(404).send("Item not found");
    } else{
        todos = _.without(todos, delItem);
        res.json(delItem);
    }
});


app.listen(PORT, function(){
    console.log('Express listening on port ' + PORT + ".");
});