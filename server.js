var express = require('express');
var app = express();
var PORT = 3000;
var todos = [{
    id: 1,
    description: 'Mow the yard',
    completed : false
}, {
    id: 2,
    description: 'Get groceries.',
    completed : false
}, {
    id: 3,
    description: 'Go to work.',
    completed: true
}];

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


app.listen(PORT, function(){
    console.log('Express listening on port ' + PORT + ".");
});