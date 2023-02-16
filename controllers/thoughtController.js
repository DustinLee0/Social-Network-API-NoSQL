const { Thought } = require('../models');

module.exports = {
    // Get all thoughts
    getThoughts(req, res) {
        Thought.find({})
            //   .select('-__v')
            .populate({
                path: 'reactions',
                v: '-__V'
            })
            .then(thoughts => res.status(200).json(thoughts))
            .catch(err => res.status(500).json(err))
    },
    // get one thought by id
    getThoughtById(req, res) {
        Thought.findOne({
            _id: req.params.id
        })
            .populate({
                path: 'reactions',
                v: '-__V'
            })
            .then(thought => {
                if (!thought) {
                    res.status(404).json({ message: 'No thought found' })
                }
                res.status(200).json(thought)
            })
            .catch(err => res.status(500).json(err))
    },
    // create a new student
    createThought(req, res) {
        Thought.create(req.body)
            .then(thought => res.json(thought))
            .catch(err => res.status(500).json(err))
    },
    // update thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            req.body
        )
            .then(updateThought => {
                if (!updateThought) {
                    res.status(404).json({ message: "No thought found with given id" })
                }
                res.status(200).json(updateThought)
            })
            .catch(err => res.status(500).json(err))
    },
    // delete thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({
            _id: req.params.id
        })
            .then(deleteThought => {
                if (!deleteThought) {
                    res.status(404).json({ message: "No thought found with given id" })
                }
                res.status(200).json(deleteThought)
            })
            .catch(err => res.status(500).json(err))
    },
    // post route -> add reaction by id
    addReaction(req, res) {
        Thought.findOneAndUpdate({
            _id: req.params.id
        },
            {
                $push: {
                    reactions: req.body
                }
            })
            .then(reaction => res.status(200).json(reaction))
            .catch(err => res.status(500).json(err))
    },
    // delete reaction by id
    deleteReaction(req, res) {
        Thought.findOneAndUpdate({
                _id: req.params.id
            },
            {
                $pull: {
                    reactions: {
                        reactionID: req.params.reactionID
                    }
                }
            })
            .then(deletedReaction => {
                if (!deletedReaction) {
                    res.status(404).json({ message: "Error deleting reaction" })
                }
                res.status(200).json(deletedReaction)
            })
            .catch(err => res.status(500).json(err))
    }
};