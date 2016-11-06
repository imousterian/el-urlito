const mongoPool = require('./mongoPool');
const db = new mongoPool();

class Counter {
    static save(){
        return new Promise((resolve, reject) => {
            db.getPoolInstance().then(res => {
                res.collection('counters').findOneAndUpdate({_id: 'url_count'}, {$inc: {seq:1}})
                    .then(counter => resolve(counter.value.seq) )
                    .catch(err => reject(err) );
            }).catch(err => reject(err) );
        })
    }
}

module.exports = Counter;