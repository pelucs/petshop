'use client'

import { cn } from "@/lib/utils";
import { format, isAfter, isSunday, parse } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CreateScheduleFormData, scheduleSchema } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDays, Frown, PawPrint } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { pt } from "date-fns/locale";
import { api } from "@/api/api";

import decode from 'jwt-decode';
import { hours } from "@/utils/hours";

interface CreateScheduleFormProps{
  code: string;
}

interface User{
  sub: string;
  tutor: string;
  contact: string;
}

export function CreateScheduleForm({ code }: CreateScheduleFormProps){

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [service, setService] = useState<string>("");
  const [hourService, setHourService] = useState<string>("");

  const { register, handleSubmit, formState: { errors } } = useForm<CreateScheduleFormData>({
    resolver: zodResolver(scheduleSchema)
  });

  const user: User = decode(code);

  const createSchedule = async (data: CreateScheduleFormData) => {

    //Formatando a data do agendamento
    const dateSelected = new Date(Number(date)),
          year = dateSelected.getFullYear(),
          month = dateSelected.getMonth() + 1,
          day = dateSelected.getDate();

    const dateService = new Date(`${year}-${month}-${day} ${hourService}`).getTime().toString();
          
    await api.post("/schedules", {
      userId: user.sub,
      petName: data.petName,
      observation: data.observation,
      status: "pending",
      service,
      dateService,
    })
    .then(() => {
      window.location.pathname = "/sucesso"
    })
  }

  return(
    <form onSubmit={handleSubmit(createSchedule)} className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold">Olá, {user.tutor.split(' ')[0]}</h1>
        <p className="text-sm text-muted-foreground">
          Preencha os campos corretamente
        </p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-5">
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
                  "w-full justify-start text-left font-normal",
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
                locale={pt}
                selected={date}
                onSelect={setDate}
                className="border rounded-md"
                disabled={date => date < new Date()}
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
              {hours.map(hour => (
                <SelectItem 
                  key={hour.value} 
                  value={hour.value}
                  disabled={isAfter(new Date(), parse(hour.value, 'HH:mm', new Date(date ? date : "")))}
                >
                  {hour.value}
                </SelectItem>
              ))}
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
          placeholder="Escreva uma mensagem"
          className="h-40 resize-none"
        />
      </div>

      {!isSunday(new Date()) ? (
        <span className="w-full py-2 rounded-md bg-secondary flex justify-center items-center 
        gap-2 text-muted-foreground">
          <Frown className="w-5 h-5"/>
          
          Petshop fechado
        </span>
      ) : (
        <Button type="submit" className="w-full gap-2">
          Agendar 

          <PawPrint className="w-4 h-4"/>
        </Button>
      )}

    </form>
  );
}