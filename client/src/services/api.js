// API service for future backend integration
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

export const api = {
  // Authentication
  login: async (email, password) => {
    // Replace with actual API call
    return { success: true, token: "mock-token" }
  },

  signup: async (name, email, password) => {
    // Replace with actual API call
    return { success: true, token: "mock-token" }
  },

  // Contacts
  getContacts: async () => {
    // Replace with actual API call
    return []
  },

  createContact: async (contact) => {
    // Replace with actual API call
    return { success: true, contact }
  },

  updateContact: async (id, contact) => {
    // Replace with actual API call
    return { success: true, contact }
  },

  deleteContact: async (id) => {
    // Replace with actual API call
    return { success: true }
  },

  // Templates
  getTemplates: async () => {
    // Replace with actual API call
    return []
  },

  createTemplate: async (template) => {
    // Replace with actual API call
    return { success: true, template }
  },

  updateTemplate: async (id, template) => {
    // Replace with actual API call
    return { success: true, template }
  },

  deleteTemplate: async (id) => {
    // Replace with actual API call
    return { success: true }
  },

  // Emails
  sendEmail: async (templateId, contactIds) => {
    // Replace with actual API call
    return { success: true, sent: contactIds.length }
  },

  getEmailLogs: async () => {
    // Replace with actual API call
    return []
  },
}
