require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

// Port from environment variable or default to 5000
const PORT = process.env.PORT || 5000;

// API URL fetched from environment variables
const API_URL = process.env.API_URL; 

// CORS configuration to allow requests from your frontend URL
const corsOptions = {
  origin: "https://quizappshruti.netlify.app",  // Allow only your frontend domain
  methods: ["GET", "POST"],  // Specify allowed methods
  allowedHeaders: ["Content-Type"],  // Allow headers
};

app.use(cors(corsOptions));  // Apply the CORS settings to all routes
app.use(express.json());  // Parse incoming requests with JSON payload

// Proxy endpoint to fetch quiz data from external API
app.get("/api/quiz", async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    res.json(response.data);  // Forward the fetched data to the frontend
  } catch (error) {
    // Catch any errors and send a proper response
    console.error("Error fetching quiz data:", error);
    res.status(500).json({ error: "Failed to fetch quiz data" });
  }
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
