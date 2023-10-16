export const Error = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-fixed bg-center bg-cover">
      <div className="absolute inset-0 bg-black opacity-80"></div>
        <div className="z-10 text-center">
          <h1 className="font-bold text-white text-7xl">Error - 404</h1>
          <h2 className="mt-8 text-5xl font-semibold text-center text-white">Página não encontrada</h2>
          <p className="mt-5 font-medium text-red-600">A página que você acessou não existe, tente navegar pelo nosso menu ou entre em contato conosco via discord caso não ache a página que procura.
          </p>
        </div>
    </div>
  )
}