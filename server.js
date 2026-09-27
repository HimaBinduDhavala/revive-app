const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const users = [];

app.post('/api/auth/signup', (req, res) => {
  const { fullName, email, phone, password, confirmPassword } = req.body;

  if (!fullName || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'Please complete all required fields.' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match.' });
  }

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(409).json({ message: 'An account with this email already exists.' });
  }

  const user = {
    id: Date.now().toString(),
    fullName,
    email,
    phone: phone || '',
    role: 'user'
  };

  users.push(user);
  res.status(201).json({ message: 'Account created successfully.', user });
});

app.post('/api/auth/login', (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ message: 'Please enter your credentials.' });
  }

  const user = users.find((entry) => (entry.email === identifier || entry.phone === identifier));
  if (!user) {
    return res.status(401).json({ message: 'No account found with that email or phone.' });
  }

  if (password.length < 6) {
    return res.status(401).json({ message: 'Incorrect password.' });
  }

  res.json({ message: 'Login successful.', user });
});

app.post('/api/auth/social-login', (req, res) => {
  const { provider, email } = req.body;

  if (!provider || !email) {
    return res.status(400).json({ message: 'Social login details are incomplete.' });
  }

  let user = users.find((entry) => entry.email === email);
  if (!user) {
    user = {
      id: Date.now().toString(),
      fullName: `Social ${provider} user`,
      email,
      phone: '',
      role: 'user'
    };
    users.push(user);
  }

  res.json({ message: `${provider} login successful.`, user });
});

app.listen(port, () => {
  console.log(`Auth server running on http://localhost:${port}`);
});
