
# Startup Investment Platform 🚀

A modern web application that connects startup founders with potential investors, inspired by Shark Tank. This platform facilitates direct communication, investment proposals, and business opportunity evaluation.

## 🌐 Live Demo

## 🌟 Key Features

### For Investors
- Browse and search through startup profiles
- View detailed startup metrics and business plans
- Schedule meetings with startup founders
- Real-time chat with startup managers
- Track investment opportunities

### For Startup Managers
- Create and manage startup profiles
- Upload business details and metrics
- Communicate with potential investors
- Manage meeting schedules
- Real-time messaging system
- Track investor interest

## 💻 Technical Stack

### Frontend
- React.js
- Context API for state management
- Socket.io-client for real-time communication
- CSS3 for custom styling

### Backend
- Node.js & Express.js
- MySQL for database
- Prisma as ORM (Object-Relational Mapping)
- Socket.io for real-time features
- JWT for authentication
  

## 🔧 Core Functionalities

### Authentication System
- Separate flows for investors and startup managers
- Secure JWT-based authentication
- Protected routes

### Real-time Communication
- Instant messaging between investors and startup managers
- Real-time notifications for new messages and meeting requests
- Live updates for startup metrics

### Meeting Management
- Schedule and track meetings
- Meeting notifications
- Calendar integration

## 📱 Screenshots

Home: 

![Home](https://github.com/user-attachments/assets/1f5040e9-ed5f-4111-a281-75d1d9604b3c)

Investor Landing Page:

![Investor Home](https://github.com/user-attachments/assets/e197bde4-438d-4d6f-a45f-c6ceac791833)

Messaging Platform:

![Investor Messaging](https://github.com/user-attachments/assets/ccd317d5-6857-4e9f-8872-1a5e91951826)

Startup Landing Page:

![Startup Home](https://github.com/user-attachments/assets/4cd8eda1-9cb4-45a1-9a78-642ced1db27e)

Startup Upload:

![Startup Upload](https://github.com/user-attachments/assets/1c69b39d-2d49-468d-98c9-60d67d2b6274)

Notification View:

![Notifications](https://github.com/user-attachments/assets/e5186d98-1a23-476b-b603-4ed0e5045adb)

Startup Details:

![Startup Details ](https://github.com/user-attachments/assets/ce97ac16-89fc-45b5-baf9-7ba53939a729)




## 🚀 Setup and Installation

```bash
# Clone the repository
git clone https://github.com/RafsanBinAli/Investor-Platform.git

# Install dependencies for frontend
cd frontend
npm install --legacy-peer-deps

# Install dependencies for backend
cd backend
npm install --legacy-peer-deps

# Run the development server
# Frontend
npm start

# Backend
nodemon server
Or
node server

```

### Database Schema Highlights


![Snapshot_2025-02-02_05-32-57](https://github.com/user-attachments/assets/1f80f0e0-5c99-4df9-8902-7c5f8e85e56a)



The system uses a relational database with the following key entities:
- Investor: Manages investor profiles and authentication
- StartupManager: Handles startup manager accounts and details
- StartupInfo: Stores comprehensive startup information
- Conversation & Message: Facilitates communication between investors and startups
- Schedule: Manages meeting arrangements
- Notifications: Tracks system notifications and updates


