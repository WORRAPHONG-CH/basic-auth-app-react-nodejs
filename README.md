# Auth-App

Auth-App is a full-stack authentication application built with React, TypeScript, and Vite on the frontend, and Node.js, Express, and MySQL on the backend. This application demonstrates basic authentication functionalities including user registration, login, and protected routes using JWT tokens.

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)

## Introduction

Auth-App is designed to provide a simple and secure authentication system. It includes features such as user registration, login, and protected routes. The application uses JWT tokens for authentication and bcrypt for password hashing to ensure security.

## Technologies Used

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Vite**: A build tool that aims to provide a faster and leaner development experience for modern web projects.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Framer Motion**: A library for animations in React.

### Backend

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: A minimal and flexible Node.js web application framework.
- **MySQL**: A relational database management system.
- **JWT**: JSON Web Tokens for secure authentication.
- **bcrypt**: A library to help hash passwords.

## Installation

### Prerequisites

- Node.js and npm installed on your machine.
- Docker and Docker Compose installed on your machine.

### Steps

1. Clone the repository:

```bash
git clone https://github.com/your-username/auth-app.git
cd auth-app
```
2. Install dependencies for both client and server:
```bash
# Install client dependencies

cd client
npm install

# Install server dependencies
cd ../server
npm install
```


3.  Set up environment variables:
```bash
DB_HOST=mysql
DB_USER=root
DB_PASSWORD=root
DB_NAME=mydb
DB_PORT=3306
SECRET_KEY=secretKey
```

4.  Start the application using Docker Compose:
```bash
docker-compose up --build
```
- This will start the backend server, MySQL database, and phpMyAdmin.

5.  Start the frontend development server:
```bash
cd  client
npm  run  dev
```
- The frontend will be available at `http://localhost:5173`.

## Usage

-   Open your browser and navigate to  `http://localhost:8002`.
-   Register a new user.
-   Log in with the registered user credentials.
-   Access protected routes after logging in.


## API Endpoints

### Authentication

-   **POST /api/register**: Register a new user.
-   **POST /api/login**: Log in a user and return a JWT token.

### Users

-   **GET /api/users**: Get all users (protected route, requires admin role).
-   **GET /api/user/:id**: Get a user by ID.
