const counter = require('./sysCounter');
const utils = require('./utils');
const mongoPool = require('./mongoPool');
const db = new mongoPool();
const appUrl = process.env.APP_URL || 'http://localhost:8080';

class UrlLink {
    static save(urlName){
        return new Promise((resolve, reject) => {
            counter.save()
            .then(counter => {
                db.getPoolInstance().then(res => {
                    let obj = {
                        _id: counter,
                        original_url: urlName,
                        short_url: appUrl + "/" + utils.encode(counter)
                    }
                    res.collection('links').insertOne(obj)
                        .then(response => resolve(obj) )
                        .catch(err => reject(err) );
                }).catch(err => reject(err) );
            }).catch(err => reject(err) );
        })
        
    }
}

module.exports = UrlLink;