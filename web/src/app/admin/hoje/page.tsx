'use client'

import { api } from "@/api/api";
import { Clock } from "lucide-react";
import { format } from "date-fns";
import { MenuAdmin } from "../MenuAdmin";
import { HeaderAdmin } from "../HeaderAdmin";
import { ServicePanel } from "../ServicePanel";
import { ScheduleTypes } from "@/utils/schedulesType";
import { DialogSchedule } from "../DialogSchedule";
import { useEffect, useState } from "react";

const horarios = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", 
  "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
];

interface SchedulesPerTimeTypes{
  time: string;
  schedules: ScheduleTypes[]
}

export default () => {

  const [schedulesPerTime, setSchedulesPerTime] = useState<SchedulesPerTimeTypes[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("/schedules/today");
      separatePerHours(response.data);
    };

    fetchData();
  }, []);

  const separatePerHours = (schedules: ScheduleTypes[]) => {
    const schedulePerDayMap = horarios.map(time => ({
      time,
      schedules: schedules.filter(schedule => format(new Date(Number(schedule.dateService)), "HH':'mm'") === time)
    }));

    setSchedulesPerTime(schedulePerDayMap);
  }

  return(
    <div>
      <HeaderAdmin/>
      <MenuAdmin title="Agendamentos de hoje"/>

      <div className="px-6 pb-6 flex items-start gap-5">
        <div className="sticky top-6 w-full max-w-md">
          <ServicePanel/>
        </div>

        <div className="min-h-screen flex-1 rounded-md border">
          <div className="py-4 px-5 border-b">
            <h1 className="font-semibold">
              Horários de hoje (quinta-feira, 22 de out)
            </h1>

            <span className="text-muted-foreground text-sm">
              Essa listagem inclui agendamentos pendentes, confirmados, concluídos, rejeitados e perdidos.
            </span>
          </div>

          <div className="min-h-screen grid grid-cols-4 divide-x-[1px] divide-y-[1px] divide-secondary">
            {schedulesPerTime.map(schedulePerTime => (
              <div key={schedulePerTime.time} className="p-2 flex flex-col">
                <h1 className="w-full py-2 flex items-center justify-center gap-1 rounded bg-secondary">
                  <Clock className="w-4 h-4"/>

                  {schedulePerTime.time}
                </h1>

                <div className="flex-1 mt-5 space-y-3">
                  {schedulePerTime.schedules.length > 0 ? (
                    schedulePerTime.schedules.map(schedule => (
                      <DialogSchedule 
                        key={schedule.id} 
                        schedule={schedule}
                        type="calendar"
                      />
                    ))
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground">
                      <span>
                        Nenhum agendamento
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}