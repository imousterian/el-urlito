const mongoURL = process.env.MONGODB_URI || require('./config').mongodb.MONGODB_URI;
const mongoOptions = require('./config').mongodb.options;
const MongoClient = require('mongodb').MongoClient;

let MongoDB = null;

class MongoPool {

    constructor(){
        if(!MongoDB){
            MongoDB = this;
        }
        return MongoDB;
    }

    initPool() {
        return new Promise((resolve, reject) => {
            MongoClient.connect(mongoURL, mongoOptions)
                .then(db => {
                    db.on('close', () =>  MongoDB = null);
                    MongoDB = db;
                    resolve(MongoDB);                               
                }).catch(err => reject(err) );   
        })
    }

    getPoolInstance(){
        if(MongoDB === null || Object.keys(MongoDB).length === 0) {
            return new Promise((resolve, reject) => {
                this.initPool()
                    .then(res => resolve(res) )
                    .catch(err => reject(err) );
            }); 
        }
        return new Promise((resolve, reject) => resolve(MongoDB) );
    }
}

module.exports = MongoPool;