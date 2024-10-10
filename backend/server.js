const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // Import bcrypt for password hasing. it help to secure my password.
const agentStatusApi = require('./agent-status');
const heartbeatApi = require('./heartbeat');
const agentRoutes = require('./routes/agents'); // Import the agents routes
const Agent = require('./models/Agent'); // Import the Agent model
const purchaseRoute = require('./routes/purchaseRoute');

// Initialize app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Use routes
app.use('/agents', agentRoutes);
app.use('/agents/status', agentStatusApi); // Separate routes to avoid conflict
app.use('/agents/:agent_id/heartbeat', heartbeatApi); // Heartbeat route
app.use('/purchase', purchaseRoute);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/agent_management', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// User schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }, // Hash passwords for security
});

// Ensure the User model is declared only once
const User = mongoose.model('User', userSchema); // Corrected declaration

// API endpoint for user registration
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Validate data (add more validation as needed)
    if (!username || !password) {
        return res.status(400).json({ msg: 'Please provide both username and password' });
    }

    // Hash password before saving to database
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with 10 rounds
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ msg: 'Error registering user' });
    }
});

// API endpoint for user login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid username or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid username or password' });
        }

        console.log('User logged in:', user.username); // Log successful login
        res.json({ msg: 'Login successful', userId: user._id }); // Include user ID if necessary
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
});


app.get('/agents', async (req, res) => {
    try {
        const agents = await Agent.find(); // Fetch agents from the database
        res.json(agents); // Send agents as JSON response
    } catch (err) {
        res.status(500).json({ message: 'Error fetching agents' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
