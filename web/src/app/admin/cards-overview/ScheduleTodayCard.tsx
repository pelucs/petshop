import { Skeleton } from "@/components/ui/skeleton";
import { ScheduleTypes } from "@/utils/schedulesType";
import { CalendarClock } from "lucide-react";

interface ScheduleTodayCardProps{
  schedules: ScheduleTypes[]
  loading: boolean;
}

export function ScheduleTodayCard({ schedules, loading }: ScheduleTodayCardProps){

  return(
    <div>
      {!loading ? (
        <div className="py-4 px-5 flex flex-col gap-5 border rounded-md">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold">
              Agendamentos de hoje
            </h1>
    
            <CalendarClock className="w-4 h-4"/>
          </div>
    
          <div className="flex flex-col">
            <strong className="text-4xl">
              {schedules.length}
            </strong>
    
            <span className="text-muted-foreground text-sm">
              agendamento(s)
            </span>
          </div>
        </div>
      ) : (
        <div>
          <Skeleton className="w-full h-[140px] rounded-md"/>
        </div>
      )}
    </div>
  );
}