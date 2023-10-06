'use client'

import { api } from "@/api/api";
import { HeaderAdmin } from "../HeaderAdmin";
import { MenuAdmin } from "../MenuAdmin";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays, isWithinInterval, subDays } from "date-fns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, SlidersHorizontal } from "lucide-react";
import { DialogSchedule } from "../DialogSchedule";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScheduleTypes } from "@/utils/schedulesType";
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

  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [schedulesPerDay, setSchedulesPerDay] = useState<SchedulesPerTimeTypes[]>([]);

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

  const filteredSchedules = schedulesPerDay.map(day => {
    const filteredDaySchedules = day.schedules.filter(schedule => 
      schedule.petName.toLowerCase().includes(search) || schedule.id.toLowerCase().includes(search) ||
      schedule.service.toLowerCase().includes(search) || schedule.userId.toLowerCase().includes(search)
    );
    
    if (filteredDaySchedules.length > 0) {
      return {
        key: day.key,
        schedules: filteredDaySchedules
      };
    }
  
    return null;
  }).filter(Boolean); //Isso remove os elementos nulos ou vazios da matriz.

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
            {!loading ? (
              <div className="flex-1 flex items-center gap-4">
                <Input
                  className="w-full max-w-md"
                  placeholder="Buscar agendamento..."
                  onChange={e => setSearch(e.target.value.toLowerCase())}
                />

                <div className="h-9 px-3 border flex items-center gap-2 border-dashed rounded-md">
                  <span className="text-sm flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4"/>
                    
                    {filteredSchedules.reduce((total, day) => { 
                      return total + (day ? day.schedules.length : 0)
                    }, 0)} agendamentos
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center gap-4">
                <Skeleton className="w-full max-w-md h-9 rounded-md"/>
                <Skeleton className="w-[120px] h-9 rounded-md"/>
              </div>
            )}

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
              filteredSchedules.length > 0 ? (
                filteredSchedules.map(day => (
                  <div key={day?.key} className="py-4">
                    <h1 className="font-semibold flex items-center gap-2">
                      <CalendarDays className="w-4 h-4"/>

                      <FormatDate date={new Date(day ? day.key : "").getTime()} dateF="EEEE', 'd' de 'MMMM'"/>
                    </h1>

                    <div className="mt-2 grid grid-cols-2 gap-x-5">
                      {day?.schedules.map(schedules => (
                        <DialogSchedule 
                          type="aside"
                          key={schedules.id} 
                          schedule={schedules} 
                        />
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