import http from 'http';
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://pvbbmmfescfezjsvfixl.supabase.co'
const supabaseKey = process.env.API_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// Create a single supabase client for interacting with your database
const { data, error } = await supabase
    .from('user')
    .select('*')

console.log(data)

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});