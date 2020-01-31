const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const dbName = 'leave-tracker'

MongoClient.connect(connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function callback(error, client){
    if(error){
        return console.log(error);
    }
    const db = client.db(dbName);
    db.collection('Users').insertOne({
        name: 'Vinodhraj',
        id: 144725,
        role: 'Admin'
    })
})

