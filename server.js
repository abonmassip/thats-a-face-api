import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';

import { handleRegister } from './controllers/register.js';
import { handleSignin } from './controllers/signin.js';
import { handleProfileGet } from './controllers/profile.js';
import { handleImage, handleApiCall } from './controllers/image.js';

// const db = knex({
//   client: 'pg',
//   connection: {
//     host : '127.0.0.1',
//     port : 5432,
//     user : 'postgres',
//     password : 'test',
//     database : 'thats-a-face'
//   }
// });
const db = knex({
  client: 'pg',
  connection: {
    host : 'db.kbossnxfxylnteiukmtb.supabase.co',
    port : 5432,
    user : 'postgres',
    password : process.env.DB_PASSWORD,
    database : 'postgres'
  }
});

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('success'));
app.post('/signin', handleSignin(db, bcrypt));
app.post('/register', handleRegister(db, bcrypt));
app.get('/profile/:id', handleProfileGet(db));
app.put('/image', handleImage(db));
app.post('/imageurl', handleApiCall);

app.listen(process.env.PORT || 3001, () => console.log(`app is running on port ${process.env.PORT || '3001'}`));
