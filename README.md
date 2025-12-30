# Rawmart Assessment - Task Management Application

A full-stack Task Management Application built with a generic **Service-Oriented Architecture** on the frontend and a **robust MVC pattern** on the backend. It features a premium "Glassmorphism" UI, secure JWT authentication, and server-side pagination.

## 📸 Screenshots

### Login Screen
![Login Screen](/C:/Users/shakh/.gemini/antigravity/brain/729d03c9-c631-46e3-8bfc-165d1a36cb21/uploaded_image_1_1767122677644.png)

### Dashboard with Pagination
![Dashboard](/C:/Users/shakh/.gemini/antigravity/brain/729d03c9-c631-46e3-8bfc-165d1a36cb21/uploaded_image_0_1767122677644.png)

---

## 🚀 Setup Instructions

### Prerequisites
*   Node.js (v16+)
*   PostgreSQL (local or cloud like Supabase/Neon)
*   Git

### 1. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:
```env
PORT=5000
DATABASE_URL=postgres://user:password@host:port/database
JWT_SECRET=your_super_secret_key
CLIENT_URL=http://localhost:5173
```

Run the server:
```bash
npm run dev
# Server running on port 5000
```

### 2. Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` folder:
```env
VITE_API_BASE_URL=http://localhost:5000/api
# Or for production: https://your-backend.vercel.app/api
```

Run the application:
```bash
npm run dev
# App running on http://localhost:5173
```

---

## 🛠 Usage
1.  **Register**: Create a new account.
2.  **Login**: Access the dashboard.
3.  **Create Task**: Click "New Task", fill in title/description.
4.  **Manage**: Filter by status (All/Pending/Done), edit, or delete tasks.
5.  **Pagination**: Add > 6 tasks to see pagination controls.

---

## 📡 API Endpoints

### Authentication
*   `POST /api/auth/register` - { name, email, password }
*   `POST /api/auth/login` - { email, password }

### Tasks
*   `GET /api/tasks?page=1&limit=6&status=all` - Fetch paginated tasks.
*   `POST /api/tasks` - { title, description }
*   `PUT /api/tasks/:id` - { title, description, status }
*   `DELETE /api/tasks/:id` - Remove a task.

---

## 🧠 Assumptions & Design Decisions
1.  **Architecture**: Used a Service Layer (`authService`, `taskService`) in React to decouple UI from API logic, making it scalable.
2.  **State Management**: Used React Context (`AuthContext`, `TaskContext`) instead of Redux as the app state is moderate and fits well within Context's capabilities.
3.  **Pagination**: Implemented **Server-Side Pagination**. The frontend requests chunks of data (limit=6) to optimize performance for large datasets.
4.  **Security**: 
    *   Auth tokens are stored in `localStorage` for session persistence. 
    *   Backend employs `helmet` for headers and `express-rate-limit` for DDoS protection.
    *   CORS is configured to respect `CLIENT_URL`.
5.  **Styling**: No UI library (like Material UI) was used for components. Everything is custom-built with **Tailwind CSS** to demonstrate CSS proficiency and implement the specific "Glassmorphism" aesthetic.

---

## 📦 Deployment
*   **Backend**: Deployed on Vercel (Serverless).
*   **Frontend**: Ready for Vercel/Netlify.
*   **Database**: PostgreSQL.
