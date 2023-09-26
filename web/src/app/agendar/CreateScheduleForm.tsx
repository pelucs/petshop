'use client'

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CreateScheduleFormData, scheduleSchema } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDays, PawPrint } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function CreateScheduleForm(){

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [service, setService] = useState<string>("");
  const [hourService, setHourService] = useState<string>("");

  const { register, handleSubmit, formState: { errors } } = useForm<CreateScheduleFormData>({
    resolver: zodResolver(scheduleSchema)
  });

  const createSchedule = async (data: CreateScheduleFormData) => {
    console.log(data.petName, service, date, hourService)
  }

  return(
    <form onSubmit={handleSubmit(createSchedule)} className="space-y-5">
      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="petName" className="text-sm text-muted-foreground">
            Nome do pet
          </Label>

          <Input
            id="petName"
            placeholder="Informe o nome do pet"
            {...register("petName")}
          />

          {errors.petName && (
            <span className="text-xs text-red-500">{errors.petName.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="address" className="text-sm text-muted-foreground">
            Serviço
          </Label>

          <Select onValueChange={setService}>
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

          <Select onValueChange={setHourService}>
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
          {...register("observation")}
          placeholder="Escreva uam mensagem"
          className="h-40 resize-none"
        />
      </div>

      <Button type="submit" className="w-full gap-2">
        Agendar 

        <PawPrint className="w-4 h-4"/>
      </Button>
    </form>
  );
}