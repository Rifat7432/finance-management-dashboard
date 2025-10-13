/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {  Search } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


import { useGetAppointmentsQuery } from "@/redux/features/appointment/appointmentApi";
import AppointmentList from "./AppointmentList";
import Spinner from "@/components/shared/Spinner";
import { TAppointment } from "@/global/global.interface";

export default function AppointmentPage() {
  const [viewDetails, setViewDetails] = useState(false);
  const [appointment, setAppointment] = useState<TAppointment | null>(null);
  const [status, setStatus] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const {
    data: appointments,
    isLoading,
    isError,
  } = useGetAppointmentsQuery({
    ...(status === "All" ? {} : { status }),
    searchTerm: searchTerm.trim(),
  });

  return (
    <div className="space-y-6 bg-white p-10 rounded-l">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">User Management</h1>
          <Select value={status} onValueChange={(value) => setStatus(value)}>
            <SelectTrigger className="w-[180px] text-sm">
              <SelectValue placeholder="all" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="complete">
                <Badge className="bg-green-100 text-green-800 border border-green-700">
                  Complete
                </Badge>
              </SelectItem>
              <SelectItem value="pending">
                <Badge className="bg-yellow-100 text-yellow-800 border border-yellow-300">
                  Pending
                </Badge>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search"
            className="pl-10"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-28">
          <Spinner />
        </div>
      ) : (
      <AppointmentList appointment={appointment} setAppointment={setAppointment} appointments={appointments} setViewDetails={setViewDetails} viewDetails={viewDetails} isError={isError}/>
      )}
    </div>
  );
}
