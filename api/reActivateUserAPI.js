const getUserById = require("../db/users/getUserById.js");
const updateUser = require("../db/users/updateUser.js");
//DELETE /api/users/:userId
async function reActivateUser(req, res, next) {
  const { userId } = req.params;
  const user = await getUserById(userId);
  if (!user) {
    next({
      name: "NotExistingUser",
      message: "User for reactivation does not exist",
    });
  } else if (+userId !== +req.user.id) {
    next({
      name: "UnAuthorizedReactivation",
      message: `This user is not allowed to reactivate the user with id=${userId}`,
    });
  } else {
    try {
      updatedUser = await updateUser(userId, { active: true });
      res.send(updatedUser);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = reActivateUser;
