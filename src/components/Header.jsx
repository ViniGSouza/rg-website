import { BsYoutube, BsDiscord, BsArrowDownCircle } from 'react-icons/bs';
import { MdDownloadForOffline } from 'react-icons/md';
import close from "../assets/close.svg";
import menu from "../assets/menu.svg";
import logo from "../assets/logo.png";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useLanguageStore from '../store/languageStore';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const { isPortuguese } = useLanguageStore();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
      <header className="z-10 flex flex-col items-center justify-between w-full px-20 py-4 bg-black md:py-0 md:bg-zinc-800 md:flex-row">
        <Link to="/">
          <img src={logo} alt="logo" width={130} />
        </Link>
        <nav className="hidden md:flex items-center font-semibold text-white text-[0.9rem] md:gap-x-[2rem] xl:gap-x-[2.5rem] 2xl:gap-x-16">
          <Link to="/" className="duration-150 ease-in-out hover:scale-105">
            {isPortuguese ? 'Início' : 'Home'}
          </Link>
          <Link to="/register" className="duration-150 ease-in-out hover:scale-105">
            {isPortuguese ? 'Registro' : 'Register'}
          </Link>
          <Link to="/password" className="duration-150 ease-in-out hover:scale-105">
            {isPortuguese ? 'Recuperar senha' : 'Forgot Password'}
          </Link>
          <Link to="/cashtime" className="relative flex items-center px-3 py-7 duration-150 ease-in-out rounded hover:scale-105 cash-time text-[1rem] font-bold">
            CASH TIME
          </Link>
          <Link to="/events" className="duration-150 ease-in-out hover:scale-105">
            {isPortuguese ? 'Evento' : 'Event'}
          </Link>
          <Link to="/recharge" className="duration-150 ease-in-out hover:scale-105">
          {isPortuguese ? 'Resgatar Card' : 'Recharge Card'}
          </Link>
          <div className="relative z-50 group">
            <button
              onClick={toggleDropdown}
              className="text-white focus:outline-none "
            >
              Download <BsArrowDownCircle className='inline-block ml-2' size={16} />
            </button>
            {isOpen && (
              <div className="absolute w-48 mt-2 bg-white rounded-lg shadow-lg -left-1/2">
                <ul className="py-2">
                  <li>
                    <a href="https://mega.nz/file/o5Rh0RIB#Al8KXJKywstYF3BY5ODjKyB7kEE1PdRrASRmK5JA6oY" className="block px-4 py-2 text-gray-800 hover:bg-gray-200" target='_blank' rel="noreferrer">
                      MEGA
                    </a>
                  </li>
                  <li>
                    <a href="https://www.mediafire.com/file/957foljwfw0ojpt/Rogue_Market.zip/file" className="block px-4 py-2 text-gray-800 hover:bg-gray-200" target='_blank' rel="noreferrer">
                      MEDIAFIRE
                    </a>
                  </li>
                  <li>
                    <a href="https://drive.google.com/file/d/1NZBmCPqZA4ZDoAIzzTWUmy_CE6ZroZ-s/view?usp=sharing" target='_blank' rel="noreferrer" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                      GOOGLE DRIVE
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
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
          <a href="https://www.mediafire.com/file/957foljwfw0ojpt/Rogue_Market.zip/file" target='_blank' rel='noreferrer' className="flex items-center duration-150 ease-in-out hover:scale-105 gap-x-2">Download <MdDownloadForOffline size={18} /></a>
          </ul>
        </div>
        
        <a href="https://discord.gg/D5utwgkXSP" target='_blank' rel='noreferrer' className="flex items-center text-sm font-medium gap-x-4">
          <BsYoutube className="duration-150 text-white/75 hover:text-white" fontSize={24} />
          <BsDiscord className="duration-150 text-white/75 hover:text-white" fontSize={24} />
        </a>  
      </header>

      

  )
}