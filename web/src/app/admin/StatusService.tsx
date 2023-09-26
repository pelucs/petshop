import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";

interface StatusServiceProps{
  status: string;
}

export function StatusService({ status }: StatusServiceProps){
  return(
    <div>
      {status === "pending" ? (
        <span className="w-fit py-1 px-2 rounded flex items-center gap-1 text-yellow-500 bg-yellow-950">
          <AlertCircle className="w-4 h-4"/>

          Pendente
        </span>
      ) : status === "confirmed" ? (
        <span className="w-fit py-1 px-2 rounded flex items-center gap-1 text-green-500 bg-green-950">
          <CheckCircle2 className="w-4 h-4"/>

          Confirmado
        </span>
      ) : (
        <span className="w-fit py-1 px-2 rounded flex items-center gap-1 text-red-500 bg-red-950">
          <XCircle className="w-4 h-4"/>

          Rejeitado
        </span>
      )}
    </div>
  );
}