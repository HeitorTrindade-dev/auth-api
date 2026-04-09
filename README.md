---

# 🔐 Auth-API

A simple authentication API providing secure user registration, JWT-based login, and protected route management. Built with Node.js, Prisma, and PostgreSQL.

---

## 🚀 Tech Stack

- **Node.js**
- **Express**
- **Prisma ORM** (Database management)
- **PostgreSQL**
- **JSON Web Token (JWT)** (Secure authentication)
- **bcrypt** (Password hashing)

---

## 📁 Project Structure

```
├── server.js
├── package.json
├── prisma/
│   └── schema.prisma
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
└── src/ (Sugerido, ajuste conforme sua pasta real)
    ├── controllers/
    ├── middlewares/
    ├── routes/
    └── utils/
```

---

## ⚙️ Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [PostgreSQL](https://www.postgresql.org/) instance running

---

## 🛠️ Setup & Installation

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root based on `.env.example`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/authapi?schema=public"
JWT_SECRET="your_super_secret_key"
```

### 3. Database Migration & Prisma Client

```bash
# Generate the Prisma client
npx prisma generate

# Push the schema to your database
npx prisma db push
```

### 4. Start the server

```bash
npm run dev
```

The server will be available at `http://localhost:3000`.

---

## 📡 API Endpoints

### `POST /api/users/register`
Creates a new user with a hashed password.

**Request body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

---

### `POST /api/users/login`
Authenticates a user and returns a Bearer Token.

**Response `200`:**
```json
{
  "token": "eyJhbGciOiJIUzI1..."
}
```

---

### `GET /api/users/protected`
A private route that requires a valid JWT in the headers.

**Headers:**
```http
Authorization: Bearer your-jwt-token
```

**Response `200`:**
```json
{
  "message": "Authenticated",
  "userId": 1
}
```

---

## 🌐 Web Interface

The project includes a minimal frontend located in the `public/` folder. 

> ⚠️ **Note:** The frontend is **100% vibe-coded** and exists solely to facilitate quick API testing in the browser. The core focus of this repository is the backend implementation.

---

## 🔒 Security Features

- **Password Hashing:** Uses `bcrypt` to ensure passwords are never stored in plain text.
- **JWT Authentication:** Implements stateless authentication via tokens.
- **Route Protection:** Middleware logic to intercept and validate requests to private endpoints.

---
## 🖼️ Screenshots

<div align="center">
  <p><strong>Interface Principal</strong></p>
  <img src="./prints/p1.png" width="90%" alt="Screenshot Principal">
  
  <br><br>
  
  <div style="display: flex; justify-content: center; gap: 10px;">
    <img src="./prints/p2.png" width="44.5%" alt="Screenshot 2">
    <img src="./prints/p3.png" width="44.5%" alt="Screenshot 3">
  </div>
</div>
