require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;
const API_URL = process.env.API_URL; // Fetch API URL from Render env variables

app.use(cors());
app.use(express.json());

app.get("/api/quiz", async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch quiz data" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
