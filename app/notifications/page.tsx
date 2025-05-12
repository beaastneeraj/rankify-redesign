"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, Calendar, X, Filter, CheckCircle, AlertTriangle, Info, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample notification data
const notifications = [
  {
    id: 1,
    title: "New Ranking Data Available",
    message: "The 2024 ranking data has been updated. Check out the latest rankings.",
    date: "2024-03-15T10:30:00",
    type: "update",
    read: false,
  },
  {
    id: 2,
    title: "Parameter Weights Updated",
    message: "We've adjusted the default parameter weights based on the latest research.",
    date: "2024-03-10T14:45:00",
    type: "update",
    read: true,
  },
  {
    id: 3,
    title: "System Maintenance",
    message: "The system will be down for maintenance on March 20, 2024, from 2:00 AM to 4:00 AM UTC.",
    date: "2024-03-08T09:15:00",
    type: "alert",
    read: false,
  },
  {
    id: 4,
    title: "New Feature: CSV Export",
    message: "You can now export your customized rankings as CSV files.",
    date: "2024-03-05T16:20:00",
    type: "feature",
    read: true,
  },
  {
    id: 5,
    title: "Your Feedback Matters",
    message: "We've implemented several changes based on user feedback. Thank you for your suggestions!",
    date: "2024-03-01T11:00:00",
    type: "info",
    read: true,
  },
  {
    id: 6,
    title: "Data Processing Error Fixed",
    message: "We've resolved an issue with data processing that affected some rankings.",
    date: "2024-02-25T13:30:00",
    type: "alert",
    read: true,
  },
  {
    id: 7,
    title: "New Documentation Available",
    message: "Check out our new documentation on parameter customization.",
    date: "2024-02-20T15:45:00",
    type: "info",
    read: false,
  },
  {
    id: 8,
    title: "Mobile Optimization Improvements",
    message: "We've improved the mobile experience for better usability on small screens.",
    date: "2024-02-15T10:00:00",
    type: "feature",
    read: true,
  },
]

export default function NotificationsPage() {
  const [notificationList, setNotificationList] = useState(notifications)
  const [activeTab, setActiveTab] = useState("all")
  const [filter, setFilter] = useState("all")

  // Filter notifications based on tab and filter
  const filteredNotifications = notificationList.filter((notification) => {
    if (activeTab === "unread" && notification.read) return false
    if (filter !== "all" && notification.type !== filter) return false
    return true
  })

  // Mark notification as read
  const markAsRead = (id: number) => {
    setNotificationList((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  // Mark all as read
  const markAllAsRead = () => {
    setNotificationList((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  // Delete notification
  const deleteNotification = (id: number) => {
    setNotificationList((prev) => prev.filter((notification) => notification.id !== id))
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      // Today - show time
      return new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
      }).format(date)
    } else if (diffDays === 1) {
      return "Yesterday"
    } else if (diffDays < 7) {
      return `${diffDays} days ago`
    } else {
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
      }).format(date)
    }
  }

  // Get icon based on notification type
  const getIcon = (type: string) => {
    switch (type) {
      case "update":
        return <RefreshCw className="h-5 w-5 text-blue-500" />
      case "alert":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case "feature":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "info":
        return <Info className="h-5 w-5 text-indigo-500" />
      default:
        return <Bell className="h-5 w-5 text-muted-foreground" />
    }
  }

  // Get unread count
  const unreadCount = notificationList.filter((notification) => !notification.read).length

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground mt-1">Stay updated with the latest changes and announcements</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by type" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="update">Updates</SelectItem>
              <SelectItem value="alert">Alerts</SelectItem>
              <SelectItem value="feature">Features</SelectItem>
              <SelectItem value="info">Information</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
            Mark All as Read
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="all">
            All
            <Badge variant="secondary" className="ml-2">
              {notificationList.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="unread">
            Unread
            <Badge variant="secondary" className="ml-2">
              {unreadCount}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                layout
              >
                <Card className={`border-l-4 ${notification.read ? "border-l-muted" : "border-l-primary"}`}>
                  <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between space-y-0">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">{getIcon(notification.type)}</div>
                      <div>
                        <CardTitle className="text-base font-semibold">{notification.title}</CardTitle>
                        <CardDescription className="mt-1">{notification.message}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(notification.date)}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardFooter className="p-4 pt-2">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs h-8"
                        onClick={() => markAsRead(notification.id)}
                      >
                        Mark as read
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12">
              <Bell className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium mb-2">No notifications</h3>
              <p className="text-muted-foreground">
                {activeTab === "unread"
                  ? "You've read all your notifications."
                  : "You don't have any notifications yet."}
              </p>
              {filter !== "all" && (
                <Button variant="link" onClick={() => setFilter("all")} className="mt-2">
                  Clear filter
                </Button>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="unread" className="space-y-4">
          <AnimatePresence>
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  layout
                >
                  <Card className="border-l-4 border-l-primary">
                    <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between space-y-0">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">{getIcon(notification.type)}</div>
                        <div>
                          <CardTitle className="text-base font-semibold">{notification.title}</CardTitle>
                          <CardDescription className="mt-1">{notification.message}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(notification.date)}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardFooter className="p-4 pt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs h-8"
                        onClick={() => markAsRead(notification.id)}
                      >
                        Mark as read
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium mb-2">All caught up!</h3>
                <p className="text-muted-foreground">You've read all your notifications.</p>
                {filter !== "all" && (
                  <Button variant="link" onClick={() => setFilter("all")} className="mt-2">
                    Clear filter
                  </Button>
                )}
              </div>
            )}
          </AnimatePresence>
        </TabsContent>
      </Tabs>
    </div>
  )
}
