const express = require('express');
const redis = require('redis');

const app = express();
const redisClient = redis.createClient();

// Define the API endpoint to retrieve agent status
app.get('/agents/:agent_id/status', (req, res) => {
  const agentId = req.params.agent_id;

  redisClient.hget(`agent:${agentId}`, 'state', (err, state) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error retrieving agent status' });
      return;
    }

    res.json({ status: state });
  });
});

module.exports = app;