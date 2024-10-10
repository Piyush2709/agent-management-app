const express = require('express');
const redis = require('redis');

const app = express();
const redisClient = redis.createClient();

// Define the API endpoint to handle heartbeat requests
app.post('/agents/:agent_id/heartbeat', (req, res) => {
  const agentId = req.params.agent_id;

  // Update agent state to active
  redisClient.hset(`agent:${agentId}`, 'state', 'Active');
  redisClient.hset(`agent:${agentId}`, 'last_heartbeat', Date.now());

  res.json({ message: 'Heartbeat received' });
});

module.exports = app;