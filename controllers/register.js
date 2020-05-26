const handleRegister = (req, res, db, bcrypt) => {
  const { username, email, password } = req.body;
  
  if (!username || !email || !password) {
    return res.status(400).json('Invalid form submission');
  }

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
        // Store hash in your password DB.
        // db('users')
        //   .returning('*')
        //   .insert({
        //     name: name,
        //     email: email,
        //     password_digest: hash,
        //     joined: new Date()
        //   })
        //   .then(user => res.json(user[0]))
        //   .catch((err) => res.status(400).json('Unable to register!'));
        
        try {
          db.push({
            id: Date.now().toString(),
            username: req.body.username,
            email: req.body.email,
            password: hash,
            admin: false,
            blogger: true
          })
          res.json(db[0]);
      } catch (e){
        // res.send('Error registring')
        res.send(e)
      }

    });
  });
}

module.exports = {
  handleRegister: handleRegister
};
