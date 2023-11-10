/* eslint-disable react/jsx-no-target-blank */
import { BsAndroid2, BsWindows } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";
import { FaAppStoreIos } from "react-icons/fa";
import useLanguageStore from "../store/languageStore";
import { useState } from "react";

export const Resume = () => {
  const [isOpen, setIsOpen] = useState(false);
 const { isPortuguese } = useLanguageStore();

 const toggleDropdown = () => {
  setIsOpen(!isOpen);
};

  return (
    <section className="px-6 py-16 bg-gray-200 border-t-2 border-b-2 border-gray-400 md:px-60">
      <div className="flex flex-col items-start grid-cols-2 gap-y-10 md:grid gap-x-20">
        <div className="flex flex-col gap-y-3">
          <div className="flex items-center gap-x-4">
            <FiDownload size={24} className="text-gray-500"/>
            {isPortuguese ? (
              <h2 className="text-2xl">
                Baixe agora e venha se divertir no <b>MIR4 Rogue</b>
              </h2>
            ) : (
              <h2 className="text-2xl">
                Download now and have fun with <b>MIR4 Rogue</b>
              </h2>
            )}
          </div>

          <div className="flex flex-col items-start text-center text-white gap-y-6">
          <div className="relative z-50 group">
            <button
              onClick={toggleDropdown}
              className="flex items-center px-16 py-3 mt-5 text-2xl font-bold text-white duration-150 ease-in-out bg-red-600 rounded focus:outline-none gap-x-6 hover:bg-red-800"
            >
              <BsWindows size={30} /> DOWNLOAD WINDOWS
            </button>
            {isOpen && (
              <div className="absolute w-48 mt-2 bg-white rounded-lg shadow-lg right-[42%]">
                <ul className="w-[300px] py-2 font-bold bg-red-800 rounded drop-shadow-md">
                  <li>
                    <a href="https://mega.nz/file/o5Rh0RIB#Al8KXJKywstYF3BY5ODjKyB7kEE1PdRrASRmK5JA6oY" className="block px-4 py-2 text-white hover:bg-red-500" target='_blank' rel="noreferrer">
                      MEGA
                    </a>
                  </li>
                  <li>
                    <a href="https://www.mediafire.com/file/957foljwfw0ojpt/Rogue_Market.zip/file" className="block px-4 py-2 text-white hover:bg-red-500" target='_blank' rel="noreferrer">
                      MEDIAFIRE
                    </a>
                  </li>
                  <li>
                    <a href="https://drive.google.com/file/d/1NZBmCPqZA4ZDoAIzzTWUmy_CE6ZroZ-s/view?usp=sharing" target='_blank' rel="noreferrer" className="block px-4 py-2 text-white hover:bg-red-500">
                      GOOGLE DRIVE
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>

            <a href="https://www.mediafire.com/file/erwip2cnfb49shg/RogueMIR_SEA_20231110.apk/file" target="_blank" className="flex items-center px-16 py-3 text-2xl font-bold duration-150 ease-in-out bg-red-600 rounded gap-x-6 hover:bg-red-800"><BsAndroid2 size={30} />DOWNLOAD ANDROID</a>

            <a href="http://tinsy.me/NXsb4r" target="_blank" className="flex items-center px-16 py-3 text-2xl font-bold duration-150 ease-in-out bg-red-600 rounded gap-x-6 hover:bg-red-800">
              <FaAppStoreIos size={30} />DOWNLOAD IOS</a>
          </div>
        </div>

        <div>
          {isPortuguese ? (
            <h3 className="pb-3 my-5 text-2xl font-bold border-b-2 border-gray-300">
            SERVIDOR CONSTANTEMENTE<b className="text-red-600"> ATUALIZADO</b>
            </h3>
            ) : (
            <h3 className="pb-3 my-5 text-2xl font-bold border-b-2 border-gray-300">
            CONSTANTLY UPDATED<b className="text-red-600"> SERVER</b>
            </h3>
          )}
          <iframe className="w-full h-[250px]" src="https://www.youtube.com/embed/9vaEtO3HKTE?si=da0Sx_k0RRBlpoKE" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>


      </div>
    </section>
  )
}