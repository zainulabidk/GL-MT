GL Infotech React JS Machine Test
This project is a User Management System built with React JS for the frontend and Node.js + Express for the backend. It includes features like user registration, login, profile management, and admin functionality.

Table of Contents
Features

File Structure

Setup Instructions

Running the Project

API Endpoints

Default Admin Credentials

Live Demo

Features
User Module
Secure Registration: Users can register with username, email, mobile, gender, DOB, address, and profile image.

Secure Login: Users can log in using their username and password.

Reset Password: Users can reset their password via username.

Profile Management: Users can view and update their profile details.

Token-Based Authentication: JWT tokens are used for secure authentication.

Admin Module
Default Admin Registration: A default admin is created during setup.

Admin Profile Management: Admins can update their profile details.

User Listing: Admins can view, edit, and delete users.

File Structure

gl-infotech-frontend/
├── public/
│   └── index.html              # Main HTML file
├── src/
│   ├── components/
│   │   ├── Register.js         # User registration component
│   │   ├── Login.js            # User login component
│   │   ├── Profile.js          # User profile management component
│   │   └── UserList.js         # Admin user listing component
│   ├── App.js                  # Main application component
│   ├── index.js                # Entry point for the frontend
│   ├── services/
│   │   └── api.js              # API service for backend communication
│   └── styles/
│       └── App.css             # Global styles
├── .env                        # Frontend environment variables
└── package.json                # Frontend dependencies


Frontend
Navigate to the frontend directory:

bash
Copy
cd gl-infotech-frontend
Install dependencies:

bash
Copy
npm install
Set up environment variables:

Create a .env file in the root directory and add the following:

env
Copy
REACT_APP_API_URL=http://localhost:5000/api
Start the frontend development server:

bash
Copy
npm start