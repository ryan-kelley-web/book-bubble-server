require('dotenv').config(); 
let express = require('express'); 
let app = express(); 
let sequelize = require('./db');

let book = require('./controllers/book-controller') 
let user = require('./controllers/user-controller'); 

sequelize.sync(); //{force: true} inside .sync() "drops all tables" each time server runs. enter and delete in order to drop tables only once. 

app.use(require('./middleware/headers')); 

app.use(express.json());

app.use('/user', user);
app.use(require('./middleware/validate-session')); 
app.use('/book', book);

app.listen(process.env.PORT, () => console.log(`Server is listening on Port ${process.env.PORT}.`));
