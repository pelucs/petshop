'use client'

import { HeaderAdmin } from "../HeaderAdmin";
import { MenuAdmin } from "../MenuAdmin";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays, format, isWithinInterval, subDays } from "date-fns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarDays, SlidersHorizontal } from "lucide-react";
import { DialogSchedule } from "../DialogSchedule";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScheduleTypes } from "@/utils/schedulesType";
import { api } from "@/api/api";
import { Skeleton } from "@/components/ui/skeleton";
import { FormatDate } from "../FormatDate";
import { pt } from "date-fns/locale";

interface SchedulesPerTimeTypes{
  key: string;
  schedules: ScheduleTypes[]
}

export default () => {

  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date().setHours(0, 0, 0, 0), 5),
    to: addDays(new Date().setHours(0, 0, 0, 0), 5),
  }); 

  const [loading, setLoading] = useState<boolean>(true);
  const [schedulesPerDay, setSchedulesPerDay] = useState<SchedulesPerTimeTypes[]>([]);
  const [search, setSearch] = useState<string>("");

  //Pegando os próximos agendamentos
  const fetchData = async () => {
    try {
      const response = await api.get("/schedules");
      getNextSchedules(response.data);
    } catch (error) {
      console.log(error)
    }
  };
  
  useEffect(() => { fetchData(); }, [date]);

  const getNextSchedules = (data: SchedulesPerTimeTypes[]) => {
    const schedulesPerDayMap: SchedulesPerTimeTypes[] = [];

    data.forEach(day => {

      //Desestruturando meu estado de Date
      const { from, to } = date || {};
      const { key } = day;

      //Corrigir
      if (isWithinInterval(new Date(key), { // O agendamento está no intervalo dessas datas?
        start: new Date(Number(from)),
        end: new Date(Number(to))
      })){
        schedulesPerDayMap.push(day);
      }
      });

    setSchedulesPerDay(schedulesPerDayMap);
    setLoading(false);
  }

  //Melhorar
  const filteringSchedules = search.length > 0 
  ? schedulesPerDay.filter(day => day.key.includes(search) || day.schedules.filter(schedule => schedule.petName.includes(search) || schedule.userId.includes(search)))
  : schedulesPerDay;

  return(
    <div>
      <HeaderAdmin/>
      <MenuAdmin title="Histórico"/>

      <div className="px-6 pb-6 flex items-start gap-5">
        <div className="sticky top-6">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            className="w-auto border rounded-md"
            locale={pt}
          />

          <p className="w-[250px] mt-2 py-2 px-4 rounded-md bg-secondary text-xs text-muted-foreground whitespace-pre-wrap">
            Escolha as datas para filtrar os agendamentos
          </p>
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <Input
              className="w-full max-w-md"
              placeholder="Buscar agendamento..."
              onChange={e => setSearch(e.target.value)}
            />

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <SlidersHorizontal className="w-4 h-4"/>

                  Filtrar
                </Button>
              </PopoverTrigger>

              <PopoverContent className="absolute right-0">
                Olá
              </PopoverContent>
            </Popover>
          </div>

          <div className="min-h-screen mt-5 px-4 border rounded-md divide-y-[1px]">
            {!loading ? (
              schedulesPerDay.length > 0 ? (
                filteringSchedules.map(day => (
                  <div key={day.key} className="py-4">
                    <h1 className="font-semibold flex items-center gap-2">
                      <CalendarDays className="w-4 h-4"/>

                      <FormatDate date={new Date(day.key).getTime()} dateF="EEEE', 'd' de 'MMMM'"/>
                    </h1>

                    <div className="mt-2 grid grid-cols-2 gap-x-5">
                      {day.schedules.map(schedules => (
                        <DialogSchedule key={schedules.id} schedule={schedules} type="aside"/>
                      ))}
                    </div>
                  </div>
                ))
              ): (
                <div className="h-[205px] flex items-center justify-center text-sm text-center text-muted-foreground">
                  <span>Nenhum agendamento registrado</span>
                </div>
              )
            ) : (
              <div className="py-4 grid grid-cols-2 gap-5">
                <Skeleton className="h-20 rounded-md"/>
                <Skeleton className="h-20 rounded-md"/>
                <Skeleton className="h-20 rounded-md"/>
                <Skeleton className="h-20 rounded-md"/>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}