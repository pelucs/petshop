'use client'

import { api } from "@/api/api";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { MenuAdmin } from "../MenuAdmin";
import { FormatDate } from "../FormatDate";
import { TutorsTypes } from "@/utils/tutorTypes";
import { HeaderAdmin } from "../HeaderAdmin";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default () => {

  const [tutors, setTutors] = useState<TutorsTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("/tutors");
      setTutors(response.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  //Melhorar pesquisa
  let filteringTutors = search.length > 0
  ? tutors.filter(tutor => tutor.name.toLowerCase().includes(search) || tutor.email.toLowerCase().includes(search) || tutor.address.toLowerCase().includes(search) || tutor.contact.replace(/[^\w\s]/gi, "").replace(/\s+/g, '_').includes(search))
  : tutors;

  console.log(tutors)

  return(
    <div>
      <HeaderAdmin/>
      <MenuAdmin title="Tutores"/>

      {!loading ? (
        <div className="px-6 pb-6 space-y-5">
          <Input
            className="w-full max-w-md"
            placeholder={`Buscar de ${tutors.length} tutores...`}
            onChange={e => setSearch(e.target.value.toLowerCase())}
          />

          {tutors.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow className="rounded-md">
                  <TableHead>Nome</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Endereço</TableHead>
                  <TableHead>N° de serviços</TableHead>
                  <TableHead>Data de cadastro</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteringTutors.map(tutor => (
                  <TableRow key={tutor.id}>
                    <TableCell>{tutor.name}</TableCell>
                    <TableCell>{tutor.contact}</TableCell>
                    <TableCell>{tutor.email}</TableCell>
                    <TableCell>{tutor.address}</TableCell>
                    <TableCell>{tutor.schedules.length}</TableCell>
                    <TableCell>{<FormatDate date={new Date(tutor.createdAt).getTime()} dateF="dd'/'LL'/'y"/>}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : ( 
            <div className="w-full h-[40vh] flex items-center justify-center border-y">
              <span className="text-sm text-muted-foreground">
                Nenhum tutor cadastrado
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="px-6 pb-6 space-y-5">
          <Skeleton className="w-full max-w-md h-8 rounded-md"/>

          <Skeleton className="w-full h-40 rounded-md"/>
        </div>
      )}
    </div>
  );
}