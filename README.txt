# Food Delivery Website (Frontend + Backend + Admin)

## Overview
This is a complete Food Delivery Website project including:
- Frontend (React)
- Backend (Node.js + Express)
- Admin Panel (React)

Users can browse food items, add to cart, place orders, and admins can manage products and orders.

---

## Installation

### Step 1: Extract Project
Unzip the downloaded file and open the project in VS Code.

### Step 2: Install Dependencies
Go into each folder (`frontend`, `backend`, `admin`) and run:
npm install

---

## Database Setup
This project uses MongoDB.

1. Install MongoDB locally or create a free MongoDB Atlas account.
2. Create a database named `food-delivery`.
3. In the `backend` folder, create a `.env` file with:
MONGO_URI=mongodb://localhost:27017/food-delivery
PORT=5000
JWT_SECRET=yourSecretKey

Code

---

## Run Project

### Backend
cd backend
npm run dev

Code

### Frontend
cd frontend
npm start

Code

### Admin Panel
cd admin
npm start

Code

---

## Default Admin Login
Email: admin@example.com  
Password: password123  

---

## Demo
Frontend Demo: https://food-del-frontend-0tsx.onrender.com

---

## Notes
- Make sure Node.js and npm are installed.
- Update `.env` values as per your environment.
- You can customize products, categories, and UI as needed.

For updates, support and licensing, visit the official product page on Codester:
https://www.codester.com/items/67791/food-delivery-website-full-stack-code?ref=WebSolutions

