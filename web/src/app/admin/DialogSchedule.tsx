import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, CheckCircle2, Clock, Trash, Trash2, XCircle } from 'lucide-react';

interface TypeButtonTrigger{
  type: string;
}

export function DialogSchedule({ type }: TypeButtonTrigger){
  return(
    <Dialog>
      {type === "aside" ? (
        <DialogTrigger className="flex-1 py-3 flex items-center justify-between hover:px-4 hover:bg-secondary transition-all rounded-md">
          <div>
            <h1>
              Banho e tosa
            </h1>

            <span className="flex items-center gap-1 text-muted-foreground text-sm">
              <Clock className="w-4 h-4"/>

              às 08h30
            </span>
          </div>

          <span className="py-1 px-2 rounded flex items-center gap-1 text-yellow-500 bg-yellow-950">
            <AlertCircle className="w-4 h-4"/>

            Pendente
          </span>
        </DialogTrigger>
      ) : (
        <DialogTrigger className="w-full py-2 px-2 flex flex-col items-start gap-2 border-l-4 border-yellow-500 
        rounded-tr rounded-br hover:bg-secondary transition-all">
          <span className="w-fit py-1 px-2 rounded flex items-center gap-1 text-yellow-500 bg-yellow-950">
            <AlertCircle className="w-4 h-4"/>

            Pendente
          </span>

          <h1 className="text-lg font-semibold leading-none">
            Banho e tosa
          </h1>

          <h1 className="text-sm text-muted-foreground">
            Maria Zaya
          </h1>

          <h1 className="text-sm text-muted-foreground">
            83 98729-6826
          </h1>
        </DialogTrigger>
      )}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Banho e tosa
          </DialogTitle>

          <DialogDescription className="flex items-center gap-1">
            <Clock className="w-4 h-4"/>
            
            quarta-feira, 22 de out - às 08h30
          </DialogDescription>
        </DialogHeader>

        <Separator/>

        <div className="space-y-5">
          <div>
            <span className="text-sm text-muted-foreground">Status</span>

            <span className="w-fit mt-2 py-1 px-2 rounded flex items-center gap-1 text-yellow-500 bg-yellow-950">
              <AlertCircle className="w-4 h-4"/>

              Pendente
            </span>
          </div>

          <div className="grid grid-cols-3 gap-5">
            <div>
              <span className="text-sm text-muted-foreground">Pet</span>
              <h1>Maria Zaya</h1>
            </div>

            <div>
              <span className="text-sm text-muted-foreground">Tutor</span>
              <h1>Pedro Lucas</h1>
            </div>

            <div>
              <span className="text-sm text-muted-foreground">Contato</span>
              <h1>83 98729-6826</h1>
            </div>
          </div>

          <div>
            <span className="text-sm text-muted-foreground">Observação</span>
            <h1>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi unde omnis beatae tempore culpa illum 
              dolorem commodi sit, eos reprehenderit. Soluta recusandae quidem repellat odit quis saepe sint sunt 
              facere.
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-1 grid grid-cols-2 gap-2">
              <Button className="text-base bg-green-500 text-primary">
                <CheckCircle2 className="w-4 h-4 mr-2"/>

                Confirmar
              </Button>

              <Button variant="destructive" className="text-base">
                <XCircle className="w-4 h-4 mr-2"/>

                Rejeitar
              </Button>
            </div>

            <Button title="Excluir" variant="destructive">
              <Trash2 className="w-5 h-5"/>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}