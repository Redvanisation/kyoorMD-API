const handlePosts = (req, res, db) => {
  db.select('*').from('posts')
    .then(post => {
      res.json(post);
    })
    .catch(() => res.status(400).json('Error getting the posts'));
}


const handleWritePost = (req, res, db) => {
  const { user_id, title, content } = req.body;

  if (!user_id || !title || !content) {
    res.status(400).json('Invalid submission!');
  }

  db('posts')
    .returning('*')
    .insert({
      title: title,
      content: content,
      user_id: user_id,
      post_created: new Date()
    })
    .then(post => res.json(post[0]))
    .catch(() => res.status(400).json('Unable to submit post!'));
}

const handleGetPost = (req, res, db) => {
  // res.json({
  //   post: post,
  //   comments: data
  // })
  const { id } = req.params;

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
    .catch(() => res.status(400).json('Error getting the post!'));
}

// const handleDeletePost = (req, res, db) => {
//   const { id } = req.params;

//   db('posts')
//   .where('id', id)
//   .del()

// }

module.exports = {
  handlePosts: handlePosts,
  handleWritePost: handleWritePost,
  handleGetPost: handleGetPost
}

