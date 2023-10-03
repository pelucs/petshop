import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

import Link from "next/link";
import Image from "next/image";

import cachorro from '../../assets/cachorro-no-banho.gif';

export default () => {
  return(
    <div className="py-10 px-5 md:p-16">
      <div className="flex items-center justify-between">
        <h1>PetShop</h1>

        <Button asChild>
          <Link href="/agendar" className="gap-1">
            <User className="w-4 h-4"/>

            Agendar
          </Link>
        </Button>
      </div>

      <div className="mt-14 flex flex-col items-center gap-10">
        <div className="flex items-center flex-col">
          <strong className="text-3xl md:text-4xl text-center">
            Seu agendamento foi <br/> registrado com sucesso
          </strong>

          <p className="mt-5 text-muted-foreground">
            Agradecemos por escolher nossos serviços
          </p>
        </div>

        <Image src={cachorro} alt="cachorro-no-banho" className="w-full max-w-xl rounded-md"/>

        <div className="w-full max-w-xl py-4 px-5 rounded bg-secondary">
          <p className="text-center text-sm">
            Ao registrar seu agendamento conosco, ele será cuidadosamente revisado pelo {`{petshop}`}. Ele pode ser aceito ou rejeitado com base na disponibilidade. Uma vez aceito, seu agendamento será oficialmente registrado em nosso banco de dados.
            <br/>
            <br/>
            Além disso, ao fazer parte de nossa comunidade de clientes frequentes, você terá a chance de ser contemplado com descontos especiais em nossos serviços. Quando atingir um número específico de agendamentos, você poderá aproveitar vantagens exclusivas para tornar suas experiências ainda mais gratificantes.
          </p>
        </div>
      </div>
    </div>
  );
}