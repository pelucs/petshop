'use client'

import { pt } from "date-fns/locale";
import { api } from "@/api/api";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Skeleton } from "@/components/ui/skeleton";
import { DateRange } from "react-day-picker";
import { MenuAdmin } from "../MenuAdmin";
import { FormatDate } from "../FormatDate";
import { HeaderAdmin } from "../HeaderAdmin";
import { CalendarDays } from "lucide-react";
import { ScheduleTypes } from "@/utils/schedulesType";
import { DialogSchedule } from "../DialogSchedule";
import { FilteringByStatus } from "./FilteringByStatus";
import { useEffect, useState } from "react";
import { addDays, isWithinInterval, subDays } from "date-fns";

interface SchedulesPerTimeTypes{
  key: string;
  schedules: ScheduleTypes[]
}

export default () => {

  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date().setHours(0, 0, 0, 0), 5),
    to: new Date(new Date().setHours(0, 0, 0, 0)),
  }); 

  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [filteringByStatus, setFilteringByStatus] = useState<{ value: string, title: string }[]>([]);
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
  
  useEffect(() => { fetchData() }, [date]);

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

      <div className="px-6 pb-6 flex flex-col md:flex-row items-start gap-5">
        <div className="md:sticky md:top-6">
          <Calendar
            locale={pt}
            mode="range"
            initialFocus
            selected={date}
            defaultMonth={date?.from}
            className="w-full border rounded-md"
            disabled={date => date > new Date()}
            onSelect={dateSelected => {
              if (dateSelected) {
                setDate({
                  from: dateSelected.from || subDays(new Date(), 5),
                  to: dateSelected.to || new Date()
                });
              } else {
                setDate({
                  from: subDays(new Date(), 5),
                  to: new Date()
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

        <div className="w-full">
          <div className="w-full flex items-center justify-between gap-4 ">
            {!loading ? (
              <div className="flex-1 flex flex-col items-center gap-4">
                <Input
                  className="w-full max-w-md"
                  placeholder="Buscar agendamento..."
                  onChange={e => setSearch(e.target.value.toLowerCase())}
                />

                <div className="h-9 px-3 border hidden md:flex items-center gap-2 border-dashed rounded-md">
                  <span className="text-sm text-muted-foreground">               
                    {filteredSchedules.reduce((total, day) => { 
                      return total + (day ? day.schedules.length : 0)
                    }, 0)} resultados
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center gap-4">
                <Skeleton className="w-full max-w-md h-9 rounded-md"/>
                <Skeleton className="w-[120px] h-9 rounded-md"/>
              </div>
            )}

            <FilteringByStatus setFilteringByStatus={setFilteringByStatus}/>
          </div>

          <div className="w-full min-h-screen mt-5 px-4 border rounded-md divide-y-[1px]">
            {!loading ? (
              filteredSchedules.length > 0 ? (
                filteredSchedules.map(day => (
                  <div key={day?.key} className="py-4">
                    <h1 className="font-semibold flex items-center gap-2">
                      <CalendarDays className="w-4 h-4"/>

                      <FormatDate date={new Date(day ? day.key : "").getTime()} dateF="EEEE', 'd' de 'MMMM'"/>
                    </h1>

                    <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-5">
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