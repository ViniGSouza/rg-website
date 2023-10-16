/* eslint-disable react/jsx-no-target-blank */
import { BsAndroid2, BsWindows } from "react-icons/bs"
import { FiDownload } from "react-icons/fi"
import { FaAppStoreIos } from "react-icons/fa"

export const Resume = () => {
  return (
    <section className="px-6 py-16 bg-gray-200 border-t-2 border-b-2 border-gray-400 md:px-60">
      <div className="flex flex-col items-start grid-cols-2 gap-y-10 md:grid gap-x-20">
        <div className="flex flex-col gap-y-3">
          <div className="flex items-center gap-x-4">
            <FiDownload size={24} className="text-gray-500"/>
            <h2 className="text-2xl">Baixe agora e venha se divertir<b> no MIR4 Rogue</b></h2>
          </div>

          <div className="flex flex-col items-start text-center text-white gap-y-6">
            <a href="https://www.mediafire.com/file/2w8pnd4ohtk0ojg/MIR4_Rogue.zip/file" target="_blank" className="flex items-center px-16 py-3 mt-5 text-2xl font-bold duration-150 ease-in-out bg-red-600 rounded gap-x-6 hover:bg-red-800"><BsWindows size={30} /> DOWNLOAD WINDOWS</a>

            <a href="https://www.mediafire.com/file/rmrer5z418w2ul3/RogueMIR_SEA_20231015.apk/file" target="_blank" className="flex items-center px-16 py-3 text-2xl font-bold duration-150 ease-in-out bg-red-600 rounded gap-x-6 hover:bg-red-800"><BsAndroid2 size={30} />DOWNLOAD ANDROID</a>

            <a href="https://ff.nnnzh.com/XSC4" target="_blank" className="flex items-center px-16 py-3 text-2xl font-bold duration-150 ease-in-out bg-red-600 rounded gap-x-6 hover:bg-red-800">
              <FaAppStoreIos size={30} />DOWNLOAD IOS</a>
          </div>
        </div>

        <div>
          <h3 className="pb-3 my-5 text-2xl font-bold border-b-2 border-gray-300">
          SERVIDOR CONSTANTEMENTE<b className="text-red-600"> ATUALIZADO</b>
          </h3>
          <iframe className="w-full h-[250px]" src="https://www.youtube.com/embed/9vaEtO3HKTE?si=da0Sx_k0RRBlpoKE" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>


      </div>
    </section>
  )
}