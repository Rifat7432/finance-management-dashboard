/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TErrorData = {
  data: {
    success: boolean;
    message: string;
    errorDetails: any;
    stack: null;
  };
};
type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

export type TResponse<T> = {
  data: {
    data?: T;
    meta?: TMeta;
    success: boolean;
    message: string;
  };
  error?: TErrorData;
};
export type TUserLoginData = {
  accessToken: string;
  refreshToken: string;
};
export type TContentData = {
  _id: string;
  category: string;
  title: string;
  duration: string;
  videoUrl: string;
  views: number;
};
export type TAppointment = {
  _id: string;
  name: string;
  email: string;
  attendant: string;
  isChild: boolean;
  approxIncome: number;
  investment: number;
  discuss?: string;
  reachingFor: string;
  ask: string;
  date: string;
  timeSlot: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    image: string;
  };
  status: "pending" | "complete";
};
export type TUpdateData = {
  accessToken: string;
};

export type TUser = {
  id: string;
  email: string;
  role: string;
};
export type TAdminUser = {
  userId: string;
  email: string;
  role: string;
  photo: string;
  createdAt: string;
  updatedAt: string;
};
export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;
