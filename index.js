const express = require('express');
const cors = require('cors');

const db = [
  {
    id: 1,
    username: 'User-1',
    email: 'user-1@gmail.com',
    password: 'password',
    admin: false,
    blogger: true
  },
  {
    id: 2,
    username: 'User-2',
    email: 'user-2@gmail.com',
    password: 'password',
    admin: false,
    blogger: true
  },
  {
    id: 3,
    username: 'User-3',
    email: 'user-3@gmail.com',
    password: 'password',
    admin: false,
    blogger: true
  },
]

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('App working!'));

app.listen(process.env.PORT || 3001, () => console.log('App running on port 3001'));

