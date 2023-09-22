import { Clock } from "lucide-react";
import { HeaderAdmin } from "../HeaderAdmin";
import { MenuAdmin } from "../MenuAdmin";
import { ServicePanel } from "../ServicePanel";
import { DialogSchedule } from "../DialogSchedule";

const horarios = [
  "08h00", "08h30", "09h00", "09h30", "10h00", "10h30", "11h00", "11h30", 
  "13h30", "14h00", "14h30", "15h00", "15:30", "16h00", "16h30", "17h00"
];

export default () => {
  return(
    <div>
      <HeaderAdmin/>
      <MenuAdmin title="Agendamentos de hoje"/>

      <div className="px-6 pb-6 flex items-start gap-5">
        <div className="sticky top-6 w-full max-w-md">
          <ServicePanel/>
        </div>

        <div className="min-h-screen flex-1 rounded-md border">
          <div className="py-4 px-5 border-b">
            <h1 className="font-semibold">
              Horários de hoje (quinta-feira, 22 de out)
            </h1>

            <span className="text-muted-foreground text-sm">
              Essa listagem inclui agendamentos pendentes, confirmados, concluídos, rejeitados e perdidos.
            </span>
          </div>

          <div className="min-h-screen grid grid-cols-4 divide-x-[1px] divide-y-[1px] divide-secondary">
            {horarios.map(horario => (
              <div key={horario} className="p-2 flex flex-col">
                <h1 className="w-full py-2 flex items-center justify-center gap-1 rounded bg-secondary">
                  <Clock className="w-4 h-4"/>

                  {horario}
                </h1>

                <div className="flex-1 mt-5 space-y-3">
                  {/* <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground">
                    <span>
                      Nenhum agendamento
                    </span>
                  </div> */}

                  <DialogSchedule type="calendar"/>
                  <DialogSchedule type="calendar"/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}