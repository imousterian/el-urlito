const router = require('express').Router();
const utils = require('./utils');
const urlLink = require('./urlLink');

router.get('/new/:url(*)', (req, res, next) => {
    const db = req.app.locals.db;
    const validUrl = utils.validUrl(req.params.url);
    if(validUrl){
        const url = validUrl[0];
        
        if(!db) throw(new Error("Couldn't connect to the database. Try later."));
        
        db.collection('links').findOne({original_url: url})
            .then(response => {
                if(response){
                    res.send(response);
                }else{
                    urlLink.save(url)
                        .then(response => res.send(response) )
                        .catch(err => next(err) );
                }
            }).catch(err => next(err) );
    }else{
        let err = new Error();
        err.message = "Wrong url format, make sure you have a valid protocol and real site.";
        err.status = 404;
        next(err);
    }
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    const db = req.app.locals.db;
    const decoded = utils.decode(id);
    
    if(!db) throw(new Error("Couldn't connect to the database. Try later."));
    if(!decoded) throw(new Error("Couldn't decode the url."));

    db.collection('links').findOne({_id: decoded})
        .then(response => {
            if(response){
                res.send({url: response.original_url});
            }else{
                let err = new Error();
                err.message = "No url was found in the database.";
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err) );
});

module.exports = router;