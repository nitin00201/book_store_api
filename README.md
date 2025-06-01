
## 📚 Book Review API

A RESTful API built with **Node.js**, **Express**, and **MongoDB** for managing books and user-submitted reviews, with full **JWT authentication**, **filtering**, **search**, and **pagination** support.

---

## 🚀 Features

* User Signup & Login (JWT-based)
* Add, view, search, and filter books
* Submit, update, and delete reviews (only by the review owner)
* Get book details with reviews and average rating
* Full-text search on book titles and authors
* Pagination for books and reviews

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB with Mongoose
* **Auth:** JWT (JSON Web Tokens)
* **Environment Variables:** dotenv

---

## 📦 Project Structure

```
book-review-api/
├── controllers/
├── models/
├── routes/
├── middleware/
├── config/
├── .env
├── app.js
├── package.json
├── package-lock.json
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/nitin00201/book_store_api.git
cd book_store_api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/bookreviewdb
JWT_SECRET=iamnitin
```

### 4. Start the Server

```bash
npm run dev
```

> Server will run on `http://localhost:5000`

---

## 🔐 Auth Endpoints

### Signup

```bash
curl -X POST http://localhost:5000/signup \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice", "email": "alice@example.com", "password": "password123"}'
```

### Login

```bash
curl -X POST http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d '{"email": "alice@example.com", "password": "password123"}'
```

---

## 📘 Book Endpoints

### Add a Book (Auth Required)

```bash
curl -X POST http://localhost:5000/books \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"title": "Clean Code", "author": "Robert C. Martin", "genre": "Software Engineering"}'
```

### Get All Books (with filters and pagination)

```bash
curl "http://localhost:5000/books?author=martin&genre=Software%20Engineering&page=1&limit=5"
```

### Get Book by ID

```bash
curl http://localhost:5000/books/<bookId>
```

---

## ✍️ Review Endpoints

### Submit a Review (Auth Required)

```bash
curl -X POST http://localhost:5000/books/<bookId>/reviews \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"rating": 5, "comment": "Excellent book!"}'
```

### Update Review

```bash
curl -X PUT http://localhost:5000/reviews/<reviewId> \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"rating": 4, "comment": "Still good, but has flaws"}'
```

### Delete Review

```bash
curl -X DELETE http://localhost:5000/reviews/<reviewId> \
  -H "Authorization: Bearer <token>"
```

---

## 🔍 Search Endpoint

Search books by title or author (case-insensitive, partial matches) with pagination.

```bash
curl "http://localhost:5000/search?query=code&page=1&limit=5"
```

---

## 🧠 Design Decisions

* **Modular structure**: Separated `controllers`, `models`, and `routes` for scalability and maintainability.
* **Validation**: Basic validation via Mongoose schemas and minimal input checks.
* **Auth Middleware**: Protects routes with JWT token validation.
* **Search & Pagination**: Uses regex-based case-insensitive search and supports pagination on both book list and reviews.

---

## 📄 Example .env

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/bookreviewdb
JWT_SECRET=iamnitin
```

---
