"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Trash2,
  Check,
  ChevronLeft,
  ChevronRight,
  X,
  Pencil,
} from "lucide-react";
import Pagination from "@/components/shared/Pagination";

const subscriptions = [
  {
    id: "1",
    title: "Premium Membership",
    type: "Monthly",
    price: "£4.99",
    features: [
      "Get Unlimited Dear Diary Entries",
      "Get Full Check-In",
      "Exclusive Discounts on Safety Store Products",
      "20% off all therapy session",
      "Can add up to 5 contact",
    ],
  },
];

export default function Subscriptions() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6 bg-white p-10 rounded-l">
        <div className="flex items-center justify-end">
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Subscriptions
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl w-full">
              <DialogTitle/>
              <div className="space-y-4">
                <div className="w-full">
                  <Label htmlFor="title">Title</Label>
                  <Select>
                    <SelectTrigger className="w-full my-2">
                      <SelectValue placeholder="Premium Membership" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="premium">
                        Premium Membership
                      </SelectItem>
                      <SelectItem value="basic">Basic Membership</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="w-full">
                  <Label htmlFor="type">Type</Label>
                  <Select>
                    <SelectTrigger className="w-full my-2">
                      <SelectValue placeholder="Monthly" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    className="min-h-[120px] my-2 w-full"
                    placeholder="Enter description..."
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    className="w-full my-2"
                    id="price"
                    placeholder="Enter price..."
                  />
                </div>
                <Button className="w-full">Save</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subscriptions.map((subscription) => (
            <Card key={subscription.id} className="border-2">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {subscription.title}
                    </h3>
                    <p className="text-xl font-bold text-muted-foreground">
                      {subscription.type}
                    </p>
                    <p className="text-3xl font-bold mt-2">
                      {subscription.price}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {subscription.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center mt-0.5 flex-shrink-0">
                          <Check className="w-3 h-3 text-primary-foreground" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-10 h-10 rounded-full cursor-pointer"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-10 h-10 rounded-full cursor-pointer hover:bg-red-500 hover:text-white border border-red-500 text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <Pagination />
      </div>
    </DashboardLayout>
  );
}
