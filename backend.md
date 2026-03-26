# Six-seven quizzes Backend

## system overview 

## Tech stack

## security and environnement






# Six-Seven quizzes API 

## Overview

An API that allows you to create and update user's credentials then add the game score

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

    ```
    DB_URL=<your_database_url>
    ```

  - Replace `<your_database_url>` with the database URL you just copied
  - Run `npm run setup-db` to setup the database

5. Setup your port

  - Add A `PORT` key assigned to the port of your choice in your `.env` file
  
      ```
      PORT=<port-of-your-choice>
      ```
     
6. Run the server

 - Run `npm run dev` to run the server in development mode
 - Run `npm start` to run the server in production mode
