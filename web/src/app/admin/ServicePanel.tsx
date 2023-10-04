'use client'

import { api } from "@/api/api";
import { Skeleton } from "@/components/ui/skeleton";
import { FormatDate } from "./FormatDate";
import { CalendarDays } from "lucide-react";
import { ScheduleTypes } from "@/utils/schedulesType";
import { DialogSchedule } from "./DialogSchedule";
import { isPast, isToday } from "date-fns";
import { useEffect, useState } from "react";

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
      const filtering = day.schedules.filter(schedule => schedule.status === "pending");
      
      if (filtering.length > 0) {
        schedulesMap.push({
          key: day.key,
          schedules: filtering
        });
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
          <div className="mt-3 space-y-3">
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