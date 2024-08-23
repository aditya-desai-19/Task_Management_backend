# Task Management Backend

This repository contains the backend for the Task Management application, built using Node.js, Express, and MongoDB. The backend provides a RESTful API for managing tasks, users, and authentication processes, implementing secure JWT (JSON Web Token) authentication and following the MVC (Model-View-Controller) architectural pattern.

## Features

- User registration and login with JWT-based authentication.
- CRUD operations for tasks.
- User and task association.
- Secure password storage with hashing.
- Middleware for request validation and authentication.
- Error handling and logging.

## Technologies Used

- **Node.js**: JavaScript runtime for building the backend.
- **Express**: Web framework for Node.js to create the API.
- **MongoDB**: NoSQL database for storing tasks and user data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **JWT**: JSON Web Tokens for secure user authentication.
- **bcrypt**: Library for hashing passwords.
- **dotenv**: For loading environment variables from `.env` files.

## Installation Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/aditya-desai-19/Task_Management_backend.git
   cd Task_Management_backend

2. Install dependencies
    ```bash
    npm i 

3. Create .env file and adding the your values to following keys:
    
    DB_URL

    DB_NAME

    PORT
    
    GOOGLE_CLIENT_SECRET
    
    GOOGLE_CLIENT_ID
    
    CLIENT_URL
    
    SECRET_KEY

## Screenshots

![tm-1](https://github.com/user-attachments/assets/94e44044-fd09-44d9-bfd9-6937c61a5e36)

![tm-2](https://github.com/user-attachments/assets/6fa44f2b-928e-4f22-92d7-4446f9859dba)

![tm-3](https://github.com/user-attachments/assets/9fb538c3-78b2-4911-a778-a80b724676f7)

![tm-4](https://github.com/user-attachments/assets/d4d2b5ed-a263-4f63-9757-56f14e5bf7bf)

## Author

- [@aditya-desai-19](https://github.com/aditya-desai-19)
