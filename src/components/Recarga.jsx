import { useNavigate } from "react-router-dom";
import warrior from "../assets/warrior.png";

export const Recarga = () => {
  const navigation = useNavigate();

  const handleClick = () => {
    navigation('/cashtime');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <section className="px-6 bg-no-repeat bg-cover md:bg-center md:px-60 bg-recarga">
      <div className="flex flex-col items-center grid-cols-2 gap-40 gap-y-10 md:grid">

        <div className="text-white py-14">
          <h2 className="text-6xl font-black">Deseja realizar uma recarga?</h2>
          <p className="my-12 text-2xl max-w-[450px] ">
            Dê um boost no seu personagem, confira já nossa aba de <span className="font-extrabold">CashTime</span>
          </p>
          <button onClick={handleClick} className="inline-block px-10 py-3 text-xl italic font-semibold duration-150 ease-in-out rounded bg-gradient-to-l from-red-800 to-red-600 hover:scale-95">Fazer Recarga</button>
        </div>

        <div className="self-end">
          <img src={warrior} alt="" />
        </div>
      </div>
    </section>
  )
}