const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const auth = require('./controllers/auth');
const profile = require('./controllers/profile');


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'redvanisation',
    password : '',
    database : 'kyoormd'
    // connectionString: process.env.DATABASE_URL
    // ssl: true,
  }
});



const app = express();


app.use(express.urlencoded({extended: false}));
app.use(cors());

app.get('/', (req, res) => res.send('App working!'));
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt));
app.post('/auth', (req, res) => auth.handleSignin(req, res, db, bcrypt));
app.get('/users/:id', (req, res) => profile.handleGetUser(req, res, db));


app.listen(process.env.PORT || 3001, () => console.log('App is running on port 3001'));
