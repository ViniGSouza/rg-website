import { Cupom } from "../components/Cupom";
import cupom50 from "../assets/cupom50.jpg";
import cupom100 from "../assets/cupom100.jpg";
import cupom200 from "../assets/cupom200.jpg";
import cupom500 from "../assets/cupom500.jpg";
import cupom1000 from "../assets/cupom1000.jpg";
import { useState } from "react";
import axios from "axios";

export const CashTimeOficial = () => {
  const [cupomPrice, setCupomPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    
    try {
      const url = 'http://localhost:3334/buy-code-mp';
  
      const data = {
        price,
        cupom: cupomPrice,
        email,
      }

      // Realize a solicitação POST com Axios
      const response = await axios.post(url, data);
  
      // Você pode acessar a resposta da API aqui, se necessário
      console.log('Resposta da API:', response.data);
      window.open(response.data.init_point, '_blank');
      setCupomPrice(0);
      setEmail('');
      setPrice(0);
      setNome('');
      
    } catch (error) {
      setError(true);
      console.error('Ocorreu um erro na requisição:', error);
    }
  }
  

  return (
    <main className="z-10 bg-zinc-800 ">
      <div className="p-20 bg-center bg-no-repeat bg-cover bg-cashtime">
        <h1 className="text-5xl font-black text-center text-white drop-shadow-lg">Cash Time</h1>
        <p className="mt-2 text-center text-white drop-shadow-lg">Realize sua recarga escolhendo o valor do seu pacote abaixo</p>
      </div>

      <h3 className="px-48 mt-8 text-2xl font-bold text-white">Confira os cupons disponíveis:</h3>
      <section className="grid items-start grid-cols-3 gap-20 px-48 py-10">
        <div className="grid grid-cols-3 col-span-2 gap-x-5">
          <Cupom
            title="CUPOM $50,00"
            description="Por apenas R$ 47,50"
            cupomImg={cupom50}
            onClick={() => (setCupomPrice(47.50), setPrice(50))}
          />
          <Cupom
            title="CUPOM $100,00"
            description="Por apenas R$ 95,00"
            cupomImg={cupom100}
            onClick={() => (setCupomPrice(95), setPrice(100))}
          />
          <Cupom
            title="CUPOM $200,00"
            description="Por apenas R$ 190,00"
            cupomImg={cupom200}
            onClick={() => (setCupomPrice(190), setPrice(200))}
          />
          <Cupom
            title="CUPOM $500,00"
            description="Por apenas R$ 475,50"
            cupomImg={cupom500}
            onClick={() => (setCupomPrice(475), setPrice(500))}
          />
          <Cupom
            title="CUPOM $1000,00"
            description="Por apenas R$ 945,00"
            cupomImg={cupom1000}
            onClick={() => (setCupomPrice(945), setPrice(1000))}
          />
        </div>

        <div className="items-start px-6 py-8 rounded-2xl drop-shadow-lg bg-zinc-700">
          <h3 className="mb-4 text-2xl font-bold text-white">Detalhes do pedido:</h3>
          <p className="flex justify-between py-3 text-xl font-medium text-white">
            CUPOM:
            <span className="font-black text-green-600">${price}</span>
          </p>
          <p className="flex justify-between py-3 text-xl font-medium text-white">
            Quantidade: 
            <span>1</span>
          </p>
          <p className="flex items-center justify-between py-3 text-xl font-medium text-white">
            Método de pagamento:
            <span>
              <img src="./pix.svg" alt="" />
            </span>
          </p>
          <p className="flex items-center justify-between py-3 text-xl font-medium text-white">
            Valor TOTAL: 
            <span className="text-3xl font-bold text-green-500">R$ {cupomPrice}</span>
          </p>

          <form onSubmit={handleSubmit} className="mt-4">
            <label htmlFor="nameClient" className="text-xl font-bold text-white">
              Nome do Cliente:
            </label>
            <input type="text" name="nameClient" id="nameClient" className="w-full px-6 py-3 my-4 text-white border-2 rounded-md border-zinc-700 bg-zinc-500 placeholder:text-white" placeholder="Digite seu nome completo:"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            />

            <label htmlFor="emailClient" className="text-xl font-bold text-white">
              Email do Cliente:
            </label>
            <input type="text" name="emailClient" id="emailClient" className="w-full px-6 py-3 mt-4 text-white border-2 rounded-md border-zinc-700 bg-zinc-500 placeholder:text-white" placeholder="Digite seu email:"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

          <p className={`${error ? 'block text-red-500' : 'hidden'} mt-5 text-lg font-bold }`}>
            Ocorreu um erro, tente novamente.
          </p>

            <button className="w-full px-6 py-3 mt-4 text-lg font-bold text-white bg-green-600 rounded-md hover:bg-green-700">
              Finalizar compra
            </button>
          </form>

          <p className="mt-5 text-white">
            <span className="font-bold text-red-600">* </span>
            Após o pagamento você receberá um e-mail com as instruções e o código do seu cupom, antes de realizar a compra confira seus dados.
          </p>

        </div>
      </section>

    </main>
  )
}