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
    var qParams = req.query;
    var filteredTodos = todos;
    if(qParams.hasOwnProperty('completed') && qParams.completed === 'true')
    {
        filteredTodos = _.where(filteredTodos, {completed: true});
    }else if(qParams.hasOwnProperty('completed') && qParams.completed === 'false'){
        filteredTodos = _.where(filteredTodos, {completed: false});
    }
    
    res.json(filteredTodos);
    
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
        res.status(404).json({"Error" : "Item not found"});
    } else{
        todos = _.without(todos, delItem);
        res.json(delItem);
    }
});

//PUT /todos/:id
app.put('/todos/:id', function(req, res){
    var body = _.pick(req.body, 'description', 'completed');
    var putId = parseInt(req.params.id);
    var putItem = _.findWhere(todos, {id: putId});
    var validAttributes = {};
    
    if(!putItem){
        return res.status(404).send();
    }
    if(body.hasOwnProperty('completed') && _.isBoolean(body.completed))
        {
            validAttributes.completed = body.completed;
        }else if(body.hasOwnProperty('completed')){
            res.status(400).json({"Error" : "completed must be a boolean."})
        }
    if(body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length >0){
        validAttributes.description = body.description;
    }else if(body.hasOwnProperty('description')){
        res.status(400).json({"Error" : "Description must be a string"});
    }

    _.extend(putItem, validAttributes);
    res.json(putItem);
});


app.listen(PORT, function(){
    console.log('Express listening on port ' + PORT + ".");
});