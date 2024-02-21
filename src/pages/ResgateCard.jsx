import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useLanguageStore from '../store/languageStore';

export default function ResgateCard() {
  const [account, setAccount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardPassword, setCardPassword] = useState('');
  const [code, setCode] = useState('');
  const [imageSrc, setImageSrc] = useState(null);
  const [mensagemError, setMensagemError] = useState(null);

  const { isPortuguese } = useLanguageStore();

  const session = Cookies.get('s');
 
  const gerarCaptcha = async () => {
    if (session) {
      try {
        const data = {
          session
        };
  
        const response = await axios.post(
          'https://api.mir4-rogue.com/captcha',
          data,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
  
        if (response.status === 200) {
          const data = response.data;
          const imgData = data.image;
          setImageSrc(`data:image/png;base64,${imgData}`);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        account,
        cardKey: cardNumber,
        cardPwd: cardPassword,
        session,
        vcode: code,
      };

      const response = await axios.post(
        'https://api.mir4-rogue.com/recharge',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      switch(response.data) {
        case "\r\n\r\nAccount does not exist":
          setMensagemError(isPortuguese ? 'Conta não existe.' : 'Account does not exist.');
          break;
        case "\r\n\r\ncard has used":
          setMensagemError(isPortuguese ? 'Cartão já foi utilizado.' : 'The card has been used.');
          break;
        case "\r\n\r\ncard does not exist":
          setMensagemError(isPortuguese ? 'Cartão não existe.' : 'The card does not exist.');
          break;
        case "\r\n\r\nThe verification code is incorrectly entered":
          setMensagemError(isPortuguese ? 'Código de segurança incorreto.' : 'The verification code is incorrectly entered.');
          gerarImagemCaptcha();
          break;
        case "\r\n\r\nThe verification code cannot be empty":
          setMensagemError(isPortuguese ? 'Código de segurança não pode ser vazio.' : 'The verification code cannot be empty.');
          gerarImagemCaptcha();
          break;
        case "\r\n\r\ncard number/password is incorrect":
          setMensagemError(isPortuguese ? 'Número e/ou senha do cartão incorreto.' : 'The card number/password is incorrect.');
          gerarImagemCaptcha();
          break;
        case "参数错误":
        setMensagemError(isPortuguese ? 'Preencha todos os campos corretamente.' : 'Fill in all the fields correctly.');
        gerarImagemCaptcha();
        break;
        default:
          isPortuguese ?
          Swal.fire('Sucesso', 'Recarga efetuada com sucesso', 'success') : Swal.fire('Success', 'Recharge successful', 'success');
          setAccount('');
          setCardNumber('');
          setCardPassword('');
          setCode('');
          setMensagemError('');
          gerarCaptcha();
          break;
      }
    } catch (error) {
      console.error('Error:', error);
    }  
  }

  useEffect(() => {
    gerarCaptcha();
  }, []);


  return (
    <main className="relative w-full h-[100vh] bg-fixed bg-center bg-no-repeat bg-cover">
      <div className="absolute inset-0 bg-black opacity-80"></div>
      <form className="absolute -translate-x-1/2 -translate-y-1/2 rounded p top-1/2 left-1/2 md:w-[30rem]" onSubmit={handleSubmit} >
        <h1 className="mb-6 text-4xl font-bold text-white">
          {isPortuguese ? 'Resgate seu cartão' : 'Recharge your card'}
        </h1>
        <div className="flex flex-col mb-4 gap-y-3">
          <label htmlFor="account" className="text-lg font-bold text-white">
            Login:
          </label>
          <input
            type="text"
            className="p-2 rounded"
            name="account"
            placeholder={isPortuguese ? 'Digite seu login' : 'Enter your login'}
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />
        </div>

        <div className="flex flex-col mb-4 gap-y-3">
          <label htmlFor="cardnumber" className="text-lg font-bold text-white">
            {isPortuguese ? 'Número do Cartão:' : 'Card number:'}
          </label>
          <input
            type="text"
            className="p-2 rounded"
            name="cardnumber"
            placeholder={isPortuguese ? 'Digite o número do cartão' : 'Enter the card number'}
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </div>

        <div className="flex flex-col mb-4 gap-y-3">
          <label htmlFor="cardpassword" className="text-lg font-bold text-white">
            {isPortuguese ? 'Senha do Cartão:' : 'Card password:'}
          </label>
          <input
            type="text"
            className="p-2 rounded"
            name="cardpassword"
            placeholder={isPortuguese ? 'Digite a senha do cartão' : 'Enter the card password'}
            value={cardPassword}
            onChange={(e) => setCardPassword(e.target.value)}
          />
        </div>
        
        <div className="flex flex-col mb-4 gap-y-3">
          <label htmlFor="code" className="text-lg font-bold text-white">
            {isPortuguese ? 'Código de segurança:' : 'Verification code:'}
          </label>
          <div className="grid grid-cols-5 gap-x-3">
            <input
            type="text"
            className="col-span-3 p-2 rounded"
            name="code"
            placeholder={isPortuguese ? 'Digite o código de segurança' : 'Enter the verification code'}
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          
          { imageSrc && 
            <img src={imageSrc} alt="Imagem Captcha" onClick={gerarCaptcha} className="h-full col-span-2 cursor-pointer" 
          />}

          </div>
        </div>

        <button className="px-10 py-3 mt-4 font-bold text-white duration-150 ease-in-out bg-red-600 rounded hover:scale-95"> 
          {isPortuguese ? 'Resgatar cartão' : 'Recharge card'}
        </button>
        <p className={`${mensagemError ? 'block' : 'hidden'} mt-5 text-xl font-bold text-red-700 drop-shadow-lg`}>
          {mensagemError}
        </p>
      </form>
    </main>
  )
}