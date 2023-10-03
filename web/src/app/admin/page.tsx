'use client'

import Link from "next/link";

import { HeaderAdmin } from "./HeaderAdmin";
import { MenuAdmin } from "./MenuAdmin";
import { Button } from "@/components/ui/button";
import { CalendarClock, CalendarDays, CheckCircle, Clock, MoveRight, User } from "lucide-react";
import { ServicePanel } from "./ServicePanel";
import { StatusService } from "./StatusService";
import { useEffect, useState } from "react";
import { ScheduleTypes } from "@/utils/schedulesType";
import { api } from "@/api/api";
import { FormatDate } from "./FormatDate";

export default () => {

  const [schedules, setSchedules] = useState<ScheduleTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("/schedules/today");
      setSchedules(response.data);
    };

    fetchData();
  }, []);

  return(
    <div>
      <HeaderAdmin/>
      <MenuAdmin title="Overview"/>

      <div className="px-6 grid grid-cols-4 gap-5">
        <div className="py-4 px-5 flex flex-col gap-5 border rounded-md">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold">
              Agenda de hoje
            </h1>

            <CalendarClock className="w-4 h-4"/>
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

        <div className="py-4 px-5 flex flex-col gap-5 border rounded-md">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold">
              Total de serviços
            </h1>

            <CheckCircle className="w-4 h-4"/>
          </div>

          <div className="flex flex-col">
            <strong className="text-4xl">
              0
            </strong>

            <span className="text-muted-foreground text-sm">
              serviços
            </span>
          </div>
        </div>

        <div className="py-4 px-5 flex flex-col gap-5 border rounded-md">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold">
              Tutores registrados
            </h1>

            <User className="w-4 h-4"/>
          </div>

          <div className="flex flex-col">
            <strong className="text-4xl">
              0
            </strong>

            <span className="text-muted-foreground text-sm">
              tutores
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 grid grid-cols-2 gap-5">
        {/* PAINEL DE SERVIÇOS */}
        <ServicePanel/>

        {/* AGENDAMENTOS DE HOJE */}
        <div className="h-fit border rounded-md">
          <div className="py-4 px-5 flex items-center justify-between border-b">
            <div>
              <h1 className="font-semibold">
                Agendamentos de hoje
              </h1>

              <span className="text-muted-foreground text-sm">
                quinta-feira, 22 de out
              </span>
            </div>

            <Button asChild>
              <Link href="/admin/hoje">
                Ver tudo

                <MoveRight className="w-4 h-4 ml-2"/>
              </Link>
            </Button>
          </div>

          <div className="py-4 px-5 space-y-4">
            {schedules.length > 0 ? (
              schedules.map(schedule => (
                <div className="flex items-center gap-2">
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}