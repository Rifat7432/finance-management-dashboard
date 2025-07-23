"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

interface NotificationSetting {
  id: string
  title: string
  description: string
  enabled: boolean
}

export default function Notifications() {
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: "email",
      title: "Email Notifications",
      description: "Receive updates and alerts via email.",
      enabled: false,
    },
    {
      id: "sms",
      title: "SMS Notifications",
      description: "Get instant notifications on your mobile device.",
      enabled: true,
    },
    {
      id: "inapp",
      title: "In-App Notifications",
      description: "Receive in-app notifications for important updates.",
      enabled: false,
    },
    {
      id: "activity",
      title: "Activity Reminders",
      description: "Receive reminders for upcoming activities.",
      enabled: true,
    },
    {
      id: "subscription",
      title: "Subscription Renewal Reminders",
      description: "Get notified when your subscriptions are about to renew.",
      enabled: true,
    },
  ])

  const toggleSetting = (id: string) => {
    setSettings((prev) =>
      prev.map((setting) => (setting.id === id ? { ...setting, enabled: !setting.enabled } : setting)),
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Notifications</h1>

        <Card>
          <CardHeader>
            <CardTitle>General Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {settings.map((setting) => (
              <div key={setting.id} className="flex items-center justify-between py-4">
                <div className="space-y-1">
                  <h3 className="font-medium">{setting.title}</h3>
                  <p className="text-sm text-muted-foreground">{setting.description}</p>
                </div>
                <Switch
                  checked={setting.enabled}
                  onCheckedChange={() => toggleSetting(setting.id)}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}