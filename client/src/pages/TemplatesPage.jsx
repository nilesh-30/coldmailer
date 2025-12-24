"use client"

import { useState } from "react"
import { Plus, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const initialTemplates = [
  {
    id: 1,
    subject: "Product Launch Announcement",
    body: "Hi {{name}},\n\nWe are excited to announce the launch of our new product! Check it out at our website.\n\nBest regards,\nThe Team",
  },
  {
    id: 2,
    subject: "Follow Up - Quick Question",
    body: "Hi {{name}},\n\nI wanted to follow up on our previous conversation. Do you have time for a quick call this week?\n\nLooking forward to hearing from you!\nBest,",
  },
  {
    id: 3,
    subject: "Introduction & Partnership Opportunity",
    body: "Hi {{name}},\n\nMy name is {{sender}} and I work at {{company}}. I came across your work and would love to explore potential partnership opportunities.\n\nWould you be open to a brief call?\n\nBest regards,",
  },
]

export default function TemplatesPage() {
  const [templates, setTemplates] = useState(initialTemplates)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [currentTemplate, setCurrentTemplate] = useState(null)
  const [formData, setFormData] = useState({ subject: "", body: "" })

  const handleAdd = () => {
    if (formData.subject && formData.body) {
      setTemplates([...templates, { ...formData, id: Date.now() }])
      setFormData({ subject: "", body: "" })
      setIsAddOpen(false)
    }
  }

  const handleEdit = (template) => {
    setCurrentTemplate(template)
    setFormData(template)
    setIsEditOpen(true)
  }

  const handleUpdate = () => {
    setTemplates(templates.map((t) => (t.id === currentTemplate.id ? { ...t, ...formData } : t)))
    setFormData({ subject: "", body: "" })
    setIsEditOpen(false)
  }

  const handleDelete = (id) => {
    setTemplates(templates.filter((t) => t.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Templates</h1>
          <p className="text-muted-foreground">Create and manage your email templates</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Template</DialogTitle>
              <DialogDescription>
                Use variables like {`{{name}}`}, {`{{company}}`}, {`{{sender}}`} for personalization
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject Line</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Your email subject here..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="body">Email Body</Label>
                <Textarea
                  id="body"
                  value={formData.body}
                  onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                  placeholder="Your email content here..."
                  className="min-h-[200px]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAdd}>Create Template</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <Card key={template.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="line-clamp-1">{template.subject}</CardTitle>
              <CardDescription className="line-clamp-3">{template.body}</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 bg-transparent"
                onClick={() => handleEdit(template)}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleDelete(template.id)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Template</DialogTitle>
            <DialogDescription>
              Use variables like {`{{name}}`}, {`{{company}}`}, {`{{sender}}`} for personalization
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-subject">Subject Line</Label>
              <Input
                id="edit-subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-body">Email Body</Label>
              <Textarea
                id="edit-body"
                value={formData.body}
                onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                className="min-h-[200px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate}>Update Template</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
