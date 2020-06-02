const handleWriteComment = (req, res, db) => {
  const { user_id, post_id, body } = req.body;

  if (!user_id || !post_id || !body) {
    res.status(400).json('Invalid submission!');
  }

  db('comments')
    .returning('*')
    .insert({
      body: body,
      user_id: user_id,
      post_id: post_id,
      comment_created: new Date()
    })
    .then(comment => res.json(comment[0]))
    .catch(() => res.status(400).json('Unable to submit comment!'));
}

module.exports = {
  handleWriteComment: handleWriteComment
}