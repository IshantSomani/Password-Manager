# Password Manager Authentication

Build a complete Password Manager Responsive MERN stack application using ReactJS, Redux, Node.js, MongoDB, and Express.

## Features

- **Credential Management**: Easily create, modify, remove, or update login credentials for other accounts.
- **Password Generator**: Generate secure passwords for enhanced account protection.
- **Multiple User Support**: Independent management of credentials for multiple users.
- **Security**: Safeguards user login data through encrypted storage, ensuring safety on the internet and digital identity management.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file:

### Backend
      MONGODB_URI=your_mongodb_connection_string

### Frontend
    VITE_API_URL=your_backend_api_url


## Libraries

### Backend
```bash
npm i express mongoose cors dotenv bcrypt jsonwebtoken jwt-decode nodemon
```

### Frontend
```bash
npm i react-router-dom react-redux react-icons axios @reduxjs/toolkit jwt-decode
npm i @mui/material @emotion/react @emotion/styled @mui/icons-material 
```

## Database
- MongoDB

## Tech Stack

**Client:** React, Redux, TailwindCSS

**Server:** Node, Express

**Database:** MongoDB

**Payment Processing:** Stripe



## Run Locally

Clone the project:

```bash
git clone https://github.com/IshantSomani/Password-Manager.git
cd Password-Manager
```

Install dependencies for both frontend and backend:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```
Set up environment variables as described above.

Start the backend server:
```bash
cd backend
npm start
```

In a new terminal, start the frontend development server:

```bash
cd frontend
npm run dev
```

#### Contributing
Contributions are welcome! Please feel free to submit a Pull Request.