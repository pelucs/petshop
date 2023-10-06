import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import { ScheduleTypes } from "./schedules";

interface TutorsTypes{
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: Date;
  schedules: ScheduleTypes[]
}

export async function authRoutes(app: FastifyInstance){

  //Registrando um tutor
  app.post("/register", async (req) => {

    const bodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      phone: z.string(),
      address: z.string()
    });

    const { name, email, phone, address } = bodySchema.parse(req.body);

    let user = await prisma.user.findUnique({
      where: {
        email,
      }
    });
    
    if(!user){
      user = await prisma.user.create({
        data: {
          name,
          email,
          phone,
          address,
        }
      });
    }

    const token = app.jwt.sign(
      {
        tutor: user?.name,
        contact: user?.phone
      },
      {
        sub: user?.id,
        expiresIn: '30 days'
      }
    );
  
    return token;
  });

  //Resgatando todos os tutores
  app.get("/tutors", async () => {

    const tutors = await prisma.user.findMany();

    const schedules = await prisma.schedule.findMany();

    const tutorMap: TutorsTypes[] = [];

    tutors.forEach(tutor => {
      const filteringSchedulesByTutor = schedules.filter(schedule => schedule.userId === tutor.id);

      tutorMap.push({
        id: tutor.id,
        name: tutor.name,
        email: tutor.email,
        phone: tutor.phone,
        address: tutor.address,
        createdAt: tutor.createdAt,
        schedules: filteringSchedulesByTutor,
      })
    })

    return tutorMap;
  });

  //Regatando informações de um tutor específico
  app.get("/tutors/:id", async (req) => {

    const paramsSchema = z.object({
      id: z.string().uuid()
    });

    const { id } = paramsSchema.parse(req.params);

    const tutor = await prisma.user.findFirstOrThrow({
      where: {
        id,
      }
    });

    return tutor;
  });
}