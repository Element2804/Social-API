const router = require('express').Router();

const {
    getAllUser,
    createUser,
    deleteUser,
    getOneUser,
    updateUser,
    addFriend,
    deleteFriend
   
} = require('../../controllers/userController');

// routes GET and POST for the api/users endpoint
router.route('/').get(getAllUser).post(createUser);

// endpoint to target specific users
router.route('/:userId')
.get(getOneUser)
.put(updateUser)
.delete(deleteUser)

router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend)


module.exports = router;