const express = require('express');
const router = express.Router();
const PurchasedAgent = require('../models/PurchasedAgent'); // Ensure the model is correctly defined

// POST route for agent purchase
router.post('/purchase', async (req, res) => {
    try {
        console.log('Request body:', req.body); // Log incoming request data
        const { agentId, agentName, userId, userName } = req.body;

        const purchasedAgent = new PurchasedAgent({
            agentId,
            agentName,
            userId,
            userName
        });

        await purchasedAgent.save();
        res.status(201).json({ message: 'Agent purchased successfully' });
    } catch (error) {
        console.error('Error saving purchased agent:', error);
        res.status(500).json({ message: 'Error purchasing agent' });
    }
});


module.exports = router;
