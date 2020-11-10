const Sequelize = require('sequelize'); 
const sequelize = new Sequelize(process.env.DB_NAME, 'postgres', process.env.PWORD, {
    host: 'localhost', 
    dialect: 'postgres'
});

sequelize.authenticate().then( 
    function() {  
        console.log('Connected to BookBubble postgres database');
    }, 
    function(err){ 
        console.log(err);
    }
);

module.exports = sequelize; 
