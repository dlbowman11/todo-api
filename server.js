var express = require('express');
var bodyParser = require('body-parser');
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
    var matched;
    
    //res.send('Asking for todo with id of ' + req.params.id);

    for(var i = 0; i< todos.length ; i++)
        {
            if(todoId === todos[i].id)
                {
                    matched = todos[i];
                    //res.json(todos[i]);
                }
        }
    if(matched)
        {
            res.json(matched);
        }else{
            res.status(404).send("Not Found");
        }


});

//POST /todos

app.post('/todos', function(req, res){
    var body = req.body;
    //adds ID field
    body.id = todoNextId;
    todoNextId++;
    //Adds body to array
    todos.push(body);
    //Shows user the response body
    res.json(req.body);
});

app.listen(PORT, function(){
    console.log('Express listening on port ' + PORT + ".");
});