# 🚀 AI-Powered Interview Preparation & Resume Analyzer Platform

An intelligent full-stack web application that leverages **Google Gemini AI** to generate personalized interview preparation reports, analyze candidate resumes against job descriptions, identify skill gaps, provide tailored Q&A sets, and dynamically render customized resume PDFs.

---

## 🌟 Key Features

- **🔐 Secure Authentication**: JWT-based authentication with bcrypt password hashing, HTTP-only cookies, and token blacklisting on logout.
- **📄 Resume PDF Extraction**: Automated parsing of uploaded candidate resumes using `pdf-parse`.
- **🤖 Google Gemini AI Integration**:
  - In-depth alignment analysis between resume content and target job description.
  - Generates comprehensive interview preparation questions with structured answer guidelines.
  - Highlights candidate strengths, weaknesses, and key improvement areas.
- **📑 Dynamic Resume PDF Generation**: Generates clean, tailored PDF resumes on-the-fly using `puppeteer`.
- **⚡ Modern Frontend UI**: Fast, responsive single-page application built with React 19, Vite, React Router, and modular SCSS styles.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Routing**: [React Router](https://reactrouter.com/)
- **Styling**: SASS / SCSS
- **HTTP Client**: [Axios](https://axios-http.com/)

### Backend
- **Runtime & Framework**: [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas) with [Mongoose ODM](https://mongoosejs.com/)
- **AI Engine**: [Google Gen AI SDK (`@google/genai`)](https://www.npmjs.com/package/@google/genai)
- **File Parsing & PDF Rendering**: `pdf-parse`, `multer`, `puppeteer`
- **Security & Validation**: `jsonwebtoken`, `bcryptjs`, `cookie-parser`, `cors`, `zod`

---

## 📁 Project Architecture

```plaintext
GEN_AI-project/
├── Frontend/                 # React (Vite) client application
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── features/
│   │   │   ├── auth/        # Authentication pages, context & services
│   │   │   └── interview/   # Interview prep forms, reports & services
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
│
├── backend/                  # Node.js + Express API server
│   ├── src/
│   │   ├── config/          # MongoDB connection configuration
│   │   ├── controllers/     # Auth & Interview business logic
│   │   ├── middlewares/     # JWT authentication & Multer upload middlewares
│   │   ├── models/          # User, Blacklist, & InterviewReport schemas
│   │   ├── routes/          # REST API endpoints
│   │   └── services/        # Gemini AI prompt orchestration
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
├── .gitignore               # Root gitignore protecting sensitive data
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB Atlas](https://www.mongodb.com/atlas) account (or local MongoDB)
- [Google AI Studio API Key](https://aistudio.google.com/)

---

### 1. Clone the Repository

```bash
git clone https://github.com/Lyakhat/GEN_AI-project.git
cd GEN_AI-project
```

---

### 2. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file from the template:
   ```bash
   cp .env.example .env
   ```

4. Configure your environment variables in `backend/.env`:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   GOOGLE_GENAI_API_KEY=your_gemini_api_key
   ```

5. Start the backend development server:
   ```bash
   npm run dev
   ```

---

### 3. Frontend Setup

1. Open a new terminal and navigate to the `Frontend` directory:
   ```bash
   cd ../Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file from the template:
   ```bash
   cp .env.example .env
   ```

4. Configure your environment variable in `Frontend/.env`:
   ```env
   VITE_BASE_URL=http://localhost:3000
   ```

5. Start the frontend development server:
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:5173`.

---

## 📡 API Endpoints Overview

### Authentication (`/api/auth`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new user account | Public |
| `POST` | `/api/auth/login` | Authenticate user & receive cookie | Public |
| `GET` | `/api/auth/logout` | Logout user & invalidate token | Public |
| `GET` | `/api/auth/get-me` | Get logged-in user profile | Private |

### Interview Prep & Reports (`/api/interview`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/interview/` | Upload resume + JD and generate AI report | Private |
| `GET` | `/api/interview/` | Get all reports for logged-in user | Private |
| `GET` | `/api/interview/report/:interviewId` | Retrieve detailed report by ID | Private |
| `POST` | `/api/interview/resume/pdf/:interviewReportId` | Generate & download tailored resume PDF | Private |

---

## 🔒 Security Best Practices

- All `.env` credential files, private keys, database strings, and API secrets are strictly ignored via `.gitignore` to prevent leakage.
- Passwords are encrypted using salted bcrypt hashes prior to database persistence.
- JWT tokens are verified on protected routes with an active blacklist verification against invalidated tokens.

---

## 📄 License

This project is licensed under the ISC License.
