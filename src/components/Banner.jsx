import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, Pagination } from 'swiper/modules';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

export const Banner = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  return (
    <main className="translate-y-8 opacity-0 animate-enter">
    <Swiper
      pagination={{
        dynamicBullets: true,
      }}
      modules={[Autoplay, Pagination]}
      loop
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      onAutoplayTimeLeft={onAutoplayTimeLeft}
      className="w-full h-[91vh] mySwiper"
    >
      <SwiperSlide className="relative bg-right bg-no-repeat bg-cover md:bg-center bg-banner-two">
        <div className="absolute px-6 -translate-y-1/2 md:px-36 top-1/2">
          <h1 className="text-6xl font-bold text-white drop-shadow">Bem vindo ao Rogue MIR4</h1>
          <p className="mt-5 mb-8 text-xl text-white font-sm max-w-[600px] drop-shadow">
            Temos mais de um servidor, você pode desfrutar de servidores de mudança de guerra, lutando em torres de dragões e cercos de castelos! Torne-se o mais forte do seu servidor!
          </p>
          <Link to="/register" className="px-6 py-3 font-bold text-white duration-150 ease-in-out bg-red-600 rounded-md gap-x-2 hover:bg-red-800">
            Registre-se já
          </Link>
        </div>
      </SwiperSlide>
      <SwiperSlide className="relative bg-no-repeat bg-cover bg-banner-one">
        <div className="absolute px-6 -translate-y-1/2 md:px-36 top-1/2">
        <h1 className="text-6xl font-bold text-white drop-shadow">Mercado Unificado</h1>
          <p className="mt-5 mb-8 text-xl text-white font-sm max-w-[600px] drop-shadow">
            A Era da Grande Unificação. Um enorme mercado único e orgânico.
          </p>
          <Link to="/register" className="px-6 py-3 font-bold text-white duration-150 ease-in-out bg-red-600 rounded-md gap-x-2 hover:bg-red-800">
            Junte-se ao MIR4 Rogue
          </Link>
        </div>
      </SwiperSlide>
      <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
    </Swiper>
  </main>
  )
}