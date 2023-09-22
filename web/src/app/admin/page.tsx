import { CalendarClock, CalendarDays, CheckCircle, MoveRight, User } from "lucide-react";
import { HeaderAdmin } from "./HeaderAdmin";
import { MenuAdmin } from "./MenuAdmin";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default () => {
  return(
    <div className="">
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

      <div className="p-6 grid grid-cols-2 gap-10">
        <div className="py-4 px-5 border rounded-md">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="font-semibold">
                Agendamentos de hoje
              </h1>

              <span className="text-muted-foreground text-sm">
                Total de 5 agendamento
              </span>
            </div>

            <Button asChild>
              <Link href="/admin/hoje">
                Ver tudo

                <MoveRight className="w-4 h-4 ml-2"/>
              </Link>
            </Button>
          </div>

          <div>

          </div>
        </div>
      </div>
    </div>
  );
}