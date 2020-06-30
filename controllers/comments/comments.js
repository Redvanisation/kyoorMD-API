const handleWriteComment = (req, res, db) => {
  const { user_id, body } = req.body;
  const id = req.body.post_id;

  if (!user_id || !id || !body) {
    res.status(400).json('Invalid submission!');
  }

  db('comments')
    .returning('*')
    .insert({
      body: body,
      user_id: user_id,
      post_id: id,
      comment_created: new Date()
    })
    .then(() => {
      db.select('*').from('posts').where({id})
      .then(post => {
        db('comments').join('users', 'comments.user_id', 'users.id').select('comments.id', 'comments.body', 'comments.comment_created', 'users.id', 'users.username', 'users.email', 'users.gravatar', 'users.blogger').where({'comments.post_id': id})
        .then(data => {
          res.json({
            post: post[0],
            comments: data
          })
        });
      })
      // .catch(() => res.status(400).json('Error getting the post!'));
    })
    .catch(() => res.status(400).json('Unable to add the comment!'));
}

module.exports = {
  handleWriteComment: handleWriteComment
}