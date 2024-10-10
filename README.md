
# Agent Management App

## Overview
The Agent Management App is a full-stack application that allows users to register, log in, purchase agent licenses, view agent statuses, and manage their agents. The application consists of a **React** frontend and a **Node.js/Express** backend with **MongoDB** as the database.

---

## Project Structure

```
/agent-management-app
│
├── /backend
│   ├── /models
│   │   └── User.js          # Mongoose models for User and Agent
│   │   └── Agent.js
│   ├── /routes
│   │   └── auth.js          # Routes for user authentication (login/register)
│   │   └── agents.js        # Routes for agent management
│   ├── app.js               # Main entry point for the backend
│   └── config.js            # MongoDB connection setup
│
├── /frontend
│   ├── /src
│   │   ├── /components      # React components (Login, Register, Dashboard)
│   │   ├── App.js           # Main React App component
│   │   ├── index.js         # Entry point for React app
│   │   └── api.js           # API utility for making HTTP requests to the backend
│   ├── package.json         # Frontend package configuration and dependencies
│
└── README.md                # Project documentation
```

---

## Prerequisites

Before running the project, ensure that you have the following installed:
- **Node.js** (v12 or higher)
- **npm** (comes with Node.js)
- **MongoDB** (local or cloud)

---

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/piyushadake2709/agent-management-app.git
cd agent-management-app
```

### 2. Backend Setup (Node.js + Express)

Navigate to the `backend` folder and install the necessary dependencies:

```bash
cd backend
npm install
```

#### Run the Backend Server
To start the backend server, run the following command:
- For production: 
  ```bash
  node server.js
  ```
- For development (with auto-reload on changes):
  ```bash
  npm run dev
  ```

> The backend server will be running on **http://localhost:5000**.

---

### 3. Frontend Setup (React)

Navigate to the `frontend` folder and install the React dependencies:

```bash
cd ../frontend
npm install
```

#### Run the Frontend Server
To start the frontend server, run the following command:

```bash
npm start
```

> The frontend will be available on **http://localhost:3000**.

---

## Environment Variables

### Backend (MongoDB Connection)
In the backend, MongoDB connection is set up in the `config.js` file. You can modify the connection string based on your environment.

```javascript
mongoose.connect('mongodb://localhost:27017/agentManagement', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
```

If you're using MongoDB Atlas or a remote MongoDB instance, update the URI accordingly.

---

## Usage

1. **Register a New User:**
   - Open **http://localhost:3000** in your browser.
   - Navigate to the **Register** form, enter your username and password, and register.

2. **Login:**
   - After registration, log in using your credentials.

3. **Purchase and Manage Agents:**
   - Once logged in, you’ll be directed to the **Dashboard**, where you can purchase new agent licenses and view their statuses.

---

## Technologies Used

- **Frontend**: React, JavaScript, CSS
- **Backend**: Node.js, Express, MongoDB, Mongoose, bcrypt (for password hashing)
- **Development Tool**: Nodemon (for auto-reloading in development)

---

## API Endpoints

### Authentication (auth.js)
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Log in with existing credentials.

### Agents (agents.js)
- `POST /api/agents`: Purchase a new agent.
- `GET /api/agents/:userId`: Get all agents for a specific user.
- `POST /api/agents/:agentId/status`: Update an agent's status.

---

## Future Improvements
- Implement more robust error handling.
- Add form validation for registration and login forms.
- Implement token-based authentication (JWT) for securing API routes.
- Add the ability for agents to send periodic status updates (heartbeat).
- Improve the frontend UI with more detailed agent management options.

---

## License
This project is licensed under the MIT License.

---

## Author
- **Piyush Adake* - [Your GitHub Profile](https://github.com/Piyush2709)
