import Link from "next/link";
import { HeaderAdmin } from "./HeaderAdmin";
import { MenuAdmin } from "./MenuAdmin";
import { Button } from "@/components/ui/button";
import { AlertCircle, CalendarClock, CalendarDays, CheckCircle, CheckCircle2, Clock, MoveRight, User, XCircle } from "lucide-react";
import { ServicePanel } from "./ServicePanel";

const schedules = [
  { service: "Banho e tosa", hour: "08h30", status: "Pendente" },
  { service: "Vacina", hour: "09h30", status: "Confirmado" },
  { service: "Tosa", hour: "08h30", status: "Rejeitado" },
  { service: "Banho", hour: "08h30", status: "Concluído" },
];

export default () => {
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
              05
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
              10
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
              425
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
              45
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
        <div className="py-4 px-5 h-fit border rounded-md">
          <div className="flex items-start justify-between">
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

          <div className="mt-5 space-y-4">
            {schedules.map(schedule => (
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <h1>
                    {schedule.service}
                  </h1>

                  <span className="flex items-center gap-1 text-muted-foreground text-sm">
                    <Clock className="w-4 h-4"/>

                    às {schedule.hour}
                  </span>
                </div>

                {schedule.status === "Pendente" ? (
                  <span className="py-1 px-2 rounded flex items-center gap-1 text-yellow-500 bg-yellow-950">
                    <AlertCircle className="w-4 h-4"/>

                    Pendente
                  </span>
                ) : schedule.status === "Confirmado" ? (
                  <span className="py-1 px-2 rounded flex items-center gap-1 text-green-500 bg-green-950">
                    <CheckCircle2 className="w-4 h-4"/>

                    Confirmado
                  </span>
                ) : (
                  <span className="py-1 px-2 rounded flex items-center gap-1 text-red-500 bg-red-950">
                    <XCircle className="w-4 h-4"/>

                    Rejeitado
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}