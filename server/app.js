var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var route = express.Router();
var User = require('./models/user.model');
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
//start mongoDB
mongoose.connect('mongodb://localhost/company',function(){
    console.log('database connected')
})

var originsWhitelist = [
    'http://localhost:4200'
    ];
    var corsOptions = {
    origin: function(origin, callback){
    var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
    callback(null, isWhitelisted);
    },
    credentials:true
    }
    app.use(cors(corsOptions));

//end mongoDB

route.get('/',function(req,res){
    res.json({message : "Hello world"})
})

route.delete('/users/:id',function(req,res){
    User.remove(req.params.id,function(err,user){
        if(err){
            console.log('The error is ',err);
            return;
        }
        res.json({message : 'Record deleted'})
    })
})

route.get('/users',function(eq,res){
    User.find({},function(err,users){
        if(err){
            console.log('The error is ',err);
            return;
        }
        res.json({data : users})
    })
})

route.post('/users',function(req,res){
    console.log('The request is ',req.body)
User.create(req.body,function(err,user){
if(err){
    console.log('The err is -----> ',err);
    return;
}
res.json({message : 'User created'})
})
})




app.use('/api',route);
app.listen(3000,function(){
    console.log('Server starts..');
})