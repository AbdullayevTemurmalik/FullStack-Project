import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/register", {
        name,
        email,
        password,
      });

      setMessage("Muvaffaqiyatli ro'yxatdan o'tdingiz! ✅");

      setName("");
      setEmail("");
      setPassword("");

      console.log(response.data);
    } catch (error) {
      setMessage(
        "Xatolik: " + (error.response?.data?.error || "Server bilan aloqa yo'q")
      );
      console.error(error);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleRegister}>
        <h2>Ro'yxatdan o'tish</h2>

        <div className="input-group">
          <label>Ism:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Ismingizni kiriting"
          />
        </div>

        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="example@mail.com"
          />
        </div>

        <div className="input-group">
          <label>Parol:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="********"
          />
        </div>

        <button type="submit">Yuborish</button>

        {message && (
          <p
            className={
              message.includes("Xatolik") ? "error-msg" : "success-msg"
            }
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default App;
