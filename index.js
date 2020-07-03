// BRINDING IN THE EXPRESS SERVER AND CREATING APPLICATION
let express = require('express');
let app = express();
let pieRepo = require('./repos/pieRepo');

// USE EXPRESS ROUTER OBJECT
let router = express.Router();

// CONFIGURE MIDDLEWARE TO SUPPPORT JSON DATA PARSING IN REQUEST OBJECT
app.use(express.Router());


// CREATE A GET TO RETURN LIST OF ALL DATA
router.get('/', function (req, res, next) {
  pieRepo.get(function (data) {
    res.status(200).json({
      "status": 200,
      "message": "Success",
      "data": data
    });
  }, function (err) {
    next(err);
  });
});

// SEACRH DATA BY ID OR NAME
router.get('/search', function (req, res, next) {
  let searchObject = {
    "id": req.query.id,
    "name": req.query.name,
  };

  pieRepo.search(searchObject, function (data) {

    if (data) {
      res.status(200).json({
        "status": 200,
        "message": "Success",
        "data": data
      });
    } else {
      res.status(404).json({
        "status": 404,
        "message": "Data not found",
        "error": {
          "code": "NOT_FOUND",
          "message": "Data not found",
        }
      });
    }

  }, function (err) {
    next(err);
  });
});


// CREATE A GET TO FIND BY ID
router.get('/:id', function (req, res, next) {
  pieRepo.getById(req.params.id, function (data) {
    if (data) {
      res.status(200).json({
        "status": 200,
        "message": "Success",
        "data": data
      });
    } else {
      res.status(404).json({
        "status": 404,
        "message": "Data not found for pie " + req.params.id,
        "error": {
          "code": "NOT_FOUND",
          "message": "Data not found for pie " + req.params.id,
        }
      });
    }
  }, function (err) {
    next(err);
  });
});

app.use('/api', router);

var server = app.listen(5000, function () {
  console.log('Node server is running on http://localhost:5000...')
});