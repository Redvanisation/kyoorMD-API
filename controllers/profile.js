const handleGetUser = (req, res, db) => {
  const { id } = req.params;

  // db.select('*').from('users').where({id})
  //   .then(user => {
  //     if (user.length) {
  //       res.json({
  //         name: user[0].name,
  //         email: user[0].email,
  //         entries: user[0].entries,
  //         joined: user[0].joined
  //       });
  //     }
  //     else {
  //       res.status(404).json('Error fiding the user');
  //     }
  //   })
  //   .catch(() => res.status(400).json('Error fiding the user'));

  const user = db.find(user => user.id === id);

  if (user) {
    res.json({
      username: user.username,
      email: user.email
    });
  } 
  else {
    res.status(404).json('Error fiding the user');
  }
}


module.exports = {
  handleGetUser: handleGetUser,
};
