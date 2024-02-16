const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Example questionnaire data
const questionnaire = [
  {
    id: 1,
    question: "On a scale from 1 to 10, how would you rate your pain today?",
    followUp: "You said in our last meeting your pain was a {previousRating}, what is it today?",
    type: "rating"
  },
  // Add more questions as needed
];

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint to fetch questionnaire
app.get('/api/questionnaire', (req, res) => {
  // In a real application, you would fetch the questionnaire data from a database
  // Here, we're just sending the hardcoded questionnaire data
  res.json(questionnaire);
});

// Endpoint to handle submitting questionnaire responses
app.post('/api/questionnaire/submit', (req, res) => {
  // In a real application, you would process the submitted questionnaire responses here
  const responses = req.body;
  console.log('Received questionnaire responses:', responses);
  
  // Respond with a success message
  res.json({ message: 'Questionnaire responses submitted successfully!' });
});

// Define a route handler for GET requests to /api/pain-scores
app.get('/api/pain-scores', (req, res) => {
  // In a real application, you would fetch the previous pain scores data from a database
  // Here, we're just sending a sample response
  const previousScores = [
    { date: '2024-02-10', level: 3 },
    { date: '2024-02-09', level: 5 },
    // Add more previous scores as needed
  ];
  res.json(previousScores);
});

// Middleware for handling multipart/form-data (profile picture upload)
const upload = multer({ dest: 'uploads/' }); // Destination folder for uploaded files

// Example user profile data
let userProfile = {
  profilePic: 'default_profile.jpg',
  telephone: '+1234567890',
  password: 'hashed_password', // You should never store passwords in plain text
};

// Endpoint to fetch user profile
app.get('/api/profile', (req, res) => {
  res.json(userProfile);
});

// Endpoint to update profile picture
app.post('/api/profile/update-picture', upload.single('profilePic'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  // Update user profile picture (save file path or URL to database)
  userProfile.profilePic = req.file.path;
  res.json({ message: 'Profile picture updated successfully' });
});

// Endpoint to update telephone number
app.put('/api/profile/update-telephone', (req, res) => {
  const { telephone } = req.body;
  // Update user telephone number (save to database)
  userProfile.telephone = telephone;
  res.json({ message: 'Telephone number updated successfully' });
});

// Endpoint to reset password
app.put('/api/profile/reset-password', (req, res) => {
  // Logic to reset password (generate new password, send email, etc.)
  // For demonstration purposes, we'll just send a success message
  res.json({ message: 'Password reset successfully' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
