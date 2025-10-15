<h1 align="center">🍱 Reels Foods App</h1>
<p align="center">
A modern MERN-based food reels platform where users can share, explore, and interact with short food videos.  
Built with ❤️ by <strong>Divyansh Raj Tripathi (xoxo)</strong>
</p>

---

## 🧠 Overview

**Reels Foods App** is a **mobile-first web application** built with the **MERN stack (MongoDB, Express.js, React.js, Node.js)**.  
It combines the fun of short-form videos with the theme of food — allowing users and food partners to connect through creativity and taste.  

The platform features:
- 🎥 Short food reels uploading & viewing  
- ❤️ Like, comment, and save functionalities  
- 👥 Separate user and food partner accounts  
- 🔐 Authentication and route protection  
- 📱 Fully responsive UI (mobile-first design)

---

## 🌐 Tech Stack
```
| Category | Technology |
|-----------|-------------|
| **Frontend** | React.js, CSS3, React Router DOM |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose) |
| **Authentication** | JWT (JSON Web Token), Cookies |
| **Other Tools** | Axios, React Hot Toast, Multer, Cloudinary |
```
---

## 🗺️ Project Structure
```
Reels-Foods-App/
│
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── server.js
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ ├── styles/
│ │ └── App.js
│ └── public/
│
└── package.json
```
---
## ⚙️ How It Works

### 🔑 Authentication Flow
- **Register & Login** for both **Users** and **Food Partners**
- Tokens stored securely using **HTTP-only cookies**
- **Protected Routes** ensure only authenticated users can access dashboard or create posts

### 🧾 Routes Explanation

#### 🔹 User Routes (`/api/user`)
| Method | Route | Description |
|--------|--------|-------------|
| `POST` | `/register` | Register a new user |
| `POST` | `/login` | Login existing user |
| `GET` | `/profile` | Get logged-in user details |
| `POST` | `/logout` | Logout user |

#### 🔹 Food Partner Routes (`/api/partner`)
| Method | Route | Description |
|--------|--------|-------------|
| `POST` | `/register` | Register as a food partner |
| `POST` | `/login` | Login as a food partner |
| `GET` | `/foods` | Get foods created by this partner |
| `POST` | `/create` | Upload a new food reel/video |
| `DELETE` | `/delete/:id` | Delete a food post |

#### 🔹 Food Routes (`/api/food`)
| Method | Route | Description |
|--------|--------|-------------|
| `GET` | `/all` | Fetch all food reels |
| `GET` | `/saved` | Fetch saved food posts for a user |
| `POST` | `/like/:id` | Like or unlike a reel |
| `POST` | `/save/:id` | Save or unsave a reel |

---

## 🎨 UI & Features

### 📱 Default Mobile Layout
The app is designed **mobile-first**, optimized for smooth scrolling and touch-friendly controls.

| Feature | Description |
|----------|--------------|
| **Home Feed** | Displays all food reels with like, save, and comment buttons |
| **Reel Player** | Auto-play videos in smooth transitions |
| **User Auth** | Separate login/register for users and partners |
| **Create Food** | Food partners can upload new food videos with details |
| **Profile** | View personal uploads, saved posts, and logout options |

---

## 🎥 Project Showcase

### 📱 Mobile View (Default)
*(Demo of the main UI in mobile layout)*  
> ![Mobile Demo](./assets/mobile-demo.gif)  
*(Replace with your actual MP4 or GIF later)*  

### 🖥️ Desktop View (Responsive)
*(Showcase of desktop responsiveness)*  
> ![Desktop Demo](./assets/desktop-demo.gif)

---

## 🧩 Additional Features

- 🌈 **Responsive Design:** Works seamlessly across all screen sizes  
- 💾 **Multer + Cloudinary:** Handles media uploads securely  
- 🧱 **Reusable Components:** Modular structure for scalability  
- 🔔 **Real-time Feedback:** Integrated with React Hot Toast for instant notifications  
- 🌐 **Clean API Handling:** Using Axios with proper error management

---

## 🚀 Getting Started

### 📦 Installation

```bash
# Clone the repository
git clone https://github.com/xoxo-Divyansh/Reels-Foods-app.git

# Install dependencies for frontend & backend
cd backend && npm install
cd ../frontend && npm install
```
▶️ Run the App
```bash
Copy code
# Start backend (from /backend)
npm run dev
``` 
# Start frontend (from /frontend)
```npm start
The app runs on http://localhost:5173 (frontend) and http://localhost:3000 (backend).
```
🧠 Future Improvements
💬 Real-time chat for food partners & users

🧵 Comment threading system

⚡ Live upload progress indicator

🌍 Global search & discovery feed

🪶 Credits
Created and developed by Divyansh Raj Tripathi (xoxo)

"Built with creativity, persistence, and a passion for beautiful code."

<p align="center"> 🖤🟣 <strong>Echoes of xoxo</strong> — where code meets creativity. </p> ```






