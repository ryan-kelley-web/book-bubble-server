const router = require('express').Router();
const book = require('../db').import('../models/book');
const validateSession = require('../middleware/validate-session');

//Add books ---- (post) goes to BookCreate component (i.e. book/create)

//Get books already read ---- goes to BookTable component --- if you click “see more” then it goes to Book to display one book with all the deets, (i.e. /book/read) 

//Get books currently reading ---- goes to BookTable component --- if you click “see more” then it goes to Book to display one book with all the deets (i.e. /book/reading)

//Get books to read ---- goes to BookTable component --- if you click “see more” then it goes to Book to display one book with all the deets (i.e. /book/to-read)

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