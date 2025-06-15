
# 🛍️ Product Management Dashboard

A full-stack **Product Management Dashboard** built with the **MERN Stack + Next.js**.

This dashboard allows users to **create**, **read**, **update**, and **delete** (CRUD) products with features like:

- 🔍 Search products by **title**
- 🧠 Filter by **category**
- 📄 Paginated product listing
- ⚡ Responsive design
- 🌐 RESTful API with MongoDB

---

## 📁 Folder Structure

The project is split into two main folders:

.
├── client/ # Frontend - Next.js + Tailwind

└── backend / # Backend - Node.js + Express + MongoDB



---

## 🚀 Features Implemented

### ✅ Core Features
- Create a product (with validation)
- Edit a product
- Delete a product
- View all products with title, description, price, category, and image

### 🔍 Bonus Features
- Search products by **title**
- Filter products by **category**
- Pagination (Next/Previous)
- Redux Toolkit for global state management
- Axios for API requests
- Tailwind CSS for styling

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (Local or MongoDB Atlas)

---

### 🔧 Backend Setup

```bash
cd backend
npm install

```
Create a .env file in the root of server/:
```bash
MONGO_URI = mongodburl
PORT = 5000
```

Run the backend server:
```bash
npm run start
# Server will run at http://localhost:5000
```

### 💻 Frontend Setup

Create a .env file in the root of client/:
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```


Run the Frontend server
```bash
cd client
npm install
npm run dev
# Frontend will run at http://localhost:3000
```

## 📬 Postman Collection

You can test all API endpoints using the Postman collection available 
```bash
https://www.postman.com/material-observer-9175587/workspace/webcastle/request/33812661-6a9733eb-2b8a-46f2-b12a-b63a6990591d?action=share&creator=33812661&ctx=documentation
```
It includes pre-configured requests for all CRUD operations related to products.




## 🛠️ Tech Stack
Frontend: Next.js, React, Tailwind CSS, Redux Toolkit, Axios

Backend: Node.js, Express.js, MongoDB, Mongoose





**⚠️ Note
The backend is hosted on Render (free tier), which may take 20–30 seconds to wake up after a period of inactivity. Please allow some time for the API to respond on first load.**
