import warrior from "../assets/warrior.jpg";
import arbalist from "../assets/arbalist.jpg";
import { IoLogoDiscord } from "react-icons/io5";
import { Cupom } from "../components/Cupom";
import cupom50 from "../assets/cupom50.jpg";
import cupom100 from "../assets/cupom100.jpg";
import cupom200 from "../assets/cupom200.jpg";
import cupom500 from "../assets/cupom500.jpg";
import cupom1000 from "../assets/cupom1000.jpg";

export const CashTime = () => {

  return (
    <main className="z-10 bg-zinc-800 ">
      <div className="p-20 bg-center bg-no-repeat bg-cover bg-cashtime">
        <h1 className="text-5xl font-black text-center text-white drop-shadow-lg">Cash Time</h1>
        <p className="mt-2 text-center text-white drop-shadow-lg">Fale com um de nossos vendedores e escolha seu pacote</p>
      </div>

      <section className="flex flex-col items-center justify-center px-6 py-20">
        <h2 className="text-2xl font-semibold text-center text-white">
          Confira o discord dos nossos vendedores autorizados:
        </h2>

        <div className="flex flex-col grid-cols-2 gap-10 my-10 md:grid">
          <div className="bg-[#2b2d31] shadow-xl p-6 rounded-sm flex flex-col md:flex-row gap-x-10 items-center">
            <img src={warrior} alt="Icon Discord" width={120} className="rounded-full" />
            <div className="flex flex-col items-center text-white gap-x-3">
              <div className="text-lg font-bold md:flex gap-x-3">
                <h3 className="text-2xl">Nome do vendedor:</h3>
              <p className="text-2xl font-medium">
                Ashura
              </p>
              </div>

              <div className="items-center mt-4 md:flex gap-x-3">
                <p className="flex items-center text-lg gap-x-3"><IoLogoDiscord size={32} className="text-blue-400" /> Adicionar no discord:</p>
                <p className="flex justify-end text-lg md:block"> hexslayer#2752</p>
              </div>
            </div>
          </div>

          <div className="bg-[#2b2d31] shadow-xl p-6 rounded-sm flex flex-col md:flex-row gap-x-10 items-center">
            <img src={arbalist} alt="Icon Discord" width={120} className="rounded-full" />
            <div className="flex flex-col items-center text-white gap-x-3">
              <div className="text-lg font-bold md:flex gap-x-3">
                <h3 className="text-2xl">Nome do vendedor:</h3>
              <p className="text-2xl font-medium">
                Gordo
              </p>
              </div>

              <div className="items-center mt-4 md:flex gap-x-3">
                <p className="flex items-center text-lg gap-x-3"><IoLogoDiscord size={32} className="text-blue-400" /> Adicionar no discord:</p>
                <p className="flex justify-end text-lg md:block"> gordo97</p>
              </div>
            </div>
          </div>
        </div>


        <div className="px-6 mt-4 mb-6">
          <h4 className="text-3xl font-semibold text-center text-white">Confira abaixo a lista de cupons disponíveis:</h4>

          <p className="font-semibold text-center text-green-400">Os valores de cada cupom podem variar, contate o vendedor para mais informações.</p>
        </div>

        <div className="grid items-center justify-center grid-cols-2 col-span-2 px-6 sm:grid-cols-3 md:grid-cols-5 md:px-60 gap-x-5">
          <Cupom 
            cupomImg={cupom50}
          />

          <Cupom 
            cupomImg={cupom100}
          />

          <Cupom 
            cupomImg={cupom200}
          />

          <Cupom 
            cupomImg={cupom500}
          />

          <Cupom 
            cupomImg={cupom1000}
          />
        </div>
      </section>
    </main>
  )
}