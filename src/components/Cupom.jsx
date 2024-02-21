import useLanguageStore from "../store/languageStore";

export const Cupom = ({ cupomImg, cupomAmount, cupomValue }) => {
  const { isPortuguese } = useLanguageStore();

  return (
      <div className='w-[150px] h-[150px] bg-transparent cursor-pointer group rounded-full overflow-hidden perspective-1000'>
        <div className='relative w-full h-full duration-500 preserve-3d group-hover:rotate-y-180'>
          <div className='absolute w-full h-full overflow-hidden rounded-3xl'>
            <img src={cupomImg} alt='Cupom' className='w-full h-full'/>
          </div>
          <div className='absolute rotate-y-180 w-full h-full bg-[#0F1823] bg-opacity-95 rounded-3xl overflow-hidden text-neutral-300 backface-hidden flex items-center justify-center px-3'>
            <div className="text-center">
              <p className="text-xl font-bold">{isPortuguese ? 'Cash de' : 'CASH'} {cupomAmount}</p>
              <p className="mt-2">{isPortuguese ? 'Valor' : 'Value'} {cupomValue}</p>
            </div>
          </div>
        </div>
      </div>
  )
}