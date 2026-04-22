# 💬 Real-Time Chat Application (MERN + Socket.IO)

A full-stack real-time chat application built using the MERN stack with Socket.IO for instant messaging. It supports one-to-one chat, real-time updates, and user authentication.

---

## 🚀 Features

### 👤 User Features
- User Signup / Login
- Real-time one-to-one messaging
- Online / Offline status
- Instant message delivery
- Chat history saved in database

### ⚡ Real-Time Features
- Socket.IO based communication
- Live message updates without refresh
- Auto user connection handling

---

## 🧑‍💻 Tech Stack

**Frontend:**
- React.js
- Context API / Redux
- CSS / Tailwind

**Backend:**
- Node.js
- Express.js
- Socket.IO

**Database:**
- MongoDB

**Authentication:**
- JWT (JSON Web Token)

---

## 📂 Project Structure

⚙️ Installation & Setup
1️⃣ Clone the repository

git clone https://github.com/student-bsit/mern_chat-app.git
cd chat-app

2️⃣ Setup Backend

```bash
/frontend   -> React application (UI)
/backend    -> Node.js + Express + Socket.IO server

cd backend
npm install

Create .env file in /backend:

PORT=8000

MONGODB_URL=mongodb+srv://ahteshamrauf9_db_user:<db_password>@cluster0.ejod8cw.mongodb.net/chating

JWT_SECRET=wsk21YUEG23

CLOUDINARY_API_SECRET=oc_pbKKa2Gze7epLQlGQhC9VK0A


3️⃣ Setup Frontend
cd frontend
npm install
npm start


📡 Real-Time Flow (Socket.IO)

User connects → socket established
User sends message → emitted via socket
Server receives message → broadcasts to receiver

🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.
Receiver gets instant update

JWT_SECRET=wsk21YUEG23

npm run dev
