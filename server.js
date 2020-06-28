const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');
const morgan = require('morgan');



const register = require('./controllers/users/register');
const auth = require('./controllers/users/auth');
const profile = require('./controllers/users/profile');
const posts = require('./controllers/posts/posts');
const comments = require('./controllers/comments/comments');


const db = knex({
  client: 'pg',
  connection: {
    // host : '127.0.0.1',
    // user : 'redvanisation',
    // password : '',
    // database : 'kyoormd'
    connectionString: process.env.DATABASE_URL
    // ssl: true,
  }
});



const app = express();
app.use(morgan('dev'));

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('App working!'));
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt));
app.post('/auth', (req, res) => auth.handleSignin(req, res, db, bcrypt));
app.get('/users/:id', (req, res) => profile.handleGetUser(req, res, db));

app.get('/posts', (req, res) => posts.handlePosts(req, res, db));
app.get('/posts/:id', (req, res) => posts.handleGetPost(req, res, db));
app.post('/posts/new', (req, res) => posts.handleWritePost(req, res, db));

app.post('/comments/new', (req, res) => comments.handleWriteComment(req, res, db));

app.get('/comments', (req, res) => {
  db.select('*').from('comments')
    .then(cm => res.json(cm));
})




app.listen(process.env.PORT || 5000, () => console.log('App is running on port 5000'));
