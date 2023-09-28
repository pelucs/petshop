'use client'

import Link from "next/link"
import Image from "next/image";

import { useEffect, useState } from "react";
import { MoveLeft } from "lucide-react";
import { CreateUserForm } from "./CreateUserForm";
import { Separator } from "@/components/ui/separator";
import { CreateScheduleForm } from "./CreateScheduleForm";
import { Skeleton } from "@/components/ui/skeleton";

import bg from '../../assets/bg.jpeg';

export default () => {

  const [loading, setLoading] = useState<boolean>(true);
  const [isAuth, setIsAuth] = useState<string>("");

  useEffect(() => {
    const user = localStorage.getItem("user");
          
    if(user){
      setIsAuth(user);
    }
    
    setLoading(false);
  }, []);

  return(
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      {/* LEFT */}
      {!loading ? (
        <div className="py-10 px-5 md:p-20 overflow-y-auto">
          <Link href="/" className="flex items-center gap-2">
            <MoveLeft className="w-4 h-4"/>

            Voltar
          </Link>

          {!isAuth ? (
            <div className="mt-10">
              <div>
                <h1 className="text-2xl font-semibold">Registrar</h1>
                <p className="text-sm text-muted-foreground">
                  Você estará se cadastrando como tutor do seu pet (este processo será apenas uma vez)
                </p>
              </div>

              <div className="mt-5 space-y-5">
                <CreateUserForm/>

                <Separator/>

                <div className="flex justify-center">
                  <p className="text-center text-sm text-muted-foreground">
                    Ao clicar em continuar, você concorda com nossos <br/>

                    <Link href="/" className="underline">Termos de serviços</Link> e <Link href="/" className="underline">Políticas de privacidade</Link>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-10">
              <div className="space-y-5">
                <CreateScheduleForm code={isAuth}/>

                <Separator/>

                <p className="text-center text-sm text-muted-foreground">
                  Ao agendar o serviço aguarde o contato do petshop confirmando seu agendamento
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="py-10 px-5 md:p-20">
          <Skeleton className="w-40 h-5 rounded-md"/>
          <Skeleton className="w-full h-20 mt-10 rounded-md"/>
        </div>
      )}

      {/* RIGHT */}
      <div className="sticky top-0 border-l bg-primary/5"/>
    </div>
  );
}