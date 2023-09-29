import { ScheduleTypes } from "./schedulesType";

export interface TutorsTypes{
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: Date;
  schedules: ScheduleTypes[]
}