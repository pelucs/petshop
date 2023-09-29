import { Button } from "@/components/ui/button";
import { Cookie, Scissors, ShowerHead, Smartphone, Syringe } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="w-full h-screen flex flex-col bg-[url(../assets/bg-home.jpg)] bg-center bg-cover">
        <div className="p-10 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <h1 className="text-2xl font-bold">PetShop</h1>

            <nav className="flex items-center gap-10">
              <Link href="" className="hover:text-primary">Início</Link>
              <Link href="" className="hover:text-primary">Sobre nós</Link>
              <Link href="" className="hover:text-primary">Preços</Link>
            </nav>
          </div>

          <div className="flex items-center gap-10">
            <span className="font-bold flex items-center gap-2 text-secondary">
              <Smartphone className="w-5 h-5"/>

              (83) 90000-0000
            </span>

            <Button asChild variant={"secondary"}>
              <Link href="/agendar" className="gap-1 text-primary">
                <ShowerHead className="w-5 h-5"/>

                Agendar
              </Link>
            </Button>
          </div>
        </div>

        <div className="p-10 h-full flex flex-col justify-center gap-4">
          <span className="w-fit rounded-full py-2 px-4 bg-primary text-secondary">
            A 3 anos fazendo seu pet feliz
          </span>

          <strong className="text-6xl">
            Do Cabelo às Patas: <br/> O Paraíso do Seu Pet!
          </strong>

          <p className="w-full max-w-xl">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil labore repellendus temporibus 
            quo esse minima assumenda quod, dolore necessitatibus. Quis ea libero, ab quibusdam reprehenderit.
          </p>

          <div className="flex items-center gap-5">
            <Button asChild>
              <Link href="/agendar" className="w-full max-w-xs gap-1 text-primary">
                <ShowerHead className="w-5 h-5"/>

                Agendar
              </Link>
            </Button>

            <Button asChild variant={'outline'}>
              <span className="w-full max-w-xs gap-1 text-primary">
                <Smartphone className="w-5 h-5"/>

                (83) 90000-0000
              </span>
            </Button>
          </div>
        </div>
      </div>

      <div className="relative -top-10 px-10">
        <div className="w-full h-40 p-10 grid grid-cols-4 gap-10 rounded-2xl bg-secondary">
          <div className="flex items-start gap-3">
            <div className="w-14 h-14 flex items-center justify-center text-secondary rounded-md bg-primary">
              <ShowerHead className="w-6 h-6"/>
            </div>

            <div>
              <h1 className="text-2xl font-bold">Banho</h1>
              <p>Lorem ipsum dolor asp maxstell muspi merol</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-14 h-14 flex items-center justify-center text-secondary rounded-md bg-primary">
              <Scissors className="w-6 h-6"/>
            </div>

            <div>
              <h1 className="text-2xl font-bold">Tosa</h1>
              <p>Lorem ipsum dolor asp maxstell muspi merol</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-14 h-14 flex items-center justify-center text-secondary rounded-md bg-primary">
              <Syringe className="w-6 h-6"/>
            </div>

            <div>
              <h1 className="text-2xl font-bold">Vacinas</h1>
              <p>Lorem ipsum dolor asp maxstell muspi merol</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-14 h-14 flex items-center justify-center text-secondary rounded-md bg-primary">
              <Cookie className="w-6 h-6"/>
            </div>

            <div>
              <h1 className="text-2xl font-bold">Petiscos</h1>
              <p>Lorem ipsum dolor asp maxstell muspi merol</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
