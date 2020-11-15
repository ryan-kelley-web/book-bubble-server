const router = require('express').Router();
const book = require('../db').import('../models/book');
const validateSession = require('../middleware/validate-session');

//Add books ---- (post) goes to BookCreate component (i.e. book/create)

//Get books already read ---- if you click “see more” then it goes to Book to display one book with all the deets, (i.e. /book/read) 
router.get('/book/read/:id', validateSession, (req, res) => { 
    let userid = req.user.id //make sure owner_id = req.user.id (check user model & rest of controller)
    book.findAll({
        where: {owner_id: userid, read_status: 'read'}
    }) 
        .then(logs => res.status(200).json(logs)) 
        .catch(err => res.status(500).json({error: err})) 
});

//Get books currently reading ---- if you click “see more” then it goes to Book to display one book with all the deets (i.e. /book/reading)
router.get('/book/reading/:id', validateSession, (req, res) => { 
    let userid = req.user.id //make sure owner_id = req.user.id (check user model & rest of controller)
    book.findAll({
        where: {owner_id: userid, read_status: 'reading'}
    }) 
        .then(logs => res.status(200).json(logs)) 
        .catch(err => res.status(500).json({error: err})) 
});

//Get books to read --- if you click “see more” then it goes to Book to display one book with all the deets (i.e. /book/to-read)
router.get('/book/to-read/:id', validateSession, (req, res) => { 
    let userid = req.user.id //make sure owner_id = req.user.id (check user model & rest of controller)
    book.findAll({
        where: {owner_id: userid, read_status: 'to-read'}
    }) 
        .then(logs => res.status(200).json(logs)) 
        .catch(err => res.status(500).json({error: err})) 
});

//Update book ---- goes to BookEdit component (i.e. /book/:id)

//Delete book ----goes to BookEdit component (i.e. /book/:id)

module.exports = router; 


//title, author, totpgs, rating, genre, desc, yrpub

/*
Add books ---- (post) goes to BookCreate component
Get books already read ---- goes to BookTable component --- if you click “see more” then it goes to Book to display one book with all the deets
Get books currently reading ---- goes to BookTable component --- if you click “see more” then it goes to Book to display one book with all the deets
Get books to read ---- goes to BookTable component --- if you click “see more” then it goes to Book to display one book with all the deets
Update book ---- goes to BookEdit component
Delete book ----goes to BookEdit component
 */