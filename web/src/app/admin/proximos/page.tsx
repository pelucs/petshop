'use client'

import { pt } from "date-fns/locale";
import { api } from "@/api/api";
import { Calendar } from "@/components/ui/calendar";
import { Skeleton } from "@/components/ui/skeleton";
import { MenuAdmin } from "../MenuAdmin";
import { DateRange } from "react-day-picker";
import { FormatDate } from "../FormatDate";
import { HeaderAdmin } from "../HeaderAdmin";
import { CalendarDays } from "lucide-react";
import { ScheduleTypes } from "@/utils/schedulesType";
import { DialogSchedule } from "../DialogSchedule";
import { useCallback, useEffect, useState } from "react";
import { addDays, isWithinInterval } from "date-fns";

export interface SchedulesPerDayTypes{
  key: string;
  schedules: ScheduleTypes[]
}

export default () => {

  //Filtrando por data
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date().setHours(0, 0, 0, 0), 1),
    to: addDays(new Date().setHours(0, 0, 0, 0), 11)
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [schedulesPerDay, setSchedulesPerDay] = useState<SchedulesPerDayTypes[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await api.get("/schedules");
      getNextSchedules(response.data);
      console.log(date)
    } catch (error) {
      // Lidar com o erro da requisição
    }
  }, [date]);
  
  useEffect(() => { fetchData() }, [fetchData]);

  const getNextSchedules = (data: SchedulesPerDayTypes[]) => {
    const schedulesPerDayMap: SchedulesPerDayTypes[] = [];

    const { from, to } = date || {}

    data.forEach(day => {
      if(isWithinInterval(new Date(day.key), { 
        start: new Date(Number(from)), 
        end: new Date(Number(to))
      })) {
        schedulesPerDayMap.push(day);
      }
    });

    setSchedulesPerDay(schedulesPerDayMap);
    setLoading(false);
  }

  return(
    <div>
      <HeaderAdmin/>
      <MenuAdmin title="Próximos agendamentos"/>

      <div className="md:h-screen px-6 pb-6 flex flex-col md:flex-row items-start gap-5">
        <div className="md:sticky md:top-6">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            className="w-auto border rounded-md"
            locale={pt} 
            disabled={(date) =>
              date < new Date()
            }
            onSelect={dateSelected => {
              if (dateSelected) {
                setDate({
                  from: dateSelected.from || new Date(),
                  to: dateSelected.to || addDays(new Date(), 1)
                });
              } else {
                setDate({
                  from: new Date(),
                  to: addDays(new Date(), 1)
                });
              }
            }}
          />

          <div className="w-[250px] text-center mt-2 py-3 px-4 rounded-md border text-xs whitespace-pre-wrap
          flex items-center gap-2 justify-between">
            <FormatDate date={new Date(Number(date?.from)).getTime()} dateF="d' de 'MMM', 'Y"/>
            - 
            <FormatDate date={new Date(Number(date?.to)).getTime()} dateF="d' de 'MMM', 'Y"/>
          </div>
        </div>

        <div className="flex-1 rounded-md border">
          <div className="py-4 px-5 border-b flex items-center justify-between">
            <div>
              <h1 className="font-semibold">
                Próximos agendamentos
              </h1>

              <span className="text-muted-foreground text-sm">
                Essa listagem corresponde aos agendamentos de amanhã em diante.
              </span>
            </div>
          </div>

          <div>
            <div className="px-5 divide-y-[1px]">
              {!loading ? (
                schedulesPerDay.length > 0 ? (
                  schedulesPerDay.map(day => (
                    <div key={day.key} className="py-4">
                      <h1 className="font-semibold flex items-center gap-2">
                        <CalendarDays className="w-4 h-4"/>
    
                        <FormatDate date={new Date(day.key).getTime()} dateF="EEEE', 'd' de 'MMMM'"/>
                      </h1>
    
                      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-5">
                        {day.schedules.map(schedules => (
                          <DialogSchedule key={schedules.id} schedule={schedules} type="aside"/>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="h-[205px] flex items-center justify-center text-sm text-center text-muted-foreground">
                    <span>Nenhum agendamento para <br/> os próximos dias</span>
                  </div>
                )
              ) : (
                <div className="py-4 space-y-4">
                  <Skeleton className="w-full h-24"/>
                  <Skeleton className="w-full h-24"/>
                  <Skeleton className="w-full h-24"/>
                  <Skeleton className="w-full h-24"/>
                  <Skeleton className="w-full h-24"/>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}