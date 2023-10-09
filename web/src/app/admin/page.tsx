'use client'

import Link from "next/link";

import { api } from "@/api/api";
import { Button } from "@/components/ui/button";
import { MenuAdmin } from "./MenuAdmin";
import { FormatDate } from "./FormatDate";
import { TutorsCard } from "./cards-overview/TutorsCard";
import { HeaderAdmin } from "./HeaderAdmin";
import { ServicePanel } from "./ServicePanel";
import { StatusService } from "./StatusService";
import { ScheduleTypes } from "@/utils/schedulesType";
import { Clock, MoveRight } from "lucide-react";
import { ScheduleTodayCard } from "./cards-overview/ScheduleTodayCard";
import { NextSchedulesCard } from "./cards-overview/NextSchedulesCard";
import { TotalSchedulesCard } from "./cards-overview/TotalSchedulesCard";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default () => {

  const [schedulesToday, setSchedulesToday] = useState<ScheduleTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const response = await api.get("/schedules/today");
      setSchedulesToday(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => { fetchData(); }, []);

  return(
    <div>
      <HeaderAdmin/>
      <MenuAdmin title="Overview"/>

      <div className="px-6 grid grid-cols-1 md:grid-cols-4 gap-5">
        <ScheduleTodayCard schedules={schedulesToday} loading={loading}/>
        <NextSchedulesCard/>
        <TutorsCard/>
        <TotalSchedulesCard/>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* PAINEL DE SERVIÇOS */}
        <ServicePanel/>

        {/* AGENDAMENTOS DE HOJE */}
        <div className="h-full overflow-y-auto border rounded-md">
          <div className="py-4 px-5 flex items-center justify-between border-b">
            <div>
              <h1 className="font-semibold">
                Agendamentos de hoje
              </h1>

              <span className="text-muted-foreground text-sm">
                <FormatDate date={new Date().getTime()} dateF="EEEE', 'd' de 'MMMM'"/>
              </span>
            </div>

            <Button asChild>
              <Link href="/admin/hoje">
                Ver tudo

                <MoveRight className="w-4 h-4 ml-2"/>
              </Link>
            </Button>
          </div>

          <div className="px-5 divide-y-[1px]">
            {!loading ? (
              schedulesToday.length > 0 ? (
                schedulesToday.map(schedule => (
                  <div key={schedule.id} className="py-4 flex items-center gap-2">
                    <div className="flex-1">
                      <h1>
                        {schedule.service}
                      </h1>
    
                      <span className="flex items-center gap-1 text-muted-foreground text-sm">
                        <Clock className="w-4 h-4"/>
    
                        às <FormatDate date={new Date(Number(schedule.dateService)).getTime()} dateF="HH':'mm'"/>
                      </span>
                    </div>
    
                    <StatusService status={schedule.status}/>
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
      </div>
    </div>
  );
}