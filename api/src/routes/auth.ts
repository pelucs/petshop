import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function authRoutes(app: FastifyInstance){

  //Registrando um tutor
  app.post("/register", async (request) => {

    const bodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      phone: z.string(),
      address: z.string()
    });

    const { name, email, phone, address } = bodySchema.parse(request.body);

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

    // APLICAR TOKEN JWT
  
    return user;
  });

  //Resgatando todos os tutores
  app.get("/tutors", async () => {

    const tutors = await prisma.user.findMany();
  
    return tutors;
  });

}