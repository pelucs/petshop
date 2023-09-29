import { ModeToggle } from "./Theme";

export function HeaderAdmin(){
  return(
    <div className="px-6 py-3 flex justify-between items-center border-b">
      <h1>PetShop</h1>

      <ModeToggle/>
    </div>
  );
}