'use client'

import { HeaderAdmin } from "../HeaderAdmin";
import { MenuAdmin } from "../MenuAdmin";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { subDays } from "date-fns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarDays, SlidersHorizontal } from "lucide-react";
import { DialogSchedule } from "../DialogSchedule";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default () => {

  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 10),
    to: new Date()
  });

  console.log(date)

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
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
          />

          <p className="w-[250px] mt-2 py-2 px-4 rounded-md bg-secondary text-xs text-muted-foreground whitespace-pre-wrap">
            Escolha as datas para filtrar os agendamentos
          </p>
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <Input
              placeholder="Buscar de 425 agendamentos..."
              className="w-full max-w-md"
            />

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

          <div className="mt-5 px-4 border rounded-md divide-y-[1px]">
            <div className="py-4">
              <h1 className="font-semibold flex items-center gap-2">
                <CalendarDays className="w-4 h-4"/>

                quarta-feira, 22 de out (hoje)
              </h1>

              <div className="mt-2 grid grid-cols-2 gap-x-5">
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

              <div className="mt-2 grid grid-cols-2 gap-x-5">
                <DialogSchedule type="aside"/>
                <DialogSchedule type="aside"/>
              </div>
            </div>

            <div className="py-4">
              <h1 className="font-semibold flex items-center gap-2">
                <CalendarDays className="w-4 h-4"/>

                quarta-feira, 22 de out (hoje)
              </h1>

              <div className="mt-2 grid grid-cols-2 gap-x-5">
                <DialogSchedule type="aside"/>
                <DialogSchedule type="aside"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}