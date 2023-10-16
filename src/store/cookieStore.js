import { create } from 'zustand';

const useCookieStore = create((set) => ({
  cookieName: 's',
  cookieValue: '',
  generateCookie: () => {
    const existingValue = document.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith('s='));

    if (!existingValue) {
      // Gerar um valor aleatório de 26 dígitos para o cookie 's'
      const randomValue = generateRandomValue(26);
      // Definir o cookie 's' com expiração de 20 minutos
      document.cookie = `s=${randomValue}; expires=${new Date(
        Date.now() + 20 * 60 * 1000
      ).toUTCString()}; path=/`;
      set({ cookieValue: randomValue });
      // Recarrega a página após a função generateCookie ser executada
      window.location.reload();
    } else {
      const cookieValue = existingValue.split('=')[1];
      set({ cookieValue });
    }
  },
}));

// Função para gerar um valor aleatório de 'n' dígitos
function generateRandomValue(n) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomValue = '';
  for (let i = 0; i < n; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomValue += characters.charAt(randomIndex);
  }
  return randomValue;
}

export default useCookieStore;
