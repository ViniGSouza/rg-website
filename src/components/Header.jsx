import { BsYoutube, BsDiscord } from 'react-icons/bs';
import { MdDownloadForOffline } from 'react-icons/md';
import close from "../assets/close.svg";
import menu from "../assets/menu.svg";
import logo from "../assets/logo.png";
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  const [toggle, setToggle] = useState(false);

  return (
      <header className="z-10 flex flex-col items-center justify-between w-full px-20 py-4 bg-black md:py-0 md:bg-zinc-800 md:flex-row">
        <Link to="/"> {/* Use o Link para criar links de navegação */}
          <img src={logo} alt="logo" width={130} />
        </Link>
        <nav className="hidden md:flex items-center font-semibold text-white text-[0.9rem] md:gap-x-[2rem] xl:gap-x-[2.5rem] 2xl:gap-x-16">
          <Link to="/" className="duration-150 ease-in-out hover:scale-105">Início</Link>
          <Link to="/register" className="duration-150 ease-in-out hover:scale-105">Registro</Link>
          <Link to="/password" className="duration-150 ease-in-out hover:scale-105">Recuperar senha</Link>
          <Link to="/cashtime" className="relative flex items-center px-3 py-7 duration-150 ease-in-out rounded hover:scale-105 cash-time text-[1rem] font-bold">CASH TIME</Link>
          <Link to="/events" className="duration-150 ease-in-out hover:scale-105">Evento</Link>
          <Link to="/recharge" className="duration-150 ease-in-out hover:scale-105">Resgatar Card</Link>
          <a href="https://www.mediafire.com/file/2w8pnd4ohtk0ojg/MIR4_Rogue.zip/file" target='_blank' rel='noreferrer' className="flex items-center duration-150 ease-in-out hover:scale-105 gap-x-2">Download <MdDownloadForOffline size={18} /></a>
        </nav>


        <div className='flex items-center justify-end flex-1 my-5 lg:hidden'>
          <span className='mr-4 text-lg font-bold text-white'>MENU</span>
            <img src={toggle ? close : menu}
            alt="menu"
            onClick={(e) => {e.preventDefault; setToggle(!toggle)}}
            className={`${toggle && "rotate-90"} w-[22px] h-[22px] object-contain cursor-pointer ease-in-out duration-200 `}
            />
        </div>

        <div className={`${toggle ? "block" : "hidden"} text-lg text-white/90`}>
          <ul className={`${toggle ? "block" : "hidden"} bg-[#121214] lg:hidden px-8 py-6 absolute right-0 top-[10.3rem] w-full rounded-b-[20px] shadow-lg z-50 flex flex-col gap-y-4`}>
          <Link to="/" onClick={(e) => {e.preventDefault; setToggle(!toggle)}} className="duration-150 ease-in-out hover:scale-105" >Início</Link>
          <Link to="/register" onClick={(e) => {e.preventDefault; setToggle(!toggle)}} className="duration-150 ease-in-out hover:scale-105">Registro</Link>
          <Link to="/password" onClick={(e) => {e.preventDefault; setToggle(!toggle)}} className="duration-150 ease-in-out hover:scale-105" >Recuperar senha</Link>
          <Link to="/cashtime" onClick={(e) => {e.preventDefault; setToggle(!toggle)}} className="font-bold duration-150 ease-in-out hover:scale-105">CASH TIME</Link>
          <Link to="/events" onClick={(e) => {e.preventDefault; setToggle(!toggle)}} className="duration-150 ease-in-out hover:scale-105">Evento</Link>
          <Link to="/recharge" onClick={(e) => {e.preventDefault; setToggle(!toggle)}} className="duration-150 ease-in-out hover:scale-105">Resgatar Card</Link>
          <a href="https://www.mediafire.com/file/2w8pnd4ohtk0ojg/MIR4_Rogue.zip/file" target='_blank' rel='noreferrer' className="flex items-center duration-150 ease-in-out hover:scale-105 gap-x-2">Download <MdDownloadForOffline size={18} /></a>
          </ul>
        </div>
        
        <a href="https://discord.gg/D5utwgkXSP" target='_blank' rel='noreferrer' className="flex items-center text-sm font-medium gap-x-4">
          <BsYoutube className="duration-150 text-white/75 hover:text-white" fontSize={24} />
          <BsDiscord className="duration-150 text-white/75 hover:text-white" fontSize={24} />
        </a>  
      </header>

      

  )
}