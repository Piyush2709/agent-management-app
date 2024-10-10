const mongoose = require('mongoose');

// Define a schema for the agents collection
const agentSchema = new mongoose.Schema({
    agentId: String,
    status: String,
    brand: String,
});

// Export the model, specifying the collection name as 'agents'
module.exports = mongoose.model('Agent', agentSchema, 'agents'); // 'agents' is the collection name
