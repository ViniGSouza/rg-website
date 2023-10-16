// eslint-disable-next-line react/prop-types
export const Cupom = ({ cupomImg, onClick }) => {
  return (
    <div className="flex flex-col items-center px-5 py-8 mb-3 text-white cursor-pointer rounded-2xl hover:border-2 gap-y-2 bg-zinc-700 drop-shadow-lg" onClick={onClick}>
      <img src={cupomImg}	 alt="Img Cupom" className="mb-3 rounded-full aspect-square" />
    </div>
  )
}