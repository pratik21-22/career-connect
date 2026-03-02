# CareerConnect — Job & Internship Portal

A full-stack MERN application for job seekers, recruiters, and admins with JWT authentication, role-based access, and Cloudinary resume uploads.

## Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18 (Vite), Tailwind CSS 3, React Router 6, Axios, Context API |
| **Backend** | Node.js, Express.js, MongoDB/Mongoose, JWT, bcrypt |
| **Storage** | Cloudinary (resume uploads) |

---

## Quick Start

### Prerequisites

- Node.js ≥ 18
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account (for resume uploads)

### 1. Clone & configure

```bash
git clone <your-repo-url>
cd "job port"
```

### 2. Backend

```bash
cd backend
cp .env.example .env       # fill in your credentials
npm install
npm run dev                 # starts on http://localhost:5000
```

#### `.env` variables

| Variable | Description |
|---|---|
| `PORT` | Server port (default 5000) |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Any long random string |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |

### 3. Frontend

```bash
cd frontend
npm install
npm run dev                 # starts on http://localhost:5173
```

> The Vite dev server proxies `/api` requests to `http://localhost:5000`.

For production, set `VITE_API_URL` to your deployed backend URL.

---

## User Roles

| Role | Capabilities |
|---|---|
| **Student** | Browse jobs, search/filter, apply, track application status, manage profile, upload resume |
| **Recruiter** | Post/edit/delete jobs, view applicants, accept/reject applications |
| **Admin** | Dashboard stats, manage all users, delete any job |

---

## API Endpoints

### Auth — `/api/auth`
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/register` | Public | Register a new user |
| POST | `/login` | Public | Login & get JWT |
| GET | `/me` | Private | Get current user |

### Users — `/api/users`
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/profile` | Private | Get own profile |
| PUT | `/profile` | Private | Update profile |
| POST | `/resume` | Private | Upload resume (multipart) |

### Jobs — `/api/jobs`
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/` | Public | List jobs (search, filter, paginate) |
| GET | `/my` | Recruiter | List own jobs |
| GET | `/:id` | Public | Get single job |
| POST | `/` | Recruiter | Create job |
| PUT | `/:id` | Recruiter | Update own job |
| DELETE | `/:id` | Recruiter | Delete own job |

### Applications — `/api/applications`
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/:jobId` | Student | Apply for a job |
| GET | `/my` | Student | List own applications |
| GET | `/job/:jobId` | Recruiter | List applicants for a job |
| PUT | `/:id` | Recruiter | Update application status |

### Admin — `/api/admin`
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/stats` | Admin | Dashboard statistics |
| GET | `/users` | Admin | List all users |
| DELETE | `/users/:id` | Admin | Delete a user |
| GET | `/jobs` | Admin | List all jobs |
| DELETE | `/jobs/:id` | Admin | Delete a job |

---

## Database Schema

### User
`name` · `email` (unique) · `password` (hashed) · `role` (student/recruiter/admin) · `skills[]` · `bio` · `resumeLink` · timestamps

### Job
`title` · `description` · `company` · `location` · `salary` · `createdBy` (→ User) · timestamps

### Application
`jobId` (→ Job) · `studentId` (→ User) · `status` (pending/accepted/rejected) · timestamps  
Compound index on `(jobId, studentId)` prevents duplicate applications.

---

## Deployment

### Frontend → Vercel

1. Push the `frontend/` folder to GitHub
2. Import the repo in [vercel.com](https://vercel.com)
3. Set:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add env variable: `VITE_API_URL = https://your-backend.onrender.com`
5. Deploy

### Backend → Render

1. Push the `backend/` folder to GitHub
2. Create a **Web Service** on [render.com](https://render.com)
3. Set:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
4. Add all `.env` variables in the Render dashboard
5. Deploy

---

## Project Structure

```
job port/
├── backend/
│   ├── config/         # db.js, cloudinary.js
│   ├── controllers/    # authController, jobController, ...
│   ├── middleware/      # auth.js, role.js, errorHandler.js
│   ├── models/          # User.js, Job.js, Application.js
│   ├── routes/          # auth.js, users.js, jobs.js, ...
│   ├── server.js
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/  # Navbar, Sidebar, JobCard, ...
    │   ├── context/     # AuthContext.jsx
    │   ├── hooks/       # useDebounce.js
    │   ├── pages/
    │   │   ├── auth/       # Login, Register
    │   │   ├── student/    # Jobs, JobDetail, MyApplications, Profile
    │   │   ├── recruiter/  # PostJob, EditJob, MyJobs, Applicants
    │   │   └── admin/      # Dashboard, ManageUsers, ManageJobs
    │   ├── utils/       # api.js (Axios instance)
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

---

## License

MIT
