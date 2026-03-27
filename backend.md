# Six-seven quizzes Backend
A secure RESTful API that manages user authentication and tracks game score for the Six-Seven Quizzes platforms

## system overview
The backend acts as the secure gatekeeper for the application, handling sensitive user data and ensuring that game scores are persisted correctly to the cloud database. 

## Tech stack
- Node.js & Express: To run the server and handle requests.
- PostgreSQL: To store user data and game score (Hosted on Supabase)

## security and environnement

The system currently has secure auth system.

As the user decides to sign up, he inputs his username and a password.
After clicking "Sign Up" button his credentials will be stored in the database, and his password will be hashed, using external library called "bcrypt". We use a .env file to hide important database links.

## Main API Routes 
- POST/api/register: Register a new user (Hashed via Bcrypt).
- POST/api/login: Validates credentials, gives JWT token to the user and starts session.
- POST/api/score: Sends a new score to the database using JWT token to identify the user after a Heist mission completed.

## API Overview

We built an API that allows you to create and update user's credentials then add the game score

## Getting Started

### Prerequisites

- Node.js
- NPM
- A cloud-based database hosting platform, such as Supabase or Neon

### Installation

1. Clone the repository
   - Run `https://github.com/Mohab-Khalifa/six-seven-quizzes.git` in the CLI of your choice

2. Navigate to the project directory
   - Navigate to the project with `cd six-seven-quizzes`

3. Install dependencies
   - Run `npm install` to install all dependencies for the project

4. Setup your database

  - Create a database instance on [Supabase](https://supabase.com/) (or other cloud-based database hosting platforms)
  - Retrieve the database URL & copy it
  - Create a `.env` file in the root directory with the following:

    `
    DB_URL=<your_database_url>
    `

  - Replace `<your_database_url>` with the database URL you just copied
  - Run `npm run setup-db` to setup the database

5. Setup your port

- Add A `PORT` key assigned to the port of your choice in your `.env` file

  ```
  PORT=<port-of-your-choice>
  ```

6. Run the server

- Run `npm run dev` to run the server in development mode

## You are now ready to use the backend on your machine!
