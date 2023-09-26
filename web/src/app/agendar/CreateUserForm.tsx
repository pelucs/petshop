'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MoveRight } from "lucide-react";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "@/api/api";
import { z } from "zod";

//Schema para registrar um tutor
const userSchema = z.object({
  name: z.string().nonempty("*Este campo é obrigatório"),
  email: z.string().nonempty("*Este campo é obrigadtório").email(),
  contact: z.string().nonempty("*Este campo é obrigatório"),
  address: z.string().nonempty("*Este campo é obrigatório"),
});

type CreateUserFormData = z.infer<typeof userSchema>;

export function CreateUserForm(){

  const { register, handleSubmit, formState: { errors } } = useForm<CreateUserFormData>({
    resolver: zodResolver(userSchema)
  });

  const signUp = async (data: CreateUserFormData) => {
    await api.post("/register", {
      name: data.name,
      email: data.email,
      contact: data.contact,
      address: data.address,
    })
    .then(res => {
      localStorage.setItem("user", res.data);
      window.location.reload();
    });
  }

  return(
    <form onSubmit={handleSubmit(signUp)} className="space-y-5">
      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name" className="text-sm text-muted-foreground">
            Nome
          </Label>

          <Input
            id="name"
            placeholder="Seu nome"
            {...register("name")}
          />

          {errors.name && (
            <span className="text-xs text-red-500">{errors.name.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="contact" className="text-sm text-muted-foreground">
            Contato
          </Label>

          <Input
            id="contact"
            placeholder="Seu contato"
            {...register("contact")}
          />

          {errors.contact && (
            <span className="text-xs text-red-500">{errors.contact.message}</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="text-sm text-muted-foreground">
            Email
          </Label>

          <Input
            id="email"
            placeholder="Seu email"
            {...register("email")}
          />

          {errors.email && (
            <span className="text-xs text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="address" className="text-sm text-muted-foreground">
            Endereço
          </Label>

          <Input
            id="address"
            placeholder="Seu endereço"
            {...register("address")}
          />

          {errors.address && (
            <span className="text-xs text-red-500">{errors.address.message}</span>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full gap-2">
        Continuar

        <MoveRight className="w-4 h-4"/>
      </Button>
    </form>
  );
}