import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function schedulesRoutes(app: FastifyInstance){

  //Pegando todos os agendamentos
  app.get("/schedules", async () => {

    const schedules = await prisma.schedule.findMany();
  
    return schedules;
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
      isLost: z.boolean(),
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
        isLost: data.isLost,
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