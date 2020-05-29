const handleSignin = (req, res, db, bcrypt) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json('Invalid form submission');
  }

  db('users').select('*').where({email})
      .then(user => {
        const isValid = bcrypt.compareSync(password, user[0].password_digest);

        if (isValid) {
          const currentUser = {
            id: user[0].id,
            username: user[0].username,
            email: user[0].email,
            gravatar: user[0].gravatar,
          }

          res.json({
            currentUser
          });
        } else {
          res.status(400).json('Incorrect Email or password');
        }
      })
      .catch(() => res.status(400).json('Incorrect Email or password'));
}

module.exports = {
  handleSignin: handleSignin
};
