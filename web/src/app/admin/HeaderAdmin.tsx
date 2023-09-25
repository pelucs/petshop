import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export function HeaderAdmin(){
  return(
    <div className="px-6 py-3 flex justify-between items-center border-b">
      <h1>PetShop</h1>

      <div>
        <Button variant="outline">
          <PlusCircle className="w-4 h-4 mr-2"/>

          Agendar
        </Button>
      </div>
    </div>
  );
}