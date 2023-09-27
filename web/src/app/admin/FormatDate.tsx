import ptBR from 'date-fns/locale/pt-BR';
import { format } from "date-fns";

interface FormatDateProps{
  date: string | number;
  dateF: string;
}

export function FormatDate ({ date, dateF }: FormatDateProps){
  return(
    <span>
      {format(new Date(date), dateF, { locale: ptBR })}
    </span>
  );
}