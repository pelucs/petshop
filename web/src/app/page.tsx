import Link from "next/link";
import Image from "next/image";

import logo from '../assets/logo.png';
import logoBlack from '../assets/logo-black.png';
import img1 from '../assets/dalmata.jpg';
import img2 from '../assets/feliz.jpg';

import { Button } from "@/components/ui/button";
import { Cookie, 
  Github, 
  Instagram, 
  Linkedin, 
  Mail, 
  Medal, 
  Scissors, 
  ShowerHead, 
  Smartphone, 
  Syringe 
} from "lucide-react";

export default function Home() {
  return (
    <main>
      <div className="w-full h-screen flex flex-col bg-[url(../assets/bg.png)] bg-bottom bg-cover">
        <div className="p-10 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Image src={logo} alt="Logo Woofit" className="w-[130px]"/>

            <nav className="flex items-center gap-10 text-white">
              <Link href="" className="hover:text-zinc-200">Início</Link>
              <Link href="" className="hover:text-zinc-200">Sobre nós</Link>
              <Link href="" className="hover:text-zinc-200">Preços</Link>
            </nav>
          </div>

          <div className="flex items-center gap-10">
            <span className="font-bold flex items-center gap-2 text-secondary">
              <Smartphone className="w-5 h-5"/>

              (83) 90000-0000
            </span>

            <Button asChild variant={"secondary"} className="text-primary">
              <Link href="/agendar" className="gap-1 text-primary">
                <ShowerHead className="w-5 h-5"/>

                Agendar
              </Link>
            </Button>
          </div>
        </div>

        <div className="p-10 h-full flex flex-col justify-center gap-5 text-white">
          <span className="w-fit flex py-2 px-4 items-center gap-1 rounded-full border 
          border-white">
            <Medal className="w-4 h-4"/>
            
            A 3 anos fazendo seu pet feliz!
          </span>

          <strong className="text-6xl">
            Do Cabelo às Patas: <br/> O Paraíso do Seu Pet!
          </strong>

          <p className="w-full max-w-xl">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil labore repellendus temporibus 
            quo esse minima assumenda quod, dolore necessitatibus. Quis ea libero, ab quibusdam reprehenderit.
          </p>

          <div className="flex items-center gap-5">
            <Button 
              asChild 
              className="h-12 text-primary bg-white hover:bg-zinc-200"
            >
              <Link href="/agendar" className="w-full max-w-xs gap-1 text-primary">
                <ShowerHead className="w-5 h-5"/>

                Agendar
              </Link>
            </Button>

            <Button 
              variant={'outline'} 
              className="w-full max-w-xs h-12 hover:bg-transparent text-white hover:text-white"
            >
              <span className="flex items-center justify-center gap-2">
                <Smartphone className="w-5 h-5"/>

                (83) 90000-0000
              </span>
            </Button>
          </div>
        </div>
      </div>

      <div className="relative -top-10 px-10">
        <div className="w-full p-10 grid grid-cols-4 space-x-10 rounded-2xl bg-zinc-100 border">
          <div className="flex flex-col items-start gap-3">
            <div className="w-12 h-12 flex items-center justify-center text-secondary rounded-md bg-primary">
              <ShowerHead className="w-7 h-7"/>
            </div>

            <div>
              <h1 className="text-2xl font-bold">Banho</h1>
              <p className="leading-none text-sm">Lorem ipsum dolor asp maxstell muspi merol</p>
            </div>
          </div>

          <div className="flex flex-col items-start gap-3">
            <div className="w-12 h-12 flex items-center justify-center text-secondary rounded-md bg-primary">
              <Scissors className="w-7 h-7"/>
            </div>

            <div>
              <h1 className="text-2xl font-bold">Tosa</h1>
              <p className="leading-none text-sm">Lorem ipsum dolor asp maxstell muspi merol</p>
            </div>
          </div>

          <div className="flex flex-col items-start gap-3">
            <div className="w-12 h-12 flex items-center justify-center text-secondary rounded-md bg-primary">
              <Syringe className="w-7 h-7"/>
            </div>

            <div>
              <h1 className="text-2xl font-bold">Vacinas</h1>
              <p className="leading-none text-sm">Lorem ipsum dolor asp maxstell muspi merol</p>
            </div>
          </div>

          <div className="flex flex-col items-start gap-3">
            <div className="w-12 h-12 flex items-center justify-center text-secondary rounded-md bg-primary">
              <Cookie className="w-7 h-7"/>
            </div>

            <div>
              <h1 className="text-2xl font-bold">Petiscos</h1>
              <p className="leading-none text-sm">Lorem ipsum dolor asp maxstell muspi merol</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-10 grid grid-cols-2 gap-20">
        <div>
          <h1 className="text-4xl font-bold">Bem-vindo à Família <br/> Woofit!</h1>

          <p className="w-full max-w-lg mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In doloribus cum incidunt excepturi non. 
            Provident laboriosam rerum voluptate. Nesciunt, aspernatur. Deserunt enim earum corrupti velit optio 
            cum quasi numquam fugit
            </p>
        </div>

        <div className="flex items-center justify-center relative">
          <Image src={img1} alt="" className="w-[360px] rounded-md"/>
          <Image src={img2} alt="" className="w-[360px] relative top-20 right-20 rounded-md"/>
        </div>
      </div>

      <div className="w-full py-20 flex flex-col items-center space-y-7">
        <Link href="/">
          <Image src={logoBlack} alt="Logo Woofit" className="w-[130px]"/>
        </Link>

        <nav className="flex items-center gap-4">
          <Link href="/" className="text-xs uppercase text-zinc-500 transition-colors">
            Início
          </Link>

          <Link href="/projetos" className="text-xs uppercase text-zinc-500 transition-colors">
            Projetos
          </Link>

          <Link href="/#sobre" className="text-xs uppercase text-zinc-500 transition-colors">
            Sobre mim
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <a target="_blank" href="https://www.instagram.com/pdlucs/">
            <Instagram className="w-5 h-5"/>
          </a>

          <a target="_blank" href="https://linkedin.com/in/pedro-lucas-5419622a9">
            <Linkedin className="w-5 h-5"/>
          </a>

          <a target="_blank" href="https://github.com/pelucs">
            <Github className="w-5 h-5"/>
          </a>

          <a href="mailto:pedro.lucs0089@gmail.com">
            <Mail className="w-5 h-5"/>
          </a>
        </div>

        <div className="flex flex-col items-center text-zinc-500 text-xs">
          <p>
            &copy;2024 - Todos os direitos reservados
          </p>

          <p className="mt-1">
            Desenvolvido por Pedro Lucas
          </p>
        </div>
      </div>
    </main>
  )
}
