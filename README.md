
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
https://.postman.co/workspace/barosa~67c6edd6-d51b-4b82-a138-2129340ad1d3/collection/33812661-194f3ac9-1fad-453c-81fa-e006b84118d3?action=share&creator=33812661&active-environment=33812661-b362c96a-24fd-476f-a3a8-52244eb90916
```
It includes pre-configured requests for all CRUD operations related to products.




## 🛠️ Tech Stack
Frontend: Next.js, React, Tailwind CSS, Redux Toolkit, Axios

Backend: Node.js, Express.js, MongoDB, Mongoose





**⚠️ Note
The backend is hosted on Render (free tier), which may take 20–30 seconds to wake up after a period of inactivity. Please allow some time for the API to respond on first load.**
