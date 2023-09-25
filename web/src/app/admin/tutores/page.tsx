import { Input } from "@/components/ui/input";
import { HeaderAdmin } from "../HeaderAdmin";
import { MenuAdmin } from "../MenuAdmin";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const invoices = [
  {
    invoice: "Pedro Lucas",
    paymentStatus: "83 98729-6826",
    totalAmount: "22/09/2023",
    paymentMethod: "12",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

export default () => {
  return(
    <div>
      <HeaderAdmin/>
      <MenuAdmin title="Tutores"/>

      <div className="px-6 pb-6 space-y-5">
        <Input
          placeholder="Buscar de 45 tutores..."
          className="w-full max-w-md"
        />

        {/* <div className="w-full h-[40vh] flex items-center justify-center border-y">
          <span className="text-sm text-muted-foreground">
            Nenhum tutor cadastrado
          </span>
        </div> */}

        <Table>
          <TableHeader>
            <TableRow className="rounded-md">
              <TableHead>Nome</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead>Endereço</TableHead>
              <TableHead>N° de serviços</TableHead>
              <TableHead>Data de cadastro</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {invoices.map(invoice => (
              <TableRow key={invoice.invoice}>
                <TableCell>{invoice.invoice}</TableCell>
                <TableCell>{invoice.paymentStatus}</TableCell>
                <TableCell>R. Doutor Paulo Roberto Mayer 556</TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell>{invoice.totalAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}