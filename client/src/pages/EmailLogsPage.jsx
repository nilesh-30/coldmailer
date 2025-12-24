"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

const emailLogs = [
  {
    id: 1,
    contact: "John Smith",
    email: "john@example.com",
    template: "Product Launch",
    status: "sent",
    sentAt: "2024-01-15 10:30 AM",
    opened: true,
  },
  {
    id: 2,
    contact: "Sarah Johnson",
    email: "sarah@company.com",
    template: "Follow Up",
    status: "sent",
    sentAt: "2024-01-15 09:15 AM",
    opened: true,
  },
  {
    id: 3,
    contact: "Mike Wilson",
    email: "mike@business.com",
    template: "Introduction",
    status: "failed",
    sentAt: "2024-01-14 03:45 PM",
    opened: false,
  },
  {
    id: 4,
    contact: "Emily Davis",
    email: "emily@startup.io",
    template: "Product Launch",
    status: "sent",
    sentAt: "2024-01-14 02:20 PM",
    opened: false,
  },
  {
    id: 5,
    contact: "Tom Brown",
    email: "tom@corp.com",
    template: "Follow Up",
    status: "sent",
    sentAt: "2024-01-13 11:10 AM",
    opened: true,
  },
  {
    id: 6,
    contact: "Lisa Anderson",
    email: "lisa@tech.com",
    template: "Introduction",
    status: "sent",
    sentAt: "2024-01-13 09:30 AM",
    opened: false,
  },
  {
    id: 7,
    contact: "David Lee",
    email: "david@startup.com",
    template: "Product Launch",
    status: "sent",
    sentAt: "2024-01-12 04:15 PM",
    opened: true,
  },
  {
    id: 8,
    contact: "Rachel Green",
    email: "rachel@company.io",
    template: "Follow Up",
    status: "failed",
    sentAt: "2024-01-12 01:50 PM",
    opened: false,
  },
]

export default function EmailLogsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredLogs = emailLogs.filter(
    (log) =>
      log.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.template.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedLogs = filteredLogs.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Email Logs</h1>
        <p className="text-muted-foreground">Track and monitor all sent emails</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Email Logs</CardTitle>
          <CardDescription>
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contact</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Template</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Opened</TableHead>
                <TableHead>Sent At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.contact}</TableCell>
                  <TableCell className="text-muted-foreground">{log.email}</TableCell>
                  <TableCell>{log.template}</TableCell>
                  <TableCell>
                    <Badge variant={log.status === "sent" ? "success" : "destructive"}>{log.status}</Badge>
                  </TableCell>
                  <TableCell>
                    {log.opened ? (
                      <Badge variant="outline" className="bg-accent">
                        Yes
                      </Badge>
                    ) : (
                      <Badge variant="outline">No</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{log.sentAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between pt-4">
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredLogs.length)} of{" "}
              {filteredLogs.length} results
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
