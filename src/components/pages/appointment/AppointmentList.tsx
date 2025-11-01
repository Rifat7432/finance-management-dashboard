/* eslint-disable @typescript-eslint/no-explicit-any */

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Calendar,
  Clock,
  DollarSign,
  MessageSquare,
  Target,
  User,
  Mail,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { TAppointment, TResponse } from "@/global/global.interface";
import { useUpdateAppointmentMutation } from "@/redux/features/appointment/appointmentApi";
import { toast } from "sonner";
const AppointmentList = ({
  viewDetails,
  appointment,
  setAppointment,
  setViewDetails,
  appointments,
  isError,
}: {
  viewDetails: boolean;
  appointment: TAppointment | null;
  setAppointment: any;
  setViewDetails: any;
  appointments: { data: TAppointment[] };
  isError: boolean;
}) => {
  const [updateAppointment] = useUpdateAppointmentMutation();
  const handelCompleteAppointment = async (id: string) => {
    console.log(id)
    try {
      const res = (await updateAppointment(id)) as TResponse<TAppointment>;

      if (res?.error && !res?.error?.data?.success) {
        toast.error(res.error.data.message || "Failed to update appointment");
        return;
      }

      if (res.data?.success) {
        toast.success(res.data.message || "Appointment updated successfully");
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to update appointment");
    }
  };
  if (isError) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-red-500">
          Error loading Appointments. Please try again.
        </div>
      </div>
    );
  }
  if (!appointments?.data?.length) {
    return (
      <div className="flex items-center justify-center py-12 h-[60vh]">
        <div className="text-muted-foreground">
          {status === "All"
            ? "No Appointments found."
            : `No ${status} Appointments found.`}
        </div>
      </div>
    );
  }
  return (
    <div>
      <Card>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow className="hover:bg-primary bg-[#636AE8] text-white">
                  <TableHead className="text-left p-3 rounded-l text-white">
                    Name
                  </TableHead>
                  <TableHead className="text-left p-3 text-white">
                    Email
                  </TableHead>
                  <TableHead className="text-left p-3 text-white">
                    Status
                  </TableHead>
                  <TableHead className="text-left p-3 text-white">
                    Date
                  </TableHead>
                  <TableHead className="text-left p-3 text-white">
                    Time
                  </TableHead>
                  <TableHead className="text-left p-3 text-white rounded-r">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <Dialog open={viewDetails} onOpenChange={setViewDetails}>
                  {appointments?.data.map((appointment: TAppointment) => (
                    <TableRow className="border-b" key={appointment._id}>
                      <TableCell className="p-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-8 h-8">
                            <AvatarImage
                              src={
                                appointment.userId.image || "/placeholder.svg"
                              }
                            />
                            <AvatarFallback>RG</AvatarFallback>
                          </Avatar>
                          {appointment.name}
                        </div>
                      </TableCell>
                      <TableCell className="p-3">{appointment.email}</TableCell>
                      <TableCell className="p-3">
                        <Badge
                          variant={
                            appointment.status === "complete"
                              ? "default"
                              : "secondary"
                          }
                          className={
                            appointment.status === "complete"
                              ? "bg-green-100 text-green-800 outline-green-700 outline-1"
                              : "bg-yellow-100 text-yellow-800 outline-yellow-300 outline-1"
                          }
                        >
                          {appointment.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="p-3">{appointment.date}</TableCell>
                      <TableCell className="p-3">
                        {appointment.timeSlot}
                      </TableCell>
                      <TableCell className="p-3">
                        <div className="flex gap-2">
                          <DialogTrigger asChild>
                            <Button
                              onClick={() => setAppointment(appointment)}
                              size="sm"
                              variant="outline"
                              className="bg-[#0053B21A] hover:bg-[#636AE8] hover:text-white text-[#636AE8] border border-[#636AE8] rounded-2xl cursor-pointer"
                            >
                              View
                            </Button>
                          </DialogTrigger>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {appointment && (
                    <DialogContent className="max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                      {/* Header Section */}
                      <DialogTitle className="sr-only">
                        Appointment Details
                      </DialogTitle>

                      <div className="flex items-center gap-4 p-6 pb-4">
                        <Avatar className="w-16 h-16 ring-2 ring-primary/10">
                          <AvatarImage
                            src={appointment.userId.image || "/placeholder.svg"}
                            alt={appointment.name}
                          />
                          <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">
                            {appointment.name
                              ?.split(" ")
                              .map((n: any) => n[0])
                              .join("")
                              .toUpperCase() || "JD"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h2 className="text-2xl font-bold text-foreground">
                            {appointment.name}
                          </h2>
                          <p className="text-muted-foreground flex items-center gap-2 mt-1">
                            <Mail className="w-4 h-4" />
                            {appointment.email}
                          </p>
                        </div>
                        <Badge
                          variant={
                            appointment.status === "complete"
                              ? "default"
                              : "secondary"
                          }
                          className="text-sm"
                        >
                          {appointment.status}
                        </Badge>
                      </div>

                      <Separator />

                      {/* Appointment Details */}
                      <div className="p-6 space-y-6">
                        {/* Schedule Information */}
                        <div className="space-y-3">
                          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-primary" />
                            Schedule
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-7">
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Date
                                </p>
                                <p className="font-medium">
                                  {appointment.date}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Time Slot
                                </p>
                                <p className="font-medium">
                                  {appointment.timeSlot}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        {/* Personal Information */}
                        <div className="space-y-3">
                          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                            <User className="w-5 h-5 text-primary" />
                            Personal Information
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-7">
                            <div className="flex items-center gap-3">
                              <Users className="w-4 h-4 text-muted-foreground" />
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Attendant
                                </p>
                                <p className="font-medium">
                                  {appointment.attendant}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-4 h-4 flex items-center justify-center">
                                <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Child Status
                                </p>
                                <Badge
                                  variant={
                                    appointment.isChild ? "default" : "outline"
                                  }
                                  className="text-xs"
                                >
                                  {appointment.isChild ? "Child" : "Adult"}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        {/* Financial Information */}
                        <div className="space-y-3">
                          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-primary" />
                            Financial Details
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-7">
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Approximate Income
                                </p>
                                <p className="font-medium text-green-600">
                                  ${appointment.approxIncome?.toLocaleString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Investment Amount
                                </p>
                                <p className="font-medium text-blue-600">
                                  ${appointment.investment?.toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        {/* Discussion Topics */}
                        <div className="space-y-3">
                          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-primary" />
                            Discussion Topics
                          </h3>
                          <div className="space-y-4 ml-7">
                            <div>
                              <p className="text-sm text-muted-foreground mb-2">
                                Topics to Discuss
                              </p>
                              <div className="bg-muted/50 rounded-lg p-3">
                                <p className="text-sm">{appointment.discuss}</p>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                                <Target className="w-4 h-4" />
                                Goals & Objectives
                              </p>
                              <div className="bg-muted/50 rounded-lg p-3">
                                <p className="text-sm">
                                  {appointment.reachingFor}
                                </p>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground mb-2">
                                Questions to Ask
                              </p>
                              <div className="bg-muted/50 rounded-lg p-3">
                                <p className="text-sm">{appointment.ask}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex justify-end gap-3 p-6 pt-0">
                        <Button
                          onClick={() => setViewDetails(false)}
                          variant="outline"
                          className="px-6"
                        >
                          Close
                        </Button>
                        <Button
                          className="px-6"
                          onClick={() =>
                            handelCompleteAppointment(appointment._id)
                          }
                        >
                          Complete
                        </Button>
                      </div>
                    </DialogContent>
                  )}
                </Dialog>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentList;
