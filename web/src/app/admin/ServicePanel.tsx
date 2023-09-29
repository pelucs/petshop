'use client'

import { CalendarDays } from "lucide-react";
import { DialogSchedule } from "./DialogSchedule";
import { useEffect, useState } from "react";
import { api } from "@/api/api";
import { ScheduleTypes } from "@/utils/schedulesType";
import { FormatDate } from "./FormatDate";
import { Skeleton } from "@/components/ui/skeleton";
import { isPast, isToday } from "date-fns";

interface SchedulesPerTimeTypes{
  key: string;
  schedules: ScheduleTypes[]
}

export function ServicePanel(){

  const [schedulesPerDay, setSchedulesPerDay] = useState<SchedulesPerTimeTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("/schedules");
      schedulesFromTodayOnnwards(response.data);
    };

    fetchData();
  }, []);

  const schedulesFromTodayOnnwards = (data: SchedulesPerTimeTypes[]) => {
    const schedulesMap: SchedulesPerTimeTypes[] = [];

    data.forEach(day => {
      if(!isPast(new Date(day.key).getTime()) || isToday(new Date(day.key).getTime())){
        schedulesMap.push(day);
      }
    });

    setSchedulesPerDay(schedulesMap);
    setLoading(false);
  }

  return(
    <div className="flex-1 rounded-md border bg-card">
      <div className="py-4 px-5 border-b">
        <h1 className="font-semibold">
          Painel de atendimento
        </h1>

        <span className="text-muted-foreground text-sm">
          Painel para aceitar, rejeitar, concluir ou excuir agendamentos
        </span>
      </div>

      <div className="h-[450px] px-5 space-y-2 overflow-y-auto divide-y-[1px]">
        {!loading ? (
          schedulesPerDay.length > 0 ? (
            schedulesPerDay.map(schedules => (
              <div key={schedules.key} className="py-4">
                <h1 className="font-semibold flex items-center gap-2">
                  <CalendarDays className="w-4 h-4"/>
    
                  <FormatDate date={new Date(schedules.key).getTime()} dateF="EEEE', 'd' de 'MMMM'"/>
                </h1>
    
                <div className="mt-2 flex flex-col">
                  {schedules.schedules.map(schedule => (
                    <DialogSchedule type="aside" key={schedule.id} schedule={schedule}/>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex items-center justify-center">
              <span className="text-sm text-muted-foreground">
                Nenhum agendamento
              </span>
            </div>
          )
        ) : (
          <div className="space-y-3">
            <Skeleton className="w-full h-24 rounded-md"/>
            <Skeleton className="w-full h-24 rounded-md"/>
            <Skeleton className="w-full h-24 rounded-md"/>
            <Skeleton className="w-full h-24 rounded-md"/>
          </div>
        )}
      </div>
    </div>
  );
}