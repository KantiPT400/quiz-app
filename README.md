
# 🧠 ASE Challenge – Full-Stack Timed Quiz App

A full-stack **timed quiz application** built as part of the ASE Challenge (Verto).
It allows users to take quizzes, answer timed questions, and instantly view their score and detailed feedback.

---

## 🚀 Tech Stack

**Frontend:** React (Vite) + TypeScript + TailwindCSS + Shadcn UI
**Backend:** Node.js + Express + SQLite
**Animations:** Framer Motion
**Styling:** TailwindCSS + Shadcn UI Components

---

## ✨ Features

* ⏱️ 60-second timed quiz with **auto-submit**
* 📊 Real-time progress and result tracking
* 💡 Dynamic question fetching from backend
* 💫 Smooth transitions with Framer Motion
* 📱 Responsive, modern UI with Shadcn components
* 🧮 Instant feedback with detailed scoring breakdown

---

---

## ⚙️ Running Locally

### 🖥️ 1️⃣ Backend Setup

```bash
cd backend
npm install
node server.js
```

The backend will start at:
👉 **[http://localhost:5000](http://localhost:5000)**

---

### 🌐 2️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run at:
👉 **[http://localhost:8080](http://localhost:8080)**

---

## 🔐 Environment Variables

Create a `.env` file in both `/backend` and `/frontend` directories.

### Backend (.env)

```
PORT=5000
DATABASE_URL=./quiz.db
```

### Frontend (.env)

```
VITE_API_URL=http://localhost:8080
```

---

## 🔗 API Endpoints

| Method | Endpoint               | Description                      |
| ------ | ---------------------- | -------------------------------- |
| GET    | `/api/questions`       | Fetch all quiz questions         |
| POST   | `/api/submit`          | Submit answers and receive score |
| GET    | `/api/results/:userId` | Get user-specific result data    |

---

## 🧩 Folder Structure

```
quiz-app/
├── backend/        # Node.js + Express + SQLite
│   ├── server.js
│   ├── quiz
│   
|
│
├── frontend/       # React + Vite + TailwindCSS + Shadcn UI
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── utils/
│   ├── public/
│   └── vite.config.ts
│
├── README.md       # Main project documentation
└── package.json
```

---

## 🧰 System Architecture

**Frontend (React)** ↔️ **Backend (Express)** ↔️ **Database (SQLite)**



---



---

## 🧠 Development Notes

* Uses SQLite for simplicity and portability
* TypeScript ensures type-safety across both client and server
* Smooth UI animations built with Framer Motion
* Shadcn UI provides a clean, consistent design system

---

## 👩‍💻 Author

**C. Kanti Prasoona**
🌐 GitHub: [KantiPT400](https://github.com/KantiPT400)
📧 Email: kantic345@gmail.com

---

---

### ✅ Step 3. Commit & Push

```bash
git add README.md
git commit -m "Added main README for ASE submission"
git push
```

---

✨ *Built with React, Express, and a lot of curiosity!*
