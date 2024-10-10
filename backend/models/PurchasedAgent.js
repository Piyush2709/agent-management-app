const mongoose = require('mongoose');

const purchasedAgentSchema = new mongoose.Schema({
    agentId: {
        type: String,
        required: true
    },
    agentName: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    }
});

const PurchasedAgent = mongoose.model('PurchasedAgent', purchasedAgentSchema);

module.exports = PurchasedAgent;
