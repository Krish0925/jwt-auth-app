const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));

app.use(express.json());

const PORT = 5000;
const SECRET = "mysecretkey";

const user = {
  email: "student@conestoga.ca",
  password: "password123"
};

app.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (email === user.email && password === user.password) {
      const token = jwt.sign({ email }, SECRET, { expiresIn: "1h" });

      return res.json({ token });
    }

    return res.status(401).json({ error: "Invalid credentials" });

  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
});

app.get("/users", (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "No token" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, SECRET);

    return res.json([
      { id: 1, name: "John Doe", email: "john@test.com" },
      { id: 2, name: "Jane Smith", email: "jane@test.com" }
    ]);

  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
});

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});