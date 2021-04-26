function requireActiveUser(req, res, next) {
  const { id } = req.user;

  if (!req.user.active) {
    next({
      name: `InvalidActivityByInActiveUser`,
      message: `In active user is not allowed to perform ${req.method} activity.`,
    });
  }
  next();
}
module.exports = requireActiveUser;
