# Student Internship Portal

A full-stack web application that allows students to browse internship opportunities, view internship details, and submit applications online.

## 1. Project Overview

The Student Internship Portal provides a simple interface for students to explore available internships and apply for suitable opportunities. The application uses React for the frontend, Node.js and Express.js for the backend, and MongoDB for storing application records.

## 2. Features

- Display available internship opportunities.
- View detailed information about each internship.
- Navigate between pages using React Router.
- Submit applications through an application form.
- Validate required application fields.
- Store application details in MongoDB.
- Retrieve submitted applications through a REST API.
- Display error messages for invalid requests and unavailable resources.

## 3. Technology Stack

| Component | Technology |
|---|---|
| Frontend | React.js |
| Development tool | Vite |
| Routing | React Router |
| Backend | Node.js |
| API framework | Express.js |
| Database | MongoDB |
| Database integration | Mongoose |
| Middleware | CORS, dotenv |
| Version control | Git and GitHub |

## 4. Project Structure

```text
my-project/
├── public/
├── src/
│   ├── assets/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── server/
│   ├── index.js
│   ├── .env
│   └── package.json
├── .env.local
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

The frontend files are located in `src/`. The backend API and database integration are located in `server/`.

## 5. Installation and Setup

### Prerequisites

- Node.js and npm
- A MongoDB database and connection string
- A code editor such as Visual Studio Code or ByteXL

### Step 1: Install frontend dependencies

From the project root, run:

```bash
npm install
```

### Step 2: Configure the frontend

Create a `.env.local` file in the project root:

```env
VITE_API_URL=http://localhost:5000
```

For a ByteXL workspace, use the appropriate forwarded backend URL instead of `http://localhost:5000`.

### Step 3: Configure the backend

Navigate to the server directory:

```bash
cd server
npm install
```

Create or update `server/.env`:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Replace the placeholder with your actual MongoDB connection string. Do not commit credentials to GitHub.

### Step 4: Start the backend

From the `server` directory, run:

```bash
npm run dev
```

If your backend package does not define a `dev` script, run:

```bash
node index.js
```

Confirm that the terminal reports a successful database connection and that the API is listening on port 5000.

### Step 5: Start the frontend

Open a second terminal at the project root:

```bash
npm run dev -- --host 0.0.0.0
```

Open the frontend using the URL provided by your development environment.

## 6. API Endpoints

The backend provides the following REST API endpoints.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | Check backend status |
| GET | `/api/internships` | Retrieve all internships |
| GET | `/api/internships/:id` | Retrieve a specific internship |
| POST | `/api/applications` | Submit a student application |
| GET | `/api/applications` | Retrieve submitted applications |

### Submit an application

Example request body:

```json
{
  "name": "Sample Student",
  "email": "student@example.com",
  "rollNumber": "24BCS316",
  "internshipId": "internship_id"
}
```

The `internshipId` must identify a valid internship in the application data. The backend validates the required fields and stores the application in MongoDB.

## 7. Database Design

The application uses MongoDB to store student internship applications through a Mongoose schema.

The application record includes:

- `name`: Student's name
- `email`: Student's email address
- `rollNumber`: Student's college roll number
- `internshipId`: Identifier of the selected internship
- `internshipTitle`: Title of the selected internship
- `createdAt` and `updatedAt`: Timestamps managed by Mongoose

Internship opportunities are provided by the backend API. Application records are persisted in MongoDB.

## 8. Testing

The following tests should be performed before submission.

1. Verify that all internship cards are displayed.
2. Open an internship and verify its details.
3. Submit an application with valid data.
4. Confirm that the submitted application appears in the applications API.
5. Test the form with missing required fields.
6. Test invalid internship IDs and unavailable API responses.
7. Restart the backend and verify that previously saved applications remain available.

## 9. Environment Variables and Security

The application uses environment variables for configuration.

- `VITE_API_URL`: Base URL of the backend API.
- `MONGO_URI`: MongoDB connection string.
- `PORT`: Backend server port.

Keep `.env` and `.env.local` out of version control. Never publish database passwords, API keys, or other secrets in source code or screenshots.

## 10. Future Enhancements

- Student registration and authentication.
- Search and filtering of internship opportunities.
- Application status tracking.
- An administrator dashboard for managing internships.
- Improved validation and automated testing.
- Deployment of the frontend and backend.

## 11. Conclusion

The Student Internship Portal demonstrates full-stack web development using React, Express.js, Node.js, and MongoDB. It provides internship browsing, application submission, REST API integration, and persistent storage of student applications.

**Project status:** Core internship browsing, application submission, and database persistence have been tested in the development environment.
