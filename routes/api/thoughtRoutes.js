const router = require('express').Router();
const {
  getThoughts,
  getSingleCourse,
  createThought,
  updateCourse,
  deleteCourse,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

module.exports = router;
