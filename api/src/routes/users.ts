import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function tutorsRoutes(app: FastifyInstance){

  //Resgatando todos os tutores
  app.get("/tutors", async () => {

    const tutors = await prisma.user.findMany();
  
    return tutors;
  });

  //Registrando um tutor
  app.post("/tutors", async (req) => {

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
      console.log("Não existe!")

      await prisma.user.create({
        data: {
          name,
          email,
          phone,
          address,
        }
      });
    } else{
      console.log("Existe!")
    }

    // APLICAR TOKEN JWT
  
    return user;
  });
}