import useLanguageStore from "../store/languageStore";

export const Footer = () => {
  const { isPortuguese } = useLanguageStore();

  return (
    <footer className="flex items-center justify-center w-full px-6 py-6 bg-zinc-900 md:px-60">
      <p className="font-semibold text-white">
        {isPortuguese ? 'MIR4 Rogue © 2023 - Todos os direitos reservados' : 'MIR4 Rogue © 2023 - All rights reserved'}
      </p>
    </footer>
  )
}