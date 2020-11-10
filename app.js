require('dotenv').config(); 
let express = require('express'); 
let app = express(); 
let sequelize = require('./db');

let book = require('./controllers/book-controller') 
let user = require('./controllers/user-controller'); 

sequelize.sync();

app.use(require('./middleware/headers')); 

app.use(express.json());

app.use('/user', user); 
// app.use('/book', book);

app.listen(process.env.PORT, () => console.log(`Server is listening on Port ${process.env.PORT}.`));
