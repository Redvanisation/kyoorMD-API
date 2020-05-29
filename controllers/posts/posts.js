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
  const { id } = req.params;

  db('posts')
  .join('comments', 'posts.id', 'comments.post_id')
  .select('*').where('post_id', id)
    .then(post => res.json(post))
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

