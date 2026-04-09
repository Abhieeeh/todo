# ✨ Modern React Todo App

A full-stack Todo application built with **React**, **Express**, and **PostgreSQL**. This app features a sleek "lite blue and yellow" aesthetic, smooth micro-animations, and a robust authentication system.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

---

## 🚀 Features

- **🔐 Secure Auth**: Built-in Sign Up and Login system using JWT (JSON Web Tokens).
- **🛡️ Password Security**: All user passwords are securely hashed using **bcrypt** before being stored in the database.
- **🎨 Premium UI**: Modern design with a curated color palette (Lite Yellow & Lite Blue).
- **✨ Smooth Animations**:
  - **Add**: Satisfying pulse effect when adding new tasks.
  - **Complete**: "Checkmark pop" animation and task slide-out effect.
  - **Delete**: Trashcan "shake" and row slide-out.
- **📊 Task Management**: Separate views for **Incomplete** and **Completed** tasks.
- **🏷️ Visual Indicators**: Clear dark-mode button indicators to show current filter state.
- **⚡ Fast Performance**: Powered by Vite and PostgreSQL.

---

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Lucide-React (Icons), CSS3 (Custom Design System).
- **Backend**: Node.js, Express.
- **Database**: PostgreSQL (Structured User and Todo tables).
- **Auth**: JWT (JSON Web Tokens).

---

## 📦 Installation & Setup

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd todo
```

### 2. Backend Setup
1. From the root directory, install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the root directory and add your PostgreSQL credentials:
   ```env
   Token_Secret="your_jwt_secret"
   pass="your_database_password"
   host="localhost"
   user="postgres"
   database="Todo"
   port=5432
   ```

### 3. Database Schema
Ensure you have a database named `Todo` with the following tables:

**User Table (`user_auth`):**
```sql
CREATE TABLE user_auth (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL
);
```

**Todo Table (`user_todo`):**
```sql
CREATE TABLE user_todo (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES user_auth(id),
    title TEXT NOT NULL,
    is_completed BOOLEAN DEFAULT false
);
```

### 4. Frontend Setup
1. Navigate to the client folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

---

## 🏃‍♂️ Running the App

### Start Backend
In the root directory:
```bash
nodemon server.js
```

### Start Frontend
In the `client` directory:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🔐 Security

- **Password Hashing**: We use the `bcrypt` library to hash passwords with a salt factor of 10. This ensures that even if the database is compromised, the actual passwords remain protected.
- **JWT Authentication**: Secure tokens are used to manage user sessions, ensuring that only authorized users can access or modify their todos.

## 🌐 Deployment Readiness
The project is structured for easy deployment on **Vercel**.
- **Rewrites**: Configured to route `/auth`, `/login`, and `/todos` to serverless functions.
- **Production DB**: Simply swap the `localhost` variables for a Cloud Database URL (like Neon or Supabase) in your production env settings.

---

## 🤝 Contributing
Feel free to fork this project and submit pull requests for any features or bug fixes!

---
*Built with ❤️ by Abhishek K*
