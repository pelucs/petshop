import logo from '../../assets/logo-black.png'
import Image from "next/image";

import { ModeToggle } from "./Theme";

export function HeaderAdmin(){
  return(
    <div className="px-6 py-3 flex justify-between items-center border-b">
      <Image src={logo} alt="Logo Woolfit" className="w-[150px]"/>

      <ModeToggle/>
    </div>
  );
}