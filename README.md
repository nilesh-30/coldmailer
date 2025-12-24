# ColdMail Starter - Email Marketing SaaS Frontend

A modern, responsive frontend for an email marketing SaaS application built with React, Vite, TailwindCSS, and ShadCN components.

## Features

- 🔐 Authentication (Login/Signup)
- 📊 Dashboard with statistics and recent emails
- 👥 Contact management with search and CRUD operations
- 📝 Email template creation and editing
- 📧 Email sending with template selection
- 📋 Email logs with status tracking
- ⚙️ Settings page for profile and email configuration
- 🎨 Dark mode UI with modern design
- 📱 Fully responsive layout

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **TailwindCSS 3** - Styling
- **ShadCN UI** - Component library
- **React Router v7** - Routing
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── ui/            # ShadCN UI components
│   ├── layout/        # Layout components (Sidebar, Navbar)
│   └── dashboard/     # Dashboard-specific components
├── pages/             # Page components
├── context/           # React Context (Auth)
├── hooks/             # Custom React hooks
├── services/          # API service layer
├── utils/             # Helper utilities
└── styles/            # Global styles
```

## Pages

- `/login` - Login page
- `/signup` - Sign up page
- `/dashboard` - Main dashboard with stats
- `/contacts` - Contact management
- `/templates` - Email templates
- `/send-email` - Send emails to contacts
- `/email-logs` - Email sending history
- `/settings` - User settings

## Backend Integration

The app is ready for backend integration. Update the API calls in `src/services/api.js` to connect to your Node.js + MongoDB backend.

### Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

## Features to Implement with Backend

- [ ] Real authentication with JWT
- [ ] Database persistence for contacts
- [ ] Database persistence for templates
- [ ] Email sending with SMTP/SendGrid
- [ ] Email open tracking
- [ ] CSV import functionality
- [ ] Advanced analytics
