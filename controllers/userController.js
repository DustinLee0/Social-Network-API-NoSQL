const { User } = require('../models');

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find({})
    .select('-__v')
      .populate({
        path: 'thoughts',
        v: '-__v'
      })
      // .populate({
      //   path: 'friends',
      //   v: '-__V'
      // })
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({message: err})
      })
  },
  // get one user by id
  getUserById(req, res) {
    User.findOne({
      _id: req.params.id
    })
      .populate({
        path: 'thoughts',
        v: '-__v'
      })
      .populate({
        path: 'friends',
        v: "-__v"
      })
      .then(user => {
        if (!user) {
          res.status(404).json({ message: 'No user found' })
        }
        res.status(200).json(user)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  },
  // create a new student
  createUser(req, res) {
    User.create(req.body)
      .then(user => res.json(user))
      .catch(err => res.status(500).json(err));
  },
  // update user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    )
      .then(updateUser => {
        if (!updateUser) {
          res.status(404).json({ message: "No user found with given id" })
        }
        res.status(200).json(updateUser)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  },
  // delete user
  deleteUser(req, res) {
    User.findOneAndDelete({
      _id: req.params.id
    })
      .then(deleteUser => {
        if (!deleteUser) {
          res.status(404).json({ message: "No user found with given id" })
        }
        res.status(200).json(deleteUser)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  },
  // post route -> add friend to existing user by id
  addFriend(req, res) {
    User.findOneAndUpdate({
      _id: req.params.id
    },
      {
        $push: {
          friends: req.params.friendId
        }
      })
      .then(addFriend => {
        if (!addFriend) {
          res.status(404).json({ message: "Error adding friend" })
        }
        res.status(200).json(addFriend)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  },
  // delete route -> remove friend by id
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      {
        _id: req.params.id
      },
      {
        $pull: {
          friends: req.params.friendId
        }
      })
      .then(friend => {
        if (!friend) {
          res.status(404).json({ message: "Error deleting friend" })
        }
        res.status(200).json(friend)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
};