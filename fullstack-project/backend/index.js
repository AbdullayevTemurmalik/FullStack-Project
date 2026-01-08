require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas-ga muvaffaqiyatli ulanildi!"))
  .catch((err) => console.error("❌ Ulanishda xato:", err.message));

app.get("/", (req, res) => res.send("Server ishlamoqda!"));

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    await newUser.save();
    res
      .status(201)
      .json({ message: "Foydalanuvchi yaratildi!", user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server http://localhost:${PORT} portida ishga tushdi`)
);
