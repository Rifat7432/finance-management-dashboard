"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { TResponse } from "@/global/global.interface";
import {
  useGetUserNotificationSettingsQuery,
  useUpdateUserNotificationSettingsMutation,
} from "@/redux/features/finance/financeApi";
import { toast } from "sonner";

const NotificationPage = ({ userId }: { userId: string }) => {
  const { data, isLoading } = useGetUserNotificationSettingsQuery(userId);
  const [updateNotification, { isLoading: updating }] =
    useUpdateUserNotificationSettingsMutation();

  // Local state to manage switches
  const [settings, setSettings] = useState({
    budgetNotification: false,
    appointmentNotification: false,
    dateNightNotification: false,
    debtNotification: false,
    contentNotification: false,
  });

  // When API data loads, sync with local state
  useEffect(() => {
    if (data?.data) {
      setSettings(data.data);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  type NotificationSettings = typeof settings;

  // Toggle handler
  const toggleSetting = async (name: keyof NotificationSettings) => {
    // Immediately update local state for a responsive UI
    const updatedSettings = {
      ...settings,
      [name]: !settings[name],
    };
    setSettings(updatedSettings);

    try {
      const res = (await updateNotification({
        userId,
        data: updatedSettings,
      })) as TResponse<null>;

      if (res?.error && !res?.error?.data?.success) {
        toast.error(res.error.data.message);
        // Revert toggle if API failed
        setSettings(settings);
        return;
      }

      if (res?.data?.success) {
        toast.success(res.data.message);
      } else {
        toast.error("Failed to update notification setting.");
        // Revert toggle if failed
        setSettings(settings);
      }
    } catch (err) {
      toast.error("Notification update failed.");
      console.log(err);
      // Revert toggle if error
      setSettings(settings);
    }
  };

  return (
    <div className="space-y-6 bg-white p-10 rounded-l">
      <h1 className="text-2xl font-bold">Notifications</h1>

      <Card>
        <CardHeader>
          <CardTitle>General Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {[
            {
              key: "budgetNotification",
              title: "Budget Notifications & Reminders",
            },
            {
              key: "debtNotification",
              title: "Debt Notifications & Reminders",
            },
            {
              key: "contentNotification",
              title: "New Content Notifications & Reminders",
            },
            {
              key: "dateNightNotification",
              title: "Date Night Notifications & Reminders",
            },
            {
              key: "appointmentNotification",
              title: "Appointment Notifications & Reminders",
            },
          ].map(({ key, title }) => (
            <div
              key={key}
              className="flex items-center justify-between py-4 border-b last:border-none"
            >
              <div className="space-y-1">
                <h3 className="font-medium">{title}</h3>
                <p className="text-sm text-muted-foreground">
                  Get instant notifications on your mobile device & app
                </p>
              </div>
              <Switch
                checked={settings[key as keyof NotificationSettings]}
                onCheckedChange={() =>
                  toggleSetting(key as keyof NotificationSettings)
                }
                disabled={updating}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationPage;
