/* eslint-disable @typescript-eslint/no-explicit-any */
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import NotificationPage from "@/components/pages/Notifications/NotificationPage"

 const  Notifications = async ({ params }: any) => {
  const { userId } = await params;
  return (
    <DashboardLayout>
      <NotificationPage userId={userId}/>
    </DashboardLayout>
  )
}
export default Notifications;