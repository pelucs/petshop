'use client'

import { api } from "@/api/api";
import { Skeleton } from "@/components/ui/skeleton";
import { ScheduleTypes } from "@/utils/schedulesType";
import { CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";
import { SchedulesPerDayTypes } from "../proximos/page";

export function NextSchedulesCard(){

  const [nextSchedules, setNextSchedules] = useState<SchedulesPerDayTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const response = await api.get("/schedules");
      getNextSchedules(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => { fetchData(); }, []);

  const getNextSchedules = (data: SchedulesPerDayTypes[]) => {
    console.log(data)
  }

  return(
    <div>
      {!loading ? (
        <div className="py-4 px-5 flex flex-col gap-5 border rounded-md">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold">
              Próximos agendamentos
            </h1>

            <CalendarDays className="w-4 h-4"/>
          </div>

          <div className="flex flex-col">
            <strong className="text-4xl">
              0
            </strong>

            <span className="text-muted-foreground text-sm">
              agendamento(s)
            </span>
          </div>
        </div>
      ) : (
        <div>
          <Skeleton className="w-full h-[140px] rounded-md"/>
        </div>
      )}
    </div>
  );
}