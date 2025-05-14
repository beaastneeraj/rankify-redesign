"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

const notifications = [
  {
    id: 1,
    name: "Published on 14-10-2024",
    description: "NIRF India Rankings 2025 Registration Notification",
    date: "2024-10-14",
    url: "https://www.nirfindia.org/source/published_14-10-2024.pdf",
  },
  {
    id: 2,
    name: "Published on 08-03-2024",
    description: "India Rankings 2024 Stakeholder Feedback Invitation",
    date: "2024-03-08",
    url: "https://www.nirfindia.org/source/published_08-03-2024.pdf",
  },
  {
    id: 3,
    name: "Published on 28-11-2023",
    description: "India Rankings 2024 Data Submission Opening",
    date: "2023-11-28",
    url: "https://www.nirfindia.org/source/published_28-11-2023.pdf",
  },
  {
    id: 4,
    name: "Published on 10-10-2023",
    description: "India Rankings 2024 Registration Extension",
    date: "2023-10-10",
    url: "https://www.nirfindia.org/source/published_10-10-2023.pdf",
  },
  {
    id: 5,
    name: "Published on 19-09-2023",
    description: "India Rankings 2024 Application Invitation (Innovation Category)",
    date: "2023-09-19",
    url: "https://www.nirfindia.org/source/published_19-09-2023.pdf",
  },
]

export default function NotificationsPage() {
  return (
    <div className="p-6 mx-auto w-full max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      <ul className="space-y-6">
        {notifications.map((notif) => (
          <li
            key={notif.id}
            className="group p-4 border rounded-lg cursor-pointer transition-colors bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold text-lg">{notif.name}</div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1 mb-2">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{notif.date}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{notif.description}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(notif.url, "_blank")}
              >
                View Report
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
