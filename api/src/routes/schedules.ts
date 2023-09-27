import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { isPast, isToday } from 'date-fns';
import { z } from "zod";

export interface ScheduleTypes{
  id: string;
  userId: string;
  tutor: string;
  contact: string;
  petName: string;
  service: string;
  observation: string;
  dateService: string;
  status: string;
}

export async function schedulesRoutes(app: FastifyInstance){

  //Pegando todos os agendamentos
  app.get("/schedules", async () => {

    const schedules = await prisma.schedule.findMany();

    const schedulePerDayMap = new Map<string, ScheduleTypes[]>();
    
    schedules.forEach(schedule => {
      const dateService = new Date(Number(schedule.dateService)),
            year = dateService.getFullYear(),
            month = dateService.getMonth() + 1,
            day = dateService.getDate();

      const key = `${year}/${month}/${day}`;

      if(schedulePerDayMap.has(key)){
        schedulePerDayMap.get(key)?.push(schedule);
      } else{
        schedulePerDayMap.set(key, [schedule]);
      }
    });

    const schedulePerDay: Array<{ key: string, schedules: ScheduleTypes[] }> = [];

    //Ordenando os agendamentos
    schedulePerDayMap.forEach((object, key) => {
      const ordering = object.sort((a, b) => Number(a.dateService) - Number(b.dateService));

      schedulePerDay.push({
        key,
        schedules: ordering
      })
    });

    return schedulePerDay;
  });

  //Agendamentos de hoje
  app.get("/schedules/today", async () => {
    const schedules = await prisma.schedule.findMany();

    const todaySchedules: ScheduleTypes[] = [];

    //Analisando cada agendamento
    for(const schedule of schedules){

      //O agendamento é de hoje?
      if(isToday(Number(schedule.dateService))){

        //O agendamento está pendente?
        if(schedule.status === "pending"){

          //O agendamento é passado?
          if(isPast(Number(schedule.dateService))){
            
            //Transformar como agendamento perdido
            await prisma.schedule.update({
              where: {
                id: schedule.id
              },
              data: {
                ...schedule,
                status: "lost"
              }
            })

            todaySchedules.push({
              ...schedule,
              status: "lost",
            });
            
          } else{
            todaySchedules.push(schedule);
          }
        } else{
          todaySchedules.push(schedule);
        }
      }
    }

    return todaySchedules;
  });

  //Pegando agendamento específico
  app.get("/schedules/:id", async (req) => {

    const paramsSchema = z.object({
      id: z.string().uuid()
    })

    const { id } = paramsSchema.parse(req.params);
  
    const schedules = await prisma.schedule.findUnique({
      where: {
        id,
      }
    });
  
    return schedules;
  });

  //Criando um agendamento
  app.post("/schedules", async (req) => {

    const bodySchema = z.object({
      userId: z.string(),
      tutor: z.string(),
      contact: z.string(),
      petName: z.string(),
      service: z.string(),
      dateService: z.string(),
      status: z.string(),
      observation: z.string(),
    })

    const data = bodySchema.parse(req.params);
  
    const schedules = await prisma.schedule.create({
      data: {
        userId: data.userId,
        tutor: data.tutor,
        contact: data.contact,
        petName: data.petName,
        service: data.service,
        dateService: data.dateService,
        status: data.status,
        observation: data.observation,
      }
    });
  
    return schedules;
  });

  //Deletando um agendamento
  app.delete("/schedules/:id", async (req) => {

    const paramsSchema = z.object({
      id: z.string().uuid()
    })

    const { id } = paramsSchema.parse(req.params);
  
    const schedules = await prisma.schedule.delete({
      where: {
        id,
      }
    });
  
    return schedules;
  });
}