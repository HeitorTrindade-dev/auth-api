🔐 auth-API | Authentication API

A REST API for user authentication with secure password hashing,
JWT-based sessions, and protected routes. Built with Node.js, Express,
Prisma, and PostgreSQL.

------------------------------------------------------------------------

🚀 Tech Stack

-   Node.js
-   Express
-   Prisma ORM
-   PostgreSQL
-   JWT (JSON Web Token)
-   bcrypt for password hashing
-   dotenv for environment variables

------------------------------------------------------------------------

📁 Project Structure

    ├── server.js
    ├── package.json
    ├── prisma/
    │   └── schema.prisma
    ├── public/
    │   ├── index.html
    │   ├── style.css
    │   └── script.js
    └── src/
        ├── controllers/
        │   └── userController.js
        ├── middleware/
        │   └── authMiddleware.js
        ├── repositories/
        │   └── userRepository.js
        ├── routes/
        │   └── userRouter.js
        └── services/
            └── userService.js

------------------------------------------------------------------------

⚙️ Prerequisites

-   Node.js v18+
-   PostgreSQL installed and running

------------------------------------------------------------------------

🛠️ Setup & Installation

1. Clone the repository

    git clone https://github.com/HeitorTrindade-dev/auth-api.git
    cd auth-api

2. Install dependencies

    npm install

3. Configure environment variables

Create a .env file in the project root.

Example:

    DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/authapi"
    JWT_SECRET="your_secret_key"

------------------------------------------------------------------------

4. Run database migrations

    npx prisma migrate dev

This will create the database tables defined in the Prisma schema.

------------------------------------------------------------------------

5. Generate Prisma Client

    npx prisma generate

------------------------------------------------------------------------

6. Start the development server

    npm run dev

The server will be available at:

    http://localhost:3000

------------------------------------------------------------------------

📡 API Endpoints

POST /api/users/register

Creates a new user.

Request body:

    {
      "email": "user@example.com",
      "password": "password123"
    }

Response:

    {
      "user": {
        "id": 1,
        "email": "user@example.com"
      }
    }

------------------------------------------------------------------------

POST /api/users/login

Authenticates a user and returns a JWT token.

Request body:

    {
      "email": "user@example.com",
      "password": "password123"
    }

Response:

    {
      "token": "your-jwt-token"
    }

------------------------------------------------------------------------

GET /api/users/protected

Access a protected route using a valid token.

Headers:

    Authorization: Bearer your-jwt-token

Response:

    {
      "message": "Authenticated",
      "userId": 1
    }

------------------------------------------------------------------------

🔐 Authentication Flow

1.  The user registers with email and password
2.  The password is hashed using bcrypt
3.  During login, the password is compared with the stored hash
4.  If valid, the API returns a JWT token
5.  Protected routes require the token in the Authorization header

------------------------------------------------------------------------

🌐 Web Interface

Accessing:

    http://localhost:3000

serves a simple frontend from the public/ folder.

Note: the frontend is a minimal vibe-coded interface meant only to test
the API quickly during development.