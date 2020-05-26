const handleSignin = (req, res, db, bcrypt) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json('Invalid form submission');
  }

  // db('users').select('*').where({email})
  //     .then(user => {
  //       const isValid = bcrypt.compareSync(password, user[0].password_digest);

  //       if (isValid) {
  //         res.json({
  //           id: user[0].id,
  //           name: user[0].name,
  //           email: user[0].email,
  //           entries: user[0].entries,
  //           joined: user[0].joined
  //         });
  //       } else {
  //         res.status(400).json('Incorrect Email or password');
  //       }
  //     })
  //     .catch(() => res.status(400).json('Error signing in'));

  // const user = db.find(user => user.email === email);

  // console.log(user, email, password);
  const isValid = db.find(user => user.email === email) && bcrypt.compareSync(password, db[0].password);

  if (isValid) {
    res.json({
      id: db[0].id,
      username: db[0].username,
      email: db[0].email,
    });
  } else {
    res.status(400).json('Incorrect Email or password');
  }
}

module.exports = {
  handleSignin: handleSignin
};
