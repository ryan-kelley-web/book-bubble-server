const router = require('express').Router();
const book = require('../db').import('../models/book');
const validateSession = require('../middleware/validate-session');

//Add books ---- (post) goes to BookCreate component (i.e. book/create)
router.post('/create', (req, res) => {
    console.log(req.user);
    let bookModel = {
        author: req.body.author,
        title: req.body.title,
        genre: req.body.genre,
        numOfPages: req.body.numOfPages,
        rating: req.body.rating,
        owner: req.user.id
    };

    Book.create(bookModel)
        .then(book => res.status(200).json(book))
        .catch(err => res.status(500).json({error: err}));
});

//Get books already read ---- if you click “see more” then it goes to Book to display one book with all the deets, (i.e. /book/read) 
router.get('/read', validateSession, (req, res) => { 
    let userid = req.user.id //make sure owner_id = req.user.id (check user model & rest of controller)
    book.findAll({
        where: {owner_id: userid, read_status: 'read'}
    }) 
        .then(logs => res.status(200).json(logs)) 
        .catch(err => res.status(500).json({error: err})) 
});

//Get books currently reading ---- if you click “see more” then it goes to Book to display one book with all the deets (i.e. /book/reading)
router.get('/reading', validateSession, (req, res) => { 
    let userid = req.user.id //make sure owner_id = req.user.id (check user model & rest of controller)
    book.findAll({
        where: {owner_id: userid, read_status: 'reading'}
    }) 
        .then(logs => res.status(200).json(logs)) 
        .catch(err => res.status(500).json({error: err})) 
});

//Get books to read --- if you click “see more” then it goes to Book to display one book with all the deets (i.e. /book/to-read)
router.get('/to-read', validateSession, (req, res) => { 
    let userid = req.user.id //make sure owner_id = req.user.id (check user model & rest of controller)
    book.findAll({
        where: {owner_id: userid, read_status: 'to-read'}
    }) 
        .then(logs => res.status(200).json(logs)) 
        .catch(err => res.status(500).json({error: err})) 
});

//Update book ---- goes to BookEdit component (i.e. /book/:id)
// May need to change route to /:bookId
router.put('/:id', (req, res) => {
    const updatedBook = {
        author: req.body.author,
        title: req.body.title,
        genre: req.body.genre,
        numOfPages: req.body.numOfPages,
        rating: req.body.rating
    };

    Book.update(updatedBook, {where: {id: req.params.bookId}})
        .then(book => res.status(200).json(book))
        .catch(err => res.status(500).json({error: err}));
});

//Delete book ----goes to BookEdit component (i.e. /book/:id)
// May need to change route to /:bookId
router.delete('/:id', (req, res) => {
    Book.destroy({where: {id: req.params.bookId}})
        .then(() => res.status(200).json({message: 'Book has been deleted'}))
        .catch(err => res.status(500).json({error: err}));
});


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