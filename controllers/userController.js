const { User, Thought } = require("../models");

module.exports = {

   async getAllUser (req, res) {
         try { 
        const user = await User.find();
        res.json(user);
       } catch (err) {
         res.status(500).json(err);
       }
     },

async getOneUser (req, res) {
    try{
        const user = await User.findOne({_id: req.params.userId})
        .select('-__v');
        
        if (!user) {
            return res.status(404).json({message: "No User with that ID"});
        }
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
  },
  async createUser (req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            return res.status(500).json(err);
        }
  },

async updateUser (req, res) {
      try {
        const user = await User.findOneAndUpdate(
            {_id: req.params.userId},
            {$set: req.body},
            { runValidators: true, new: true}
        );
        if(!user) {
            res.status(404).json({message: 'No User with that ID'})
        }
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
},
  async deleteUser (req, res) {
        try {
            const user = await User.findOneAndDelete({_id: req.params.userId});
            if (!user) {
                res.status(404).json({message: "That user doesn't exist"});
            }
            // deletes attached thoughts when user is deleted
            await Thought.deleteMany({_id: {$in: user.thoughts}});
            res.json({message: "User and thoughts deleted"});
        } catch (err) {
            res.status(500).json(err);
        }
  },
   async addFriend (req, res) {
    try {
        const user = await User.findOneAndUpdate(
            {_id: req.params.userId},
            { $addToSet: { friends: req.params.friendId}},
            {runValidators: true, new: true}
        )
        if(!user) {
            res.status(404).json({message: 'No User with that ID'})
        }
        res.json(user);
      
    } catch (err) {
        res.status(500).json(err);
    }
   },
     deleteFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { friends: req.params.friendId } },
          { new: true }
        )
          .then(
            (user) =>
              !user
                ? res.status(404).json({ message: "No User find with this ID!" })
                : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },


}; // end bracket