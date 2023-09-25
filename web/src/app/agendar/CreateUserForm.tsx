import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MoveRight } from "lucide-react";

export function CreateUserForm(){
  return(
    <form className="space-y-5">
      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name" className="text-sm text-muted-foreground">
            Nome
          </Label>

          <Input
            id="name"
            placeholder="Seu nome"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="contact" className="text-sm text-muted-foreground">
            Contato
          </Label>

          <Input
            id="contact"
            placeholder="Seu contato"
          />
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
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="address" className="text-sm text-muted-foreground">
            Endereço
          </Label>

          <Input
            id="address"
            placeholder="Seu endereço"
          />
        </div>
      </div>

      <Button className="w-full gap-2">
        Continuar

        <MoveRight className="w-4 h-4"/>
      </Button>
    </form>
  );
}