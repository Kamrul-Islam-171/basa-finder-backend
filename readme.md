# Blogging Platform Backend

live link (https://blog-backend-l2-a3.vercel.app/)

## Overview

This project involves the development of a backend for a blogging platform. Users can create, update, and delete their own blogs, while an Admin has extended permissions to manage users and their blogs. The system includes secure authentication, role-based access control, and public APIs for accessing blogs with search, sort, and filter functionalities.

---

## Features

### User Roles

#### Admin
- Permissions:
  - Delete any blog.
  - Block any user.
- Restrictions:
  - Cannot update any blog.

#### User
- Permissions:
  - Register and log in.
  - Create blogs (only when logged in).
  - Update and delete their own blogs.
- Restrictions:
  - Cannot perform admin-specific actions.

---

### Authentication & Authorization
- **Authentication:**
  - Users must log in to perform create, update, and delete operations.
- **Authorization:**
  - Role-based access control ensures users and admins can perform actions within their permissions.

---

### Blog Management
- Users can:
  - Create new blogs.
  - Update and delete blogs they own.
- Admins can:
  - Delete any blog.

---


## Technologies

- **TypeScript**: For type-safe coding.
- **Node.js**: As the runtime environment.
- **Express.js**: For building RESTful APIs.
- **MongoDB** with **Mongoose**: For database management.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Kamrul-Islam-171/blog-backend
   cd blog-backend

   ## Installation

### Install dependencies:
```bash
npm install

### Set up environment variables:
1. Create a `.env` file in the root directory.
2. Define the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret

```

# API Endpoints

## Authentication

- **POST /api/auth/register**  
  Register a new user.

- **POST /api/auth/login**  
  Log in and receive a token.

## User Management (Admin Only)

- **PATCH /api/admin/users/:userId/block**  
  Block a user.

- **DELETE /api/admin/blogs/:id**  
  Delete a user.

## Blog Management

- **GET /api/blogs**  
  Public API to view blogs with search, sort, and filter functionalities.

- **POST /api/blogs**  
  Create a new blog (requires authentication).

- **PATCH /api/blogs/:id**  
  Update

