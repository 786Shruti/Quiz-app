const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORS

// Proxy endpoint to fetch quiz data
app.get("/api/quiz", async (req, res) => {
  try {
    const response = await axios.get("https://api.jsonserve.com/Uw5CrX");
    res.json(response.data); // Forward the API response to frontend
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch quiz data" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
