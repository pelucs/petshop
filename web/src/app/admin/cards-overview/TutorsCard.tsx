'use client'

import { api } from "@/api/api";
import { Skeleton } from "@/components/ui/skeleton";
import { ScheduleTypes } from "@/utils/schedulesType";
import { User } from "lucide-react";
import { useEffect, useState } from "react";

export function TutorsCard(){

  const [tutors, setTutors] = useState<ScheduleTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const response = await api.get("/tutors");
      setTutors(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => { fetchData(); }, []);

  return(
    <div>
      {!loading ? (
        <div className="py-4 px-5 flex flex-col gap-5 border rounded-md">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold">
              Tutores registrados
            </h1>
    
            <User className="w-4 h-4"/>
          </div>
    
          <div className="flex flex-col">
            <strong className="text-4xl">
              {tutors.length}
            </strong>
    
            <span className="text-muted-foreground text-sm">
              tutores
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