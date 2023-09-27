'use client'

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScheduleTypes } from '@/utils/schedulesType';
import { AlertCircle, CheckCircle2, Clock, PawPrint, Phone, Trash2, XCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { StatusService } from './StatusService';
import clsx from 'clsx';
import { FormatDate } from './FormatDate';

interface TypeButtonTrigger{
  type: string;
  schedule: ScheduleTypes;
}

export function DialogSchedule({ type, schedule }: TypeButtonTrigger){
  return(
    <Dialog>
      {type === "aside" ? (
        <DialogTrigger className="flex-1 py-3 flex items-center justify-between hover:px-4 hover:bg-secondary transition-all rounded-md">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <h1>
                Banho e tosa
              </h1>

              <Separator orientation='vertical' className="h-4"/>

              <span className="flex items-center gap-1 text-muted-foreground text-xs">
                <Clock className="w-4 h-4"/>

                <FormatDate date={new Date(Number(schedule.dateService)).getTime()} dateF="'às 'HH'h'mm"/>
              </span>
            </div>

            <span className="flex items-center gap-1 text-muted-foreground text-xs">
              <PawPrint className="w-4 h-4"/>

              Maria Zaya
            </span>

            <span className="flex items-center gap-1 text-muted-foreground text-xs">
              <Phone className="w-4 h-4"/>

              (83) 98729-6826
            </span>
          </div>

          <StatusService status={schedule?.status}/>
        </DialogTrigger>
      ) : (
        <DialogTrigger 
          className={clsx("w-full py-2 px-2 flex flex-col items-start gap-2 border-l-4 rounded-tr rounded-br hover:bg-secondary transition-all", {
            "border-yellow-500": schedule.status === "pending",
            "border-green-500": schedule.status === "confirmed",
            "border-red-500": schedule.status === "rejected"
          })}
        >
          <StatusService status={schedule?.status}/>

          <h1 className="text-lg font-semibold leading-none">
            {schedule.service}
          </h1>

          <span className="flex items-center gap-1 text-muted-foreground text-xs">
            <PawPrint className="w-4 h-4"/>

            {schedule.petName}
          </span>

          <span className="flex items-center gap-1 text-muted-foreground text-xs">
            <Phone className="w-4 h-4"/>

            {schedule.contact}
          </span>
        </DialogTrigger>
      )}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {schedule?.service}
          </DialogTitle>

          <DialogDescription className="flex items-center gap-1">
            <Clock className="w-4 h-4"/>
            
            <FormatDate date={new Date(Number(schedule.dateService)).getTime()} dateF="EEEE', 'd' de 'MMMM' - 'HH'h'mm"/>
          </DialogDescription>
        </DialogHeader>

        <Separator/>

        <div className="space-y-5">
          <div>
            <span className="text-sm text-muted-foreground">Status</span>

            <StatusService status={schedule?.status}/>
          </div>

          <div className="grid grid-cols-3 gap-5">
            <div>
              <span className="text-sm text-muted-foreground">Pet</span>
              <h1>{schedule?.petName}</h1>
            </div>

            <div>
              <span className="text-sm text-muted-foreground">Tutor</span>
              <h1>{schedule?.tutor}</h1>
            </div>

            <div>
              <span className="text-sm text-muted-foreground">Contato</span>
              <h1>{schedule?.contact}</h1>
            </div>
          </div>

          {schedule?.observation && (
            <div>
              <span className="text-sm text-muted-foreground">Observação</span>
              <h1>
                {schedule?.observation}
              </h1>
            </div>
          )}

          <div className="flex items-center gap-2">
            <div className="flex-1 grid grid-cols-2 gap-2">
              <Button className="text-base bg-green-500 text-primary">
                <CheckCircle2 className="w-4 h-4 mr-2"/>

                Confirmar
              </Button>

              <Button variant="destructive" className="text-base">
                <XCircle className="w-4 h-4 mr-2"/>

                Rejeitar
              </Button>
            </div>

            <Button title="Excluir" variant="destructive">
              <Trash2 className="w-5 h-5"/>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}