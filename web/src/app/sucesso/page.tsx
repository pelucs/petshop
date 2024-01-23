import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

import Link from "next/link";
import Image from "next/image";

import logoBlack from '../../assets/logo-black.png';
import cachorro from '../../assets/cachorro-no-banho.gif';

export default () => {
  return(
    <div className="min-h-screen grid grid-cols-2">
      <div className="p-20 space-y-10">
        <Link href="/">
          <Image src={logoBlack} alt="Logo Woofit" className="w-[130px]"/>
        </Link>

        <div>
          <strong className="text-5xl">
            Agendamento registrado com sucesso!
          </strong>

          <p className="mt-2 text-xl">
            Ao registrar seu agendamento conosco, ele será cuidadosamente revisado pelo 
            {`{petshop}`}. Ele pode ser aceito ou rejeitado com base na disponibilidade.
            <br/>
            <br/>
            Além disso, ao fazer parte de nossa comunidade de clientes frequentes, você 
            terá a chance de ser contemplado com descontos especiais em nossos serviços. 
            Quando atingir um número específico de agendamentos, você poderá aproveitar 
            vantagens exclusivas para tornar suas experiências ainda mais gratificantes.
          </p>
        </div>

        <Button asChild>
          <Link href="/">
            <Home className="w-4 h-4 mr-1"/>

            Ir para o início
          </Link>
        </Button>
      </div>

      <div className="w-fit overflow-hidden">
        <Image src={cachorro} alt="Doguinho tomando banho" className="h-full w-full"/>
      </div>
    </div>
  );
}
