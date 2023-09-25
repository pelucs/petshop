import { CalendarDays } from "lucide-react";
import { DialogSchedule } from "./DialogSchedule";

export function ServicePanel(){
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

      <div className="py-4 px-5 space-y-5">
        {/* <div className="h-full flex items-center justify-center">
          <span className="text-sm text-muted-foreground">
            Nenhum agendamento
          </span>
        </div> */}

        <div>
          <h1 className="font-semibold flex items-center gap-2">
            <CalendarDays className="w-4 h-4"/>

            quarta-feira, 22 de out (hoje)
          </h1>

          <div className="mt-2 flex flex-col">
            <DialogSchedule type="aside"/>
            <DialogSchedule type="aside"/>
            <DialogSchedule type="aside"/>
          </div>
        </div>
      </div>
    </div>
  );
}