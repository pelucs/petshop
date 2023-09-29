import { AlertCircle, CheckCircle, CheckCircle2, XCircle } from "lucide-react";

interface StatusServiceProps{
  status: string;
}

export function StatusService({ status }: StatusServiceProps){
  return(
    <div>
      {status === "pending" ? (
        <span className="w-fit py-1 px-2 rounded flex items-center gap-1 text-yellow-500 bg-yellow-100">
          <AlertCircle className="w-4 h-4"/>

          Pendente
        </span>
      ) : status === "confirmed" ? (
        <span className="w-fit py-1 px-2 rounded flex items-center gap-1 text-green-500 bg-green-100">
          <CheckCircle2 className="w-4 h-4"/>

          Confirmado
        </span>
      ) : status === "conclued" ? (
        <span className="w-fit py-1 px-2 rounded flex items-center gap-1 text-green-500 bg-green-100">
          <CheckCircle className="w-4 h-4"/>

          Concluído
        </span>
      ) : status === "lost" ? (
        <span className="w-fit py-1 px-2 rounded flex items-center gap-1 text-red-500 bg-red-100">
          <XCircle className="w-4 h-4"/>

          Perdido
        </span>
      ) : (
        <span className="w-fit py-1 px-2 rounded flex items-center gap-1 text-red-500 bg-red-100">
          <XCircle className="w-4 h-4"/>

          Rejeitado
        </span>
      )}
    </div>
  );
}