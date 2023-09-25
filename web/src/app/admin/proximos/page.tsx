'use client'

import { CalendarDays } from "lucide-react";
import { HeaderAdmin } from "../HeaderAdmin";
import { MenuAdmin } from "../MenuAdmin";
import { DialogSchedule } from "../DialogSchedule";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";

export default () => {

  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), 1),
    to: addDays(new Date(), 11)
  });

  return(
    <div>
      <HeaderAdmin/>
      <MenuAdmin title="Próximos agendamentos"/>

      <div className="px-6 pb-6 flex items-start gap-5">
        <div className="sticky top-6">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            className="w-auto border rounded-md"
            disabled={(date) =>
              date < new Date()
            }
          />
        </div>

        <div className="flex-1 rounded-md border">
          <div className="py-4 px-5 border-b flex items-center justify-between">
            <div>
              <h1 className="font-semibold">
                Próximos agendamentos
              </h1>

              <span className="text-muted-foreground text-sm">
                Essa listagem corresponde aos agendamentos de amanhã em diante.
              </span>
            </div>
          </div>

          <div>
            {/* <div className="h-[205px] flex items-center justify-center text-sm text-center text-muted-foreground">
              <span>Nenhum agendamento para <br/> os próximos dias</span>
            </div> */}

            <div className="px-5 divide-y-[1px]">
              <div className="py-4">
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

              <div className="py-4">
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
        </div>
      </div>
    </div>
  );
}