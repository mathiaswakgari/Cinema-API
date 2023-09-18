const admin = (req, res, next) => {
  const { isAdmin } = req.user;

  if (!isAdmin) return res.status(403).send("Access Denied.");
  next();
};
module.exports = admin;
