const getUserById = require("../db/users/getUserById.js");
const updateUser = require("../db/users/updateUser.js");
//DELETE /api/users/:userId
async function deleteUser(req, res, next) {
  const { userId } = req.params;
  const user = getUserById(userId);
  if (!user) {
    next({
      name: "NotExistingUser",
      message: "User for deletion does not exist",
    });
  } else if (+userId !== +req.user.id) {
    next({
      name: "UnAuthorizedDeletion",
      message: `This user is not allowed to delete the user with id=${userId}`,
    });
  } else {
    try {
      updatedUser = await updateUser(userId, { active: false });
      res.send(updatedUser);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = deleteUser;
