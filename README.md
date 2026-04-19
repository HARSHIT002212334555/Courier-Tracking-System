# 🚚 Courier Tracking System

A full-stack web application to track parcels in real-time with status updates, progress bar, timeline view, and admin dashboard.

---

## 📌 Features

* 📦 Parcel Tracking by Tracking ID
* 📊 Progress Bar (0–100%)
* 📍 Live Location Map (Google Maps)
* 🕒 Timeline Status (Flipkart-style UI)
* 📅 Estimated Delivery Date
* 🧑‍💼 Admin Dashboard

  * Add Parcel
  * Update Status
  * View All Parcels
  * Delete Parcel

---

## 🛠️ Tech Stack

* **Frontend:** HTML, CSS, JavaScript
* **Backend:** Node.js, Express.js
* **Database:** MySQL

---

## 📂 Project Structure

```
Courier Tracking System/
│
├── frontend/
│   ├── index.html
│   ├── dashboard.html
│   ├── login.html
│   ├── style.css
│   ├── login.css
│   └── script.js
│
├── backend/
│   ├── server.js
│   └── db.js
│
├── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```
git clone https://github.com/your-username/courier-tracking-system.git
cd courier-tracking-system
```

---

### 2️⃣ Install Dependencies

```
npm install
```

---

### 3️⃣ Setup MySQL Database

Create database:

```
CREATE DATABASE courier_db;
USE courier_db;
```

Create tables:

```
CREATE TABLE parcels (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tracking_id VARCHAR(50) NOT NULL,
  sender_name VARCHAR(100),
  receiver_name VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE parcel_status (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tracking_id VARCHAR(50),
  status VARCHAR(100),
  location VARCHAR(100),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### 4️⃣ Start Backend Server

```
node server.js
```

Server runs on:

```
http://localhost:5000
```

---

### 5️⃣ Run Frontend

Open:

```
frontend/index.html
```

---

## 🔐 Admin Login

Username: any name
Password: username@123

Example:

```
Username: harshit
Password: harshit@123
```

---

## 🚀 Future Improvements

* 🔍 Search & Filter
* ✏️ Edit Parcel
* 📱 Mobile Optimization
* 🔔 Live Notifications

---

## 👨‍💻 Author

Harshit Vishwakarma
B.Tech Student

---

## ⭐ If you like this project, give it a star!
