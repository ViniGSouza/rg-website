/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function ResgateCard() {
  const [account, setAccount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardPassword, setCardPassword] = useState('');
  const [code, setCode] = useState('');
  const [imagemSrc, setImagemSrc] = useState(null);
  const [mensagemError, setMensagemError] = useState(null);

  const session = Cookies.get('s');
 
  const gerarImagemCaptcha = async () => {
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
        const dataUri = data.dataUri;
        setImagemSrc(dataUri);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
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
      console.log('Resposta do servidor:', response);
      switch(response.data) {
        case "\r\n\r\ncard has used":
          setMensagemError('Cartão já foi utilizado.');
          break;
        case "\r\n\r\ncard does not exist":
          setMensagemError('Cartão não existe.');
          break;
        case "\r\n\r\nThe verification code is incorrectly entered":
          setMensagemError('Código de segurança incorreto.');
          gerarImagemCaptcha();
          break;
        case "\r\n\r\nThe verification code cannot be empty":
          setMensagemError('Código de segurança não pode ser vazio.');
          gerarImagemCaptcha();
          break;
        case "\r\n\r\ncard number/password is incorrect":
          setMensagemError('Número e/ou senha do cartão incorreto.');
          gerarImagemCaptcha();
          break;
        case "参数错误":
        setMensagemError('Preencha todos os campos corretamente.');
        gerarImagemCaptcha();
        break;
        default:
          Swal.fire('Sucesso', 'Recarga efetuada com sucesso', 'success');
          setAccount('');
          setCardNumber('');
          setCardPassword('');
          setCode('');
          setMensagemError('');
          gerarImagemCaptcha();
          break;
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }  
  }

  useEffect(() => {
    gerarImagemCaptcha();
  }, []);


  return (
    <main className="relative w-full h-[100vh] bg-fixed bg-center bg-no-repeat bg-cover">
      <div className="absolute inset-0 bg-black opacity-80"></div>
      <form className="absolute -translate-x-1/2 -translate-y-1/2 rounded p top-1/2 left-1/2 md:w-[30rem]" onSubmit={handleSubmit} >
        <h1 className="mb-6 text-4xl font-bold text-white">Resgate seu cartão:</h1>
        <div className="flex flex-col mb-4 gap-y-3">
          <label htmlFor="account" className="text-lg font-bold text-white">
            Login:
          </label>
          <input
            type="text"
            className="p-2 rounded"
            name="account"
            placeholder="Login da sua conta"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />
        </div>

        <div className="flex flex-col mb-4 gap-y-3">
          <label htmlFor="cardnumber" className="text-lg font-bold text-white">
            Número do Cartão:
          </label>
          <input
            type="text"
            className="p-2 rounded"
            name="cardnumber"
            placeholder="Digite o número do cartão"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </div>

        <div className="flex flex-col mb-4 gap-y-3">
          <label htmlFor="cardpassword" className="text-lg font-bold text-white">
            Senha do Cartão:
          </label>
          <input
            type="text"
            className="p-2 rounded"
            name="cardpassword"
            placeholder="Digite a senha do cartão"
            value={cardPassword}
            onChange={(e) => setCardPassword(e.target.value)}
          />
        </div>
        
        <div className="flex flex-col mb-4 gap-y-3">
          <label htmlFor="code" className="text-lg font-bold text-white">
            Código de segurança:
          </label>
          <div className="grid grid-cols-5 gap-x-3">
            <input
            type="text"
            className="col-span-3 p-2 rounded"
            name="code"
            placeholder="Digite o código ao lado"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          
          { imagemSrc && 
            <img src={imagemSrc} alt="Imagem Captcha" onClick={gerarImagemCaptcha} className="h-full col-span-2 cursor-pointer" 
          />}

          </div>
        </div>

        <button className="px-10 py-3 mt-4 font-bold text-white duration-150 ease-in-out bg-red-600 rounded hover:scale-95"> 
          Resgatar cartão
        </button>
        <p className={`${mensagemError ? 'block' : 'hidden'} mt-5 text-xl font-bold text-red-700 drop-shadow-lg`}>
          {mensagemError}
        </p>
      </form>
    </main>
  )
}