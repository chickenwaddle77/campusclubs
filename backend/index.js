import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import express from 'express';
import cors from 'cors';
const app = express();

const supabaseUrl = 'https://pvbbmmfescfezjsvfixl.supabase.co'
const supabaseKey = process.env.API_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

app.use(cors());
app.use(express.json());
export { supabase };

// Create a single supabase client for interacting with your database
const { data, error } = await supabase
    .from('user')
    .select('*')
console.log(data)

import newUser from './routes/newUser.js';

app.use('/api', newUser);

app.get('/', (req, res) => {
  res.send('campusclubs API');
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});