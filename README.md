# Task Manager

A full-stack task management application with user authentication and CRUD operations for tasks.

## Project Structure

The project is organized into two main directories:

### Frontend (React + Vite)
- `/Frontend`: Contains the React application built with Vite
  - `/src/components`: Reusable UI components
  - `/src/pages`: Page components (Dashboard, Login, Signup)
  - `/src/utils`: Utility functions for authentication, etc.
  - `/src/styles`: CSS styles
  - `/src/assets`: Static assets like images

### Backend (Express + Prisma)
- `/Backend`: Contains the Express server and API
  - `/controllers`: API endpoint handlers
  - `/middleware`: Authentication middleware
  - `/routes`: API route definitions
  - `/prisma`: Database schema and migrations
  - `/models`: Data models (using Prisma)

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MySQL database
- npm or yarn

### Backend Setup
1. Navigate to the Backend directory:
   ```
   cd Backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Install specific packages (if not installed by npm install):
   ```
   npm install express dotenv cors bcrypt jsonwebtoken @prisma/client mysql2 express-validator
   npm install -D prisma nodemon
   ```

4. Create a `.env` file with the following variables:
   ```
   DATABASE_URL="mysql://username:password@localhost:3306/taskmanager"
   JWT_SECRET="your-secret-key"
   PORT=5000
   ```

5. Initialize the database:
   ```
   npx prisma migrate dev --name init
   ```

6. Start the server:
   ```
   npm run dev
   ```

### Frontend Setup
1. Navigate to the Frontend directory:
   ```
   cd Frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Install specific packages (if not installed by npm install):
   ```
   npm install react react-dom react-router-dom axios react-icons
   npm install -D vite @vitejs/plugin-react eslint
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open http://localhost:5173 in your browser

## Features
- User registration and authentication
- Create, read, update, and delete tasks
- Mark tasks as completed
- Responsive design

## Technologies Used
- **Frontend**: React, React Router, Axios
- **Backend**: Express.js, Prisma ORM
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens) 
