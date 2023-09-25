'use client'

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarDays, PawPrint } from "lucide-react";
import { useState } from "react";

export function CreateScheduleForm(){

  const [date, setDate] = useState<Date | undefined>(new Date());

  return(
    <form className="space-y-5">
      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="pet" className="text-sm text-muted-foreground">
            Nome do pet
          </Label>

          <Input
            id="pet"
            placeholder="Informe o nome do pet"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="address" className="text-sm text-muted-foreground">
            Serviço
          </Label>

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um serviço"/>
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="Vacina">Vacina</SelectItem>
              <SelectItem value="Banho">Banho</SelectItem>
              <SelectItem value="Banho e tosa">Banho e tosa</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="pet" className="text-sm text-muted-foreground">
            Selecione a data
          </Label>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarDays className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Selecione a data</span>}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="border rounded-md"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-sm text-muted-foreground">
            Horário
          </Label>

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um horário"/>
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="08h30">08h30</SelectItem>
              <SelectItem value="09h00">09h00</SelectItem>
              <SelectItem value="09h30">09h30</SelectItem>
              <SelectItem value="10h00">10h00</SelectItem>
              <SelectItem value="10h30">10h30</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="observation" className="text-sm text-muted-foreground">
          Observação (opcional)
        </Label>

        <Textarea
          id="observation"
          placeholder="Escreva uam mensagem"
          className="h-40 resize-none"
        />
      </div>

      <Button className="w-full gap-2">
        Agendar 

        <PawPrint className="w-4 h-4"/>
      </Button>
    </form>
  );
}