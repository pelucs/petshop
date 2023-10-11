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

      <div className="w-full md:w-fit mt-5 p-1 flex items-center justify-between md:justify-start md:gap-1 rounded border bg-secondary">
        <Link href="/admin" className={clsx("link-menu-admin", {
          "bg-background text-primary": title === "Overview",
          "bg-transparent text-muted-foreground": title !== "Overview"
        })}>
          <BarChart className="w-4 h-4"/>
          
          <span className="text-xs md:text-base">Overview</span>
        </Link>

        <Link href="/admin/hoje" className={clsx("link-menu-admin", {
          "bg-background text-primary": title === "Agendamentos de hoje",
          "bg-transparent text-muted-foreground": title !== "Agendamentos de hoje"
        })}>
          <CalendarClock className="w-4 h-4"/>
          
          <span className="text-xs md:text-base">Hoje</span>
        </Link>

        <Link href="/admin/proximos" className={clsx("link-menu-admin", {
          "bg-background text-primary": title === "Próximos agendamentos",
          "bg-transparent text-muted-foreground": title !== "Próximos agendamentos"
        })}>
          <CalendarDays className="w-4 h-4"/>
          
          <span className="text-xs md:text-base">Próximos</span>
        </Link>

        <Link href="/admin/historico" className={clsx("link-menu-admin", {
          "bg-background text-primary": title === "Histórico",
          "bg-transparent text-muted-foreground": title !== "Histórico"
        })}>
          <History className="w-4 h-4"/>
          
          <span className="text-xs md:text-base">Histórico</span>
        </Link>

        <Link href="/admin/tutores" className={clsx("link-menu-admin", {
          "bg-background text-primary": title === "Tutores",
          "bg-transparent text-muted-foreground": title !== "Tutores"
        })}>
          <User className="w-4 h-4"/>
          
          <span className="text-xs md:text-base">Tutores</span>
        </Link>
      </div>

      <Separator className="mt-5"/>
    </div>
  );
}