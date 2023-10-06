'use client'

import clsx from 'clsx';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScheduleTypes } from '@/utils/schedulesType';
import { CheckCircle2, Clock, MessageCircle, PawPrint, Phone, Trash2, XCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { StatusService } from './StatusService';
import { FormatDate } from './FormatDate';
import { api } from '@/api/api';
import { useEffect, useState } from 'react';
import { TutorsTypes } from '@/utils/tutorTypes';
import { Popover, PopoverTrigger } from '@/components/ui/popover';
import { PopoverContent } from '@radix-ui/react-popover';

interface TypeButtonTrigger{
  type: string;
  schedule: ScheduleTypes;
}

export function DialogSchedule({ type, schedule }: TypeButtonTrigger){

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [tutor, setTutor] = useState<TutorsTypes | undefined>();

  const confirmedSchedule = async (id: string, status: string) => {
    await api.put(`/schedules/${id}`, {
      status,
    })
    .then(() => {
      window.location.reload();
    });
  }

  //Resgatando as informações do tutor
  useEffect(() => {
    if(open){
      const getTutor = async () => {
        await api.get(`/tutors/${schedule.userId}`)
        .then(req => {
          setTutor(req.data);
          setLoading(false);
        })
      }

      getTutor();
    }
  }, [open]);

  //Exluir agendamento
  const deleteSchedule = async (id: string) => {
    await api.delete(`/schedules/${id}`)
    .then(() => window.location.reload())
  }

  return(
    <Dialog onOpenChange={setOpen}>
      {type === "aside" ? (
        <DialogTrigger className="flex-1 py-3 flex items-center justify-between hover:px-4 hover:bg-secondary transition-all rounded-md">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <h1 className="text-left">
                {schedule.service}
              </h1>

              <Separator orientation='vertical' className="h-4"/>

              <span className="flex items-center gap-1 text-muted-foreground text-xs">
                <Clock className="w-4 h-4"/>

                <FormatDate date={new Date(Number(schedule.dateService)).getTime()} dateF="'às 'HH'h'mm"/>
              </span>
            </div>

            <span className="flex items-center gap-1 text-muted-foreground text-xs">
              <PawPrint className="w-4 h-4"/>

              {schedule.petName}
            </span>

            {schedule.observation && (
              <div className="flex items-center gap-1 text-muted-foreground text-xs">
                <MessageCircle className="w-4 h-4"/>

                <span className="w-full max-w-[150px] whitespace-nowrap text-ellipsis overflow-hidden ">
                  {schedule.observation}
                </span>
              </div>
            )}
          </div>

          <StatusService status={schedule?.status}/>
        </DialogTrigger>
      ) : (
        <DialogTrigger 
          className={clsx("w-full py-2 px-2 flex flex-col items-start gap-2 border-l-4 rounded-tr rounded-br hover:bg-secondary transition-all", {
            "border-yellow-500": schedule.status === "pending",
            "border-green-500": schedule.status === "confirmed" || schedule.status === "conclued",
            "border-red-500": schedule.status === "rejected" || schedule.status === "lost",
          })}
        >
          <StatusService status={schedule?.status}/>

          <h1 className="text-lg font-semibold leading-none">
            {schedule.service}
          </h1>

          <div className="flex items-center gap-1 text-muted-foreground text-xs">
            <PawPrint className="w-4 h-4"/>

            <span>
              {schedule.petName}
            </span>
          </div>

          {schedule.observation && (
            <div className="flex items-center gap-1 text-muted-foreground text-xs">
              <MessageCircle className="w-4 h-4"/>

              <span className="w-full max-w-[150px] whitespace-nowrap text-ellipsis overflow-hidden ">
                {schedule.observation}
              </span>
            </div>
          )}
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
              <h1>{tutor?.name}</h1>
            </div>

            <div>
              <span className="text-sm text-muted-foreground">Contato</span>
              <h1>{tutor?.phone}</h1>
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
              {schedule.status === "pending" || schedule.status === "rejected" ? (
                <Button 
                  onClick={() => confirmedSchedule(schedule.id, "confirmed")} 
                  className="text-base hover:bg-green-400 bg-green-500"
                >
                  <CheckCircle2 className="w-4 h-4 mr-1"/>

                  Confirmar
                </Button>
              ) : schedule.status === "confirmed" ? (
                <Button 
                  onClick={() => confirmedSchedule(schedule.id, "conclued")} 
                  className="text-base hover:bg-green-400 bg-green-500"
                >
                  <CheckCircle2 className="w-4 h-4 mr-1"/>

                  Concluir
                </Button>
              ) : (
                ""
              )}

              {(schedule.status === "pending" || schedule.status === "confirmed") && (
                <Button 
                  onClick={() => confirmedSchedule(schedule.id, "rejected")} 
                  variant="destructive" 
                  className="text-base"
                >
                  <XCircle className="w-4 h-4 mr-1"/>

                  Rejeitar
                </Button>
              )}
            </div>

            <Popover>
              <Button asChild variant="destructive">
                <PopoverTrigger title="Excluir">
                  <Trash2 className="w-5 h-5"/>
                </PopoverTrigger>
              </Button>

              <PopoverContent className="w-80 p-4 bg-background border rounded-md relative top-2">
                <div className="flex flex-col space-y-5">
                  <h1 className="text-center leading-tight">Tem certeza que <br/> deseja excluir?</h1>

                  <div className="grid grid-cols-2 gap-3">
                    <Button onClick={() => deleteSchedule(schedule.id)} variant={'destructive'}>
                      Exlcuir
                    </Button>

                    <Button variant={'secondary'}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}