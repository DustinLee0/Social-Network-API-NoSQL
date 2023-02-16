const { Thought } = require('../models');

module.exports = {
  // Get all users
  getThoughts(req, res) {
    Thought.find()
      .select('-__v')
      .populate({
        path: 'reactions',
        v: '-__V'
      })
      .then(thought => {
        if (thought.reactions === null) {
            return 0;
        }
          res.status(200).json(thought);
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
  },
  // create a new student
  createThought(req, res) {
    Thought.create(req.body)
      .then( thought => res.json(thought))
      .catch( err => {
        console.log(err)
        res.status(500).json(err)
    });
  },
};