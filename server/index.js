
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Internship data for the portal
const internships = [
  {
    id: "1",
    title: "Frontend Developer Intern",
    company: "TechNova",
    location: "Remote",
    duration: "3 months",
    stipend: "₹8,000/month",
    description: "Build responsive interfaces using React and JavaScript."
  },
  {
    id: "2",
    title: "Python Developer Intern",
    company: "CodeCraft",
    location: "Coimbatore",
    duration: "4 months",
    stipend: "₹10,000/month",
    description: "Develop Python applications and work with REST APIs."
  },
  {
    id: "3",
    title: "Data Analyst Intern",
    company: "InsightWorks",
    location: "Hybrid",
    duration: "3 months",
    stipend: "₹7,000/month",
    description: "Analyze datasets using Python, Pandas, and visualization tools."
  }
];

// Mongoose schema
const applicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    rollNumber: {
      type: String,
      required: true,
      trim: true
    },
    internshipId: {
      type: String,
      required: true
    },
    internshipTitle: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);

// Health check
app.get("/", (req, res) => {
  res.json({
    message: "Student Internship Portal API is running",
    status: "OK"
  });
});

// Get available internships
app.get("/api/internships", (req, res) => {
  res.json(internships);
});

// Get one internship
app.get("/api/internships/:id", (req, res) => {
  const internship = internships.find((item) => item.id === req.params.id);

  if (!internship) {
    return res.status(404).json({ message: "Internship not found" });
  }

  res.json(internship);
});

// Submit an application
app.post("/api/applications", async (req, res) => {
  try {
    const { name, email, rollNumber, internshipId } = req.body;

    if (!name?.trim() || !email?.trim() || !rollNumber?.trim() || !internshipId) {
      return res.status(400).json({
        message: "Please complete all required fields."
      });
    }

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!validEmail.test(email.trim())) {
      return res.status(400).json({
        message: "Please enter a valid email address."
      });
    }

    const internship = internships.find(
      (item) => item.id === String(internshipId)
    );

    if (!internship) {
      return res.status(400).json({
        message: "Please select a valid internship."
      });
    }

    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        message: "Database is not connected. Please try again later."
      });
    }

    const application = await Application.create({
      name,
      email,
      rollNumber,
      internshipId: internship.id,
      internshipTitle: internship.title
    });

    res.status(201).json({
      message: "Application submitted successfully!",
      application
    });
  } catch (error) {
    console.error("Application error:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Please check your application details."
      });
    }

    res.status(500).json({
      message: "Unable to submit your application. Please try again."
    });
  }
});

// Retrieve submitted applications
app.get("/api/applications", async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        message: "Database is not connected."
      });
    }

    const applications = await Application.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    console.error("Retrieval error:", error);
    res.status(500).json({
      message: "Unable to retrieve applications."
    });
  }
});

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "API endpoint not found" });
});

// Start only after the database connects
async function startServer() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from the environment");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Internship API running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
}

startServer();
