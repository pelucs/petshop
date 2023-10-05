import { ScheduleTypes } from "./schedulesType";

export interface TutorsTypes{
  id: string;
  name: string;
  email: string;
  contact: string;
  address: string;
  createdAt: Date;
  schedules: ScheduleTypes[]
}