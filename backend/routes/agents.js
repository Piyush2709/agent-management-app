const express = require('express');
const router = express.Router();
const Agent = require('../models/Agent'); // Import the Agent model

// API endpoint to get agents
router.get('/', async (req, res) => {
    try {
        const agents = await Agent.find(); // Fetch agents from the 'agents' collection
        res.json(agents); // Send agents as JSON response
    } catch (err) {
        res.status(500).json({ message: 'Error fetching agents' });
    }
});

module.exports = router; // Export the router
