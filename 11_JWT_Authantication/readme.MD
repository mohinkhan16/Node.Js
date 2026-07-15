
# 🔐 JWT Authentication System

A secure **JWT (JSON Web Token) Authentication** project built using **Node.js, Express.js, MongoDB, Mongoose, bcrypt, and JWT**. This project demonstrates how to implement user authentication with password hashing, token generation, protected routes, and authorization.

---

# 🚀 Features

- 👤 User Registration
- 🔑 User Login
- 🔒 Password Hashing using bcrypt
- 🎫 JWT Token Generation
- ✅ Protected Routes
- 🛡️ Authentication Middleware
- 🚪 Logout (Client Side)
- ❌ Invalid Token Handling
- ⚠️ Error Handling
- 📦 MongoDB Database Integration
- 🌐 REST API

---

# 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcrypt
- dotenv
- CORS
- Nodemon

---

# 📁 Project Structure

```
jwt-authentication/
│
├── config/
│   └── db.js
│
├── controllers/
│   └── authController.js
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   └── User.js
│
├── routes/
│   └── authRoutes.js
│
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md
```

---

# 📦 Installation

### Clone the repository

```bash
git clone https://github.com/yourusername/jwt-authentication.git
```

### Move into project folder

```bash
cd jwt-authentication
```

### Install dependencies

```bash
npm install
```

---

# ▶️ Run Project

Development mode

```bash
npm run dev
```

Production mode

```bash
npm start
```

---

# 🔑 Environment Variables

Create a **.env** file in the project root.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

Example

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/jwtAuth
JWT_SECRET=mySecretKey123
```

---

# 📌 API Endpoints

## Register User

**POST**

```
/api/auth/register
```

### Request Body

```json
{
  "name": "Mohin",
  "email": "mohin@gmail.com",
  "password": "123456"
}
```

### Response

```json
{
  "message": "User registered successfully"
}
```

---

## Login User

**POST**

```
/api/auth/login
```

### Request Body

```json
{
  "email": "mohin@gmail.com",
  "password": "123456"
}
```

### Response

```json
{
  "token": "JWT_TOKEN"
}
```

---

## Get Profile (Protected Route)

**GET**

```
/api/auth/profile
```

### Headers

```
Authorization: Bearer YOUR_JWT_TOKEN
```

### Response

```json
{
    "_id":"...",
    "name":"Mohin",
    "email":"mohin@gmail.com"
}
```

---

# 🔒 Authentication Flow

```
User Registers
        │
        ▼
Password is Hashed (bcrypt)
        │
        ▼
Stored in MongoDB
        │
        ▼
User Login
        │
        ▼
Password Verification
        │
        ▼
JWT Token Generated
        │
        ▼
Client Stores Token
        │
        ▼
Token Sent in Authorization Header
        │
        ▼
Middleware Verifies Token
        │
        ▼
Access Granted to Protected Routes
```

---

# 🔐 Security Features

- Password Hashing using bcrypt
- JWT Authentication
- Protected Routes
- Environment Variables
- Invalid Token Detection
- Unauthorized Access Prevention
- Error Handling

---

# 📚 Concepts Covered

- REST API
- MVC Architecture
- Authentication
- Authorization
- JWT
- bcrypt
- Middleware
- Express Router
- MongoDB CRUD
- Mongoose Schema
- Environment Variables
- HTTP Status Codes
- Async/Await
- Error Handling

---

# 📷 API Testing

You can test the APIs using:

- Postman
- Thunder Client (VS Code)
- Insomnia

---

# 📦 Dependencies

```json
{
  "bcrypt": "^latest",
  "cors": "^latest",
  "dotenv": "^latest",
  "express": "^latest",
  "jsonwebtoken": "^latest",
  "mongoose": "^latest",
  "nodemon": "^latest"
}
```

Install all dependencies

```bash
npm install express mongoose bcrypt jsonwebtoken dotenv cors
npm install --save-dev nodemon
```

---

# 🚀 Future Improvements

- Refresh Tokens
- Email Verification
- Forgot Password
- Reset Password
- OTP Authentication
- Google OAuth
- GitHub OAuth
- Role-Based Authorization (Admin/User)
- User Profile Update
- Change Password
- Account Verification
- Rate Limiting

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository

2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Added new feature"
```

4. Push the branch

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# 👨‍💻 Author

**Mohin Pathan**

**Aspiring Full Stack Developer**

### Technologies

- HTML5
- CSS3
- Bootstrap
- JavaScript
- Node.js
- Express.js
- MongoDB
- Mongoose

---

# ⭐ Support

If you found this project helpful, please consider giving it a ⭐ on GitHub.

---

# 📄 License

This project is licensed under the **MIT License**.
