"use client"

import { Users, Mail, TrendingUp, Send } from "lucide-react"
import StatsCard from "@/components/dashboard/StatsCard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useNavigate } from "react-router-dom"

const recentEmails = [
  {
    id: 1,
    contact: "John Smith",
    email: "john@example.com",
    template: "Product Launch",
    status: "sent",
    sentAt: "2 hours ago",
  },
  {
    id: 2,
    contact: "Sarah Johnson",
    email: "sarah@company.com",
    template: "Follow Up",
    status: "sent",
    sentAt: "5 hours ago",
  },
  {
    id: 3,
    contact: "Mike Wilson",
    email: "mike@business.com",
    template: "Introduction",
    status: "failed",
    sentAt: "1 day ago",
  },
  {
    id: 4,
    contact: "Emily Davis",
    email: "emily@startup.io",
    template: "Product Launch",
    status: "sent",
    sentAt: "1 day ago",
  },
  { id: 5, contact: "Tom Brown", email: "tom@corp.com", template: "Follow Up", status: "sent", sentAt: "2 days ago" },
]

export default function DashboardPage() {
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your email campaigns.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Contacts" value="2,345" icon={Users} change="12.5" trend="up" />
        <StatsCard title="Emails Sent" value="18,432" icon={Mail} change="8.2" trend="up" />
        <StatsCard title="Open Rate" value="68.5%" icon={TrendingUp} change="3.1" trend="up" />
        <StatsCard title="Response Rate" value="24.3%" icon={Send} change="1.8" trend="down" />
      </div>

      {/* Recent Emails */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Emails</CardTitle>
            <CardDescription>Your latest email campaigns and their status</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => navigate("/send-email")}>
              <Send className="mr-2 h-4 w-4" />
              Send New Email
            </Button>
            <Button variant="outline" onClick={() => navigate("/contacts")}>
              <Users className="mr-2 h-4 w-4" />
              Add Contact
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contact</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Template</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sent At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentEmails.map((email) => (
                <TableRow key={email.id}>
                  <TableCell className="font-medium">{email.contact}</TableCell>
                  <TableCell className="text-muted-foreground">{email.email}</TableCell>
                  <TableCell>{email.template}</TableCell>
                  <TableCell>
                    <Badge variant={email.status === "sent" ? "success" : "destructive"}>{email.status}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{email.sentAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
