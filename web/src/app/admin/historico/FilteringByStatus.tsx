'use client'

import { Button } from "@/components/ui/button";
// import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

interface FilteringByStatusProps{
  setFilteringByStatus: (newStatus: { value: string, title: string }[]) => void;
}

export function FilteringByStatus({ setFilteringByStatus }: FilteringByStatusProps){

  const [selected, setSelected] = useState<string>("");

  useEffect(() => { console.log(selected) }, [selected])

  return(
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2">
          <SlidersHorizontal className="w-4 h-4"/>

          Filtrar
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0" align="end">
        {/* <Command>
          <CommandList>
            <CommandGroup heading="Status">
              <CommandItem key="pending" onSelect={() => setSelected("pending")}>
                Pendente
              </CommandItem>

              <CommandItem>
                Concluído
              </CommandItem>

              <CommandItem>
                Confirmado
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command> */}
      </PopoverContent>
    </Popover>
  );
}