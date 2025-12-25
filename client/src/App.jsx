import { useContext } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from "./components/ui/toaster"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import DashboardPage from "./pages/DashboardPage"
import ContactsPage from "./pages/ContactsPage"
import TemplatesPage from "./pages/TemplatesPage"
import SendEmailPage from "./pages/SendEmailPage"
import EmailLogsPage from "./pages/EmailLogsPage"
import SettingsPage from "./pages/SettingsPage"
import Layout from "./components/layout/Layout"

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext); // Access user context
  return user ? children : <Navigate to="/login" replace/>; // If no user, redirect to login
}

function App() {
  return (
    <div className="dark">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/contacts" element={<ContactsPage />} />
                    <Route path="/templates" element={<TemplatesPage />} />
                    <Route path="/send-email" element={<SendEmailPage />} />
                    <Route path="/email-logs" element={<EmailLogsPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
        <Toaster />
      </Router>
    </div>
  )
}

export default App
