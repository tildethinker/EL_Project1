# 🚗 Metro Parking Slot Management Web Application

A full-stack web solution to solve the inconvenience of finding and managing metro station parking slots in urban areas. This platform streamlines slot booking, management, and improves the daily commuting experience.

***

## Table of Contents

- [About the Project](#about-the-project)
- [Key Features](#key-features)
- [System Architecture](#system-architecture)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [License](#license)

***

## About the Project

This project addresses the challenges faced by commuters in finding available metro parking slots. The platform allows users to seamlessly book, manage, and track parking spots in real-time while enabling metro authorities to monitor utilization.

***

## Key Features

- 🔍 **Slot Availability Tracking:** Real-time display of available and occupied parking slots.
- 📦 **Slot Booking & Management:** Enable commuters to book, reserve, and manage their parking slots digitally.
- 🏢 **Admin Panel:** Dashboard for administrators to monitor occupancy, usage trends, and generate reports.
- 🛡 **Authentication & Authorization:** Secure login/signup for admins and users.
- 📱 **Mobile-responsive UI:** Optimized for desktop and mobile browsers.

***

## System Architecture

- **Frontend:** React.js SPA (single-page application) with routing and authentication context.
- **Backend:** Node.js/Express RESTful API using Sequelize ORM for data persistence.
- **Database:** (Typically configured for PostgreSQL or MySQL—define as per your deployment).

***

## Technologies Used

- **Frontend:** React.js, React Router, Context API, JavaScript
- **Backend:** Node.js, Express.js, Sequelize ORM, CORS, dotenv
- **Authentication:** JWT-based (typically in production)

***

## Getting Started

### Prerequisites

- Node.js (14+ recommended)
- npm

### Local Installation

**1. Clone the repository**

```bash
git clone https://github.com/tildethinker/EL_Project1.git
cd EL_Project1
```

**2. Set up Backend**

```bash
cd backend
npm install
# Configure your .env file for DB credentials
npm start
```

**3. Set up Frontend**

```bash
cd ../frontend
npm install
npm start
```

Open your browser and visit `http://localhost:3000` (or as defined in your frontend/package.json).

***

## Project Structure

```
EL_Project1/
├── backend/            # Node.js/Express backend API
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/          # Sequelize ORM models (User, Project)
│   ├── routes/          # Auth, User, Project API routes
│   ├── services/
│   ├── utils/
│   └── server.js
├── frontend/           # React frontend
│   ├── src/
│   │   ├── pages/       # Pages: Login, Signup, Dashboard
│   │   ├── contexts/    # Authentication Context
│   │   └── App.js
│   └── public/
├── scripts/deployment/ # Deployment scripts
├── docker-compose.yml
└── README.md
```

***

## License

Distributed under the MIT License. See `LICENSE` for more information.

***
