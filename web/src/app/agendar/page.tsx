'use client'

import Link from "next/link"
import Image from "next/image";

import { useEffect, useState } from "react";
import { MoveLeft } from "lucide-react";
import { CreateUserForm } from "./CreateUserForm";
import { Separator } from "@/components/ui/separator";
import { CreateScheduleForm } from "./CreateScheduleForm";

import bg from '../../assets/bg.jpg';
import { Skeleton } from "@/components/ui/skeleton";

export default () => {

  const [loading, setLoading] = useState<boolean>(true);
  const [tutor, setTutor] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {

    const isAuth = localStorage.getItem("user"),
          userF = isAuth && JSON.parse(isAuth);

          
    if(userF){
      setTutor(userF.name.split(' ')[0]);
    }
    
    setIsAuthenticated(isAuth ? true : false);
    setLoading(false);
  }, []);

  // if(isAuthenticated){
  //   const currentUser = localStorage.getItem("user"),
  //         userF = currentUser && JSON.parse(currentUser);

  //   if(userF){
  //     const nameF = userF.name.split('')[0];

  //     setTutor(nameF);
  //   }
  // // }

  return(
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      {/* LEFT */}
      {!loading ? (
        <div className="py-10 px-5 md:p-20 overflow-y-auto">
          <Link href="/" className="flex items-center gap-2">
            <MoveLeft className="w-4 h-4"/>

            Voltar
          </Link>

          {!isAuthenticated ? (
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
              <div>
                <h1 className="text-2xl font-semibold">Olá, {tutor}</h1>
                <p className="text-sm text-muted-foreground">
                  Preencha os campos corretamente
                </p>
              </div>

              <div className="mt-5 space-y-5">
                <CreateScheduleForm/>

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
      <div className="sticky top-0 bg-primary/5 border-l overflow-hidden">
        {/* <Image src={bg} alt="Cachorro sorrindo" className="h-full"/> */}
      </div>
    </div>
  );
}