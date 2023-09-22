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
      <MenuAdmin title="Próximos agendamentos"/>

      <div className="px-6 pb-6 flex items-start gap-5">
        <div className="sticky top-6 w-full max-w-md">
          <ServicePanel/>
        </div>

        <div className="min-h-screen flex-1 rounded-md border">
          <div className="py-4 px-5 border-b">
            <h1 className="font-semibold">
              Próximos agendamentos
            </h1>

            <span className="text-muted-foreground text-sm">
              Essa listagem corresponde aos agendamentos de amanhã em diante.
            </span>
          </div>

          <div className="min-h-screen grid grid-cols-4 divide-x-[1px] divide-y-[1px] divide-secondary">
            
          </div>
        </div>
      </div>
    </div>
  );
}