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

      <div className="w-fit mt-5 p-1 flex items-center gap-1 rounded border bg-secondary">
        <Link href="/admin" className={clsx("link-menu-admin", {
          "bg-background text-foreground": title === "Overview",
          "bg-transparent text-muted-foreground": title !== "Overview"
        })}>
          <BarChart className="w-4 h-4"/>
          
          Overview
        </Link>

        <Link href="/admin/hoje" className={clsx("link-menu-admin", {
          "bg-background text-foreground": title === "Agendamentos de hoje",
          "bg-transparent text-muted-foreground": title !== "Agendamentos de hoje"
        })}>
          <CalendarClock className="w-4 h-4"/>
          
          Hoje
        </Link>

        <Link href="/admin/proximos" className={clsx("link-menu-admin", {
          "bg-background text-foreground": title === "Próximos agendamentos",
          "bg-transparent text-muted-foreground": title !== "Próximos agendamentos"
        })}>
          <CalendarDays className="w-4 h-4"/>
          
          Próximos
        </Link>

        <Link href="/admin/historico" className={clsx("link-menu-admin", {
          "bg-background text-foreground": title === "Histórico",
          "bg-transparent text-muted-foreground": title !== "Histórico"
        })}>
          <History className="w-4 h-4"/>
          
          Histórico
        </Link>

        <Link href="/admin/tutores" className={clsx("link-menu-admin", {
          "bg-background text-foreground": title === "Tutores",
          "bg-transparent text-muted-foreground": title !== "Tutores"
        })}>
          <User className="w-4 h-4"/>
          
          Tutores
        </Link>
      </div>

      <Separator className="mt-5"/>
    </div>
  );
}