const handleGetUser = (req, res, db) => {
  const { id } = req.params;

  db.select('*').from('users').where({id})
    .then(user => {
      if (user.length) {
        res.json({
          id: user[0].id,
          username: user[0].username,
          email: user[0].email,
          gravatar: user[0].gravatar,
          joined: user[0].joined
        });
      }
      else {
        res.status(404).json('Error fiding the user');
      }
    })
    .catch(() => res.status(400).json('Error fiding the user'));
}


module.exports = {
  handleGetUser: handleGetUser,
};
