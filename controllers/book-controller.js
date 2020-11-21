const router = require("express").Router();
const Book = require("../db").import("../models/book"); //models should be uppercase per syntax std. RK via IM. 
const { restart } = require("nodemon");
const validateSession = require("../middleware/validate-session");
const { Op } = require("sequelize");
const book = require("../models/book");

//Add books ---- (post) goes to BookCreate component (i.e. book/create)
router.post("/create", (req, res) => {
  //console.log(req.user);
  let bookModel = {
    author: req.body.author, //added .book btwn body and final param per BookCreate. RK. 
    title: req.body.title,
    genre: req.body.genre,
    total_pages: req.body.total_pages,
    rating: req.body.rating,
    description: req.body.description,
    year_published: req.body.year_published,
    read_status: req.body.read_status,
    owner_id: req.user.id,
  };

  Book.create(bookModel)
    //.then((book) => console.log("Book Create:", book))
    .then((book) => res.status(200).json(book))
    .catch((err) => res.status(500).json({ error: err }));
});

//Get books already read ---- if you click “see more” then it goes to Book to display one book with all the deets, (i.e. /book/read)
router.get("/read", validateSession, (req, res) => {
  let userid = req.user.id; //make sure owner_id = req.user.id (check user model & rest of controller)
  Book
    .findAll({
      where: { owner_id: userid, read_status: "read" },
    })
    .then((books) => res.status(200).json(books))
    .catch((err) => res.status(500).json({ error: err }));
});

//Get books currently reading ---- if you click “see more” then it goes to Book to display one book with all the deets (i.e. /book/reading)
router.get("/reading", validateSession, (req, res) => {
  let userid = req.user.id; //make sure owner_id = req.user.id (check user model & rest of controller)
  Book //changed book to Book. RK. 
    .findAll({
      where: { owner_id: userid, read_status: "reading" },
    })
    .then((books) => res.status(200).json(books))
    .catch((err) => res.status(500).json({ error: err }));
});

//Get books to read --- if you click “see more” then it goes to Book to display one book with all the deets (i.e. /book/to-read)
router.get("/to-read", validateSession, (req, res) => {
  let userid = req.user.id; //make sure owner_id = req.user.id (check user model & rest of controller)
  Book //changed book to Book. RK. 
    .findAll({
      where: { owner_id: userid, read_status: "to-read" },
    })
    .then((books) => res.status(200).json(books))
    .catch((err) => res.status(500).json({ error: err }));
});

//Update book ---- goes to BookEdit component (i.e. /book/:id)
// May need to change route to /:bookId

router.put("/edit/:bookId", validateSession, function (req, res) {
  let bookModel = {
    author: req.body.author, //added .book btwn body and final param per BookCreate. RK. 
    title: req.body.title,
    genre: req.body.genre,
    total_pages: req.body.total_pages,
    rating: req.body.rating,
    description: req.body.description,
    year_published: req.body.year_published,
    read_status: req.body.read_status,
    owner_id: req.user.id,
  };

  Book.update(bookModel, 
    {where: { owner_id: req.user.id, id: req.params.bookId}})
  .then((book) => res.status(200).json(book))
  .catch((err) => res.status(500).json({ error: err }));
});




//UPDATE DRAFT 1
// router.put("/edit/:bookId", validateSession, function (req, res) {
//   const book = {
//     author: req.body.book.author,
//     title: req.body.book.title,
//     genre: req.body.book.genre,
//     total_pages: req.body.book.total_pages,
//     rating: req.body.book.rating,
//     description: req.body.book.description,
//     year_published: req.body.book.year_published,
//     read_status: req.body.book.read_status,
//   };

//   const query = { where: { owner_id: req.user.id, id: req.params.bookId } }; 

//   Book //changed book to Book. RK. 
//     .update(book, query)
//     .then((book) =>
//       res
//         .status(200)
//         .json({ message: "Your book has been edited successfully" })
//     ) // books plural?
//     .catch((err) => res.status(500).json({ error: err }));
// });

//Delete book ----goes to BookEdit component (i.e. /book/:id)
// May need to change route to /:bookId
//may need to change path to /delete/:bookId
router.delete("/:id", (req, res) => {
  Book //changed book to Book. RK. 
    .destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "Book has been deleted" }))
    .catch((err) => res.status(500).json({ error: err }));
});

//BookFinder/Get books by search
router.get("/search/:query", validateSession, (req, res) => {
  console.log(req);
  const { query } = req.params;
  let userid = req.user.id;
  // console.log(userid, query);
  Book
    .findAll(
      {
        where: {
          [Op.or]: [
            {
              [Op.and]: [
                { title: { [Op.substring]: query } },
                { owner_id: userid }
              ]
            },
            {
              [Op.and]: [
                { author: { [Op.substring]: query } },
                { owner_id: userid }
              ]
            }
          ]
        }
      })
    .then((books) => res.status(200).json(books))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
