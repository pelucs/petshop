import { Separator } from "@/components/ui/separator";
import { BarChart, CalendarClock, CalendarDays } from "lucide-react";
import Link from "next/link";

interface MenuAdminProps{
  title: string;
}

export function MenuAdmin({ title }: MenuAdminProps){
  return(
    <div className="p-6">
      <h1 className="text-3xl font-bold">
        {title}
      </h1>

      <div className="w-fit mt-5 p-1 flex items-center gap-1 rounded border bg-zinc-800">
        <Link href="/" className="link-menu-admin bg-black">
          <BarChart className="w-4 h-4"/>
          
          Overview
        </Link>

        <Link href="/" className="link-menu-admin text-muted-foreground">
          <CalendarClock className="w-4 h-4"/>

          Hoje
        </Link>

        <Link href="/" className="link-menu-admin text-muted-foreground">
          <CalendarDays className="w-4 h-4"/>

          Próximos
        </Link>
      </div>

      <Separator className="mt-5"/>
    </div>
  );
}