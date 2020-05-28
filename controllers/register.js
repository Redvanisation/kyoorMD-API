const handleRegister = (req, res, db, bcrypt) => {
  const { username, email, password, gravatar } = req.body;
  
  if (!username || !email || !password) {
    return res.status(400).json('Invalid form submission');
  }

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
        // Store hash in your password DB.
        db('users')
          .returning('*')
          .insert({
            username: username,
            email: email,
            password_digest: hash,
            gravatar: gravatar,
            joined: new Date()
          })
          .then(user => res.json(user[0]))
          .catch((err) => res.status(400).json('Unable to register!'));
    });
  });
}

module.exports = {
  handleRegister: handleRegister
};
