"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/useToast"

const templates = [
  {
    id: 1,
    name: "Product Launch",
    subject: "Product Launch Announcement",
    body: "Hi {{name}},\n\nWe are excited to announce...",
  },
  { id: 2, name: "Follow Up", subject: "Follow Up - Quick Question", body: "Hi {{name}},\n\nI wanted to follow up..." },
  { id: 3, name: "Introduction", subject: "Introduction & Partnership", body: "Hi {{name}},\n\nMy name is..." },
]

const contacts = [
  { id: 1, name: "John Smith", email: "john@example.com" },
  { id: 2, name: "Sarah Johnson", email: "sarah@company.com" },
  { id: 3, name: "Mike Wilson", email: "mike@business.com" },
  { id: 4, name: "Emily Davis", email: "emily@startup.io" },
  { id: 5, name: "Tom Brown", email: "tom@corp.com" },
]

export default function SendEmailPage() {
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [selectedContacts, setSelectedContacts] = useState([])
  const [preview, setPreview] = useState("")
  const { toast } = useToast()

  const handleTemplateChange = (templateId) => {
    setSelectedTemplate(templateId)
    const template = templates.find((t) => t.id === Number.parseInt(templateId))
    if (template) {
      setPreview(`Subject: ${template.subject}\n\n${template.body}`)
    }
  }

  const handleContactChange = (contactId) => {
    const id = Number.parseInt(contactId)
    setSelectedContacts((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]))
  }

  const handleSend = () => {
    if (!selectedTemplate || selectedContacts.length === 0) {
      toast({
        title: "Error",
        description: "Please select a template and at least one contact",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Success!",
      description: `Email sent to ${selectedContacts.length} contact(s)`,
    })

    // Reset form
    setSelectedTemplate("")
    setSelectedContacts([])
    setPreview("")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Send Email</h1>
        <p className="text-muted-foreground">Compose and send emails to your contacts</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column - Form */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Configuration</CardTitle>
              <CardDescription>Select template and recipients</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="template">Email Template</Label>
                <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
                  <SelectTrigger id="template">
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map((template) => (
                      <SelectItem key={template.id} value={template.id.toString()}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Select Contacts</Label>
                <div className="space-y-2 rounded-lg border p-4">
                  {contacts.map((contact) => (
                    <label key={contact.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedContacts.includes(contact.id)}
                        onChange={() => handleContactChange(contact.id.toString())}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <span className="text-sm">
                        {contact.name} ({contact.email})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <Alert>
                <AlertTitle>Variables Available</AlertTitle>
                <AlertDescription>
                  Use {`{{name}}`}, {`{{company}}`}, {`{{email}}`} in your templates for personalization
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Preview */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Preview</CardTitle>
              <CardDescription>Preview how your email will look</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={preview}
                readOnly
                placeholder="Select a template to see the preview..."
                className="min-h-[300px] font-mono text-sm"
              />
            </CardContent>
          </Card>

          <Button onClick={handleSend} className="w-full" size="lg">
            <Send className="mr-2 h-5 w-5" />
            Send Email to {selectedContacts.length} Contact(s)
          </Button>
        </div>
      </div>
    </div>
  )
}
