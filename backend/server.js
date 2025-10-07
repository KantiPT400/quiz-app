const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect or create DB file
const dbPath = path.resolve(__dirname, "quiz.db");
const db = new sqlite3.Database(dbPath, err => {
  if (err) console.error("❌ Failed to connect:", err.message);
  else console.log("✅ Connected to SQLite database at", dbPath);
});

// ✅ Sequential initialization
db.serialize(() => {
  // Create table if not exists
  db.run(`
    CREATE TABLE IF NOT EXISTS questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT,
      optionA TEXT,
      optionB TEXT,
      optionC TEXT,
      optionD TEXT,
      correct TEXT
    )
  `);

  // Seed only if empty
  db.get("SELECT COUNT(*) AS count FROM questions", (err, row) => {
    if (err) return console.error("❌ DB query error:", err.message);

    if (row.count === 0) {
      console.log("🧠 Seeding initial quiz data...");
      const stmt = db.prepare(
        "INSERT INTO questions (text, optionA, optionB, optionC, optionD, correct) VALUES (?, ?, ?, ?, ?, ?)"
      );
      stmt.run("2 + 2 = ?", "3", "4", "5", "6", "4");
      stmt.run("Capital of France?", "Berlin", "Paris", "Rome", "London", "Paris");
      stmt.run("Color of the sky?", "Blue", "Green", "Red", "Yellow", "Blue");
      stmt.finalize();
    }
  });
});

// ✅ Endpoint 1 — Fetch questions (no answers)
app.get("/quiz/questions", (req, res) => {
  db.all("SELECT id, text, optionA, optionB, optionC, optionD FROM questions", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const formatted = rows.map(q => ({
      id: q.id,
      text: q.text,
      options: [q.optionA, q.optionB, q.optionC, q.optionD],
    }));
    res.json(formatted);
  });
});

// ✅ Endpoint 2 — Score calculation
app.post("/quiz/submit", (req, res) => {
  const { answers } = req.body;
  if (!answers) return res.status(400).json({ error: "Missing answers" });

  db.all("SELECT id, correct FROM questions", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    let score = 0;
    const results = rows.map(q => {
      const userAns = answers[q.id];
      const isCorrect = userAns === q.correct;
      if (isCorrect) score++;
      return { id: q.id, userAns, correct: q.correct, isCorrect };
    });
    res.json({ score, total: rows.length, results });
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Backend running at http://localhost:${PORT}`));
