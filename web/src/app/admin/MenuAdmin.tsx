import clsx from "clsx";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { BarChart, CalendarClock, CalendarDays, History, User } from "lucide-react";

interface MenuAdminProps{
  title: string;
}

export function MenuAdmin({ title }: MenuAdminProps){
  return(
    <div className="p-6">
      <h1 className="text-3xl font-bold">
        {title}
      </h1>

      <div className="w-full md:w-fit mt-5 p-1 flex items-center justify-between md:justify-start gap-1 rounded border bg-secondary">
        <Link href="/admin" className={clsx("link-menu-admin", {
          "bg-background text-foreground": title === "Overview",
          "bg-transparent text-muted-foreground": title !== "Overview"
        })}>
          <BarChart className="w-5 h-5 md:w-4 md:h-4"/>
          
          <span className="hidden md:block">Overview</span>
        </Link>

        <Link href="/admin/hoje" className={clsx("link-menu-admin", {
          "bg-background text-foreground": title === "Agendamentos de hoje",
          "bg-transparent text-muted-foreground": title !== "Agendamentos de hoje"
        })}>
          <CalendarClock className="w-5 h-5 md:w-4 md:h-4"/>
          
          <span className="hidden md:block">Hoje</span>
        </Link>

        <Link href="/admin/proximos" className={clsx("link-menu-admin", {
          "bg-background text-foreground": title === "Próximos agendamentos",
          "bg-transparent text-muted-foreground": title !== "Próximos agendamentos"
        })}>
          <CalendarDays className="w-5 h-5 md:-4 hmd:-4"/>
          
          <span className="hidden md:block">Próximos</span>
        </Link>

        <Link href="/admin/historico" className={clsx("link-menu-admin", {
          "bg-background text-foreground": title === "Histórico",
          "bg-transparent text-muted-foreground": title !== "Histórico"
        })}>
          <History className="w-5 h-5 md:w-4 md:h-4"/>
          
          <span className="hidden md:block">Histórico</span>
        </Link>

        <Link href="/admin/tutores" className={clsx("link-menu-admin", {
          "bg-background text-foreground": title === "Tutores",
          "bg-transparent text-muted-foreground": title !== "Tutores"
        })}>
          <User className="md:w-4 w-5 h-5 md:h-4"/>
          
          <span className="hidden md:block">Tutores</span>
        </Link>
      </div>

      <Separator className="mt-5"/>
    </div>
  );
}