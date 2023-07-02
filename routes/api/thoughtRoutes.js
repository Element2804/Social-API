const router = require('express').Router();

const {
    getAllThought,
    createThought,
    getOneThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction

} = require('../../controllers/thoughtController');


router.route('/').get(getAllThought).post(createThought);

// target by ID endpoint
router.route('/:thoughtId')
.get(getOneThought)
.put(updateThought)
.delete(deleteThought)


// end point for creating reactions
router.route('/:thoughtId/reactions')
.post(createReaction);

// end point for reactions with the Id attached for specific deletion
router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);


module.exports = router;