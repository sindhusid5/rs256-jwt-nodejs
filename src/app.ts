import express from 'express';
import bodyParser from 'body-parser';
import { generateToken, verifyToken } from './auth';

const app = express();
app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: 'Username required' });

  const token = generateToken({ username, role: 'user' });
  res.json({ token });
});

app.get('/profile', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];

  try {
    const user = verifyToken(token);
    res.json({ message: 'Profile data', user });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return res.status(401).json({ error: errorMessage });
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
