import { z } from "zod";

//Schema para agenadar um serviço
export const scheduleSchema = z.object({
  petName: z.string().nonempty("*Este campo é obrigatório"),
  observation: z.string()
});

export type CreateScheduleFormData = z.infer<typeof scheduleSchema>;