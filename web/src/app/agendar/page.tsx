'use client'

import Link from "next/link"

import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { CreateUserForm } from "./CreateUserForm";
import { CreateScheduleForm } from "./CreateScheduleForm";
import { useEffect, useState } from "react";

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

  const signIn = () => {
    localStorage.removeItem("user");
    window.location.reload();
  }

  return(
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      {/* LEFT */}
      {!loading ? (
        <div className="py-10 px-5 md:p-20 overflow-y-auto">
          {isAuth && (
            <Button onClick={signIn} className="flex items-center gap-1">
              <User className="w-4 h-4"/>

              Login/Registrar
            </Button>
          )}

          {!isAuth ? (
            <div className="mt-10">
              <div>
                <h1 className="text-2xl font-semibold">Preencha seus dados</h1>
                <p className="text-sm text-muted-foreground">
                  Você estará se cadastrando como o tutor do seu pet
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
      <div className="sticky top-0 border-l"/>
    </div>
  );
}