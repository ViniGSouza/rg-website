import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import { z } from 'zod';
import Swal from 'sweetalert2';
import useLanguageStore from "../store/languageStore";


export default function Register() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState(null);
  const [accountErrorMessages, setAccountErrorMessages] = useState([]);
  const [passwordErrorMessages, setPasswordErrorMessages] = useState([]);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState(null);
  const [answerErrorMessages, setAnswerErrorMessages] = useState([]);
  const [validationCodeMessage, setValidationCodeMessage] = useState(false);
  const [emptyCodeMessage, setEmptyCodeMessage] = useState(false);
  const [emptyQuestionMessage, setEmptyQuestionMessage] = useState(false);
  const [alreadyExistMessage, setAlreadyExistMessage] = useState(false);
  const recaptchaRef = useRef(null);
  const d = 97;

  const { isPortuguese } = useLanguageStore();

  const schemaAccount = z
    .string()
    .min(6, { 
      message: isPortuguese ? "O campo deve ter pelo menos 6 caracteres" : "The field must have at least 6 characters" 
    })
    .max(10, { 
      message: isPortuguese ? "O campo deve ter no máximo 10 caracteres" : "The field must have at most 10 characters" 
    })
    .regex(/^[a-z0-9]+$/, {
      message: isPortuguese ? "O campo deve conter apenas letras minúsculas e números" : "The field must contain only lowercase letters and numbers",
    });
  

    const schemaPassword = z
    .string()
    .min(6, { 
      message: isPortuguese ? "O campo deve ter pelo menos 6 caracteres" : "The field must have at least 6 characters" 
    })
    .max(14, { 
      message: isPortuguese ? "O campo deve ter no máximo 14 caracteres" : "The field must have at most 14 characters" 
    })
    .regex(/^[a-z0-9!@#$%^&*()_+{}[\]:;<>,.?~\\/-]+$/, {
      message: isPortuguese ? "O campo deve conter apenas letras minúsculas, números e caracteres especiais" : "The field must contain only lowercase letters, numbers, and special characters",
    });
  
  const schemaAnswer = z
    .string()
    .regex(/^[a-z0-9]+$/, {
      message: isPortuguese ? "O campo deve conter apenas letras minúsculas e números" : "The field must contain only lowercase letters and numbers",
    });

  const siteKey = '6LeoLUwoAAAAAB1xzVibwz_YHZP2qWAB3cst-Ov5';

  // const emptyCode = "\r\n\r\n验证码不能为空<br/> <a href='javascript:history.go(-1)'>Go Back</a>";
  // const emptyQuestion = "\r\n\r\n问题不能为空<br/> <a href='javascript:history.go(-1)'>Go Back</a>";
  // const validationCode = "\r\n\r\n验证码错误，请重试<br/> <a href='javascript:history.go(-1)'>Go Back</a>";
  // const accountAlreadyExists = "\r\n\r\n账号已存在！<br/> <a href='javascript:history.go(-1)'>Go Back</a>";

  const emptyCode = "\r\n\r\nThe verification code cannot be empty<br/> <a href='javascript:history.go(-1)'>Go Back</a>";
  const emptyQuestion = "\r\n\r\nThe question cannot be empty<br/> <a href='javascript:history.go(-1)'>Go Back</a>";
  const validationCode = "\r\n\r\nValidation code call failed<br/> <a href='javascript:history.go(-1)'>Go Back</a>";
  const accountAlreadyExists = "\r\n\r\nAccount already exists<br/> <a href='javascript:history.go(-1)'>Go Back</a>";

  const handleRecaptchaChange = (value) => {
    setCode(value);
  };

  const handleSelecaoChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleAccountChange = (e) => {
    const inputValue = e.target.value;
    const validation = schemaAccount.safeParse(inputValue);

    setAccount(inputValue);

    if (validation.success) {
      setAccountErrorMessages([]);
    } else {
      setAccountErrorMessages(validation.error.issues.map((issue) => issue.message));
    }
  };

  const handlePasswordChange = (e) => {
    const inputValue = e.target.value;
    const validation = schemaPassword.safeParse(inputValue);

    setPassword(inputValue);

    if (validation.success) {
      setPasswordErrorMessages([]);
    } else {
      setPasswordErrorMessages(validation.error.issues.map((issue) => issue.message));
    }
  };

  const handleAnswerChange = (e) => {
    const inputValue = e.target.value;
    const validation = schemaAnswer.safeParse(inputValue);

    setAnswer(inputValue);

    if (validation.success) {
      setAnswerErrorMessages([]);
    } else {
      setAnswerErrorMessages(validation.error.issues.map((issue) => issue.message));
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const inputValue = e.target.value;
    setConfirmPassword(inputValue);

    if (inputValue !== password) {
      setConfirmPasswordErrorMessage(
        isPortuguese ? "A confirmação de senha deve ser igual à senha" : "The confirm password must be equal to the password"
      );
    } else {
      setConfirmPasswordErrorMessage(null);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const accountValidation = schemaAccount.safeParse(account);
    const passwordValidation = schemaPassword.safeParse(password);
    const answerValidation = schemaAnswer.safeParse(answer);
  
    if (
      accountValidation.success &&
      passwordValidation.success &&
      confirmPassword === password &&
      answerValidation.success
    ) {
      try {
        const data = {
          account,
          password,
          confirmPassword,
          question,
          answer,
          code,
          d,
        };
  
        const response = await axios.post(
          'https://api.mir4-rogue.com/register',
          data,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
  
        if (response.data === accountAlreadyExists) {
          setAlreadyExistMessage(true);
          return;
        }
        if (response.data === validationCode) {
          setValidationCodeMessage(true);
          return;
        }
        if (response.data === emptyCode) {
          setEmptyCodeMessage(true);
          return;
        }
        if (response.data === emptyQuestion) {
          setEmptyQuestionMessage(true);
          return;
        }
        isPortuguese ? Swal.fire('Sucesso', 'Sua conta foi criada!', 'success') : Swal.fire('Success', 'Your account was created!', 'success');
        setAccount('');
        setPassword('');
        setConfirmPassword('');
        setAnswer('');
        setCode('');
        recaptchaRef.current.reset();
      } catch (error) {
        console.error('Error', error);
        setError(true);
        recaptchaRef.current.reset();
      }
    } 
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  

  return (
    <main className="relative w-full h-[120vh] bg-fixed bg-center bg-no-repeat bg-cover translate-y-8 opacity-0 animate-enter">
      <div className="absolute inset-0 bg-black opacity-80"></div>
      <form className="absolute -translate-x-1/2 -translate-y-1/2 rounded p top-1/2 left-1/2 md:w-[30rem]" onSubmit={handleSubmit}>
        <h1 className="mb-6 text-4xl font-bold text-white">
          {isPortuguese ? 'Registre-se já!' : 'Register now!'}
        </h1>
        <div className="flex flex-col mb-4 gap-y-3">
          <label htmlFor="account" className="text-lg font-bold text-white">
            Login:
          </label>
          <input
            type="text"
            className="p-2 rounded"
            name="account"
            placeholder={isPortuguese ? "6-10 letras ou números" : "6-10 letters or numbers"}
            value={account}
            onChange={handleAccountChange}
          />
        {accountErrorMessages.length > 0 && (
        <div className="text-red-500">
          {accountErrorMessages.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </div>
      )}
        </div>

        <div className="flex flex-col mb-4 gap-y-3">
          <label htmlFor="password" className="text-lg font-bold text-white">
            {isPortuguese ? 'Senha:' : 'Password:'}
          </label>
          <input
            type="password"
            className="p-2 rounded"
            value={password}
            placeholder={isPortuguese ? "6-14 letras, números, caracteres especiais" : "6-14 letters, numbers, special characters"}
            onChange={handlePasswordChange}
            name="password"
          />
          {passwordErrorMessages.length > 0 && (
            <div className="text-red-500">
              {passwordErrorMessages.map((message, index) => (
                <p key={index}>{message}</p>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col mb-4 gap-y-3">
          <label htmlFor="password2" className="text-lg font-bold text-white">
            {isPortuguese ? 'Confirmação de senha:' : 'Confirm password:'}
          </label>
          <input
            type="password"
            className="p-2 rounded"
            placeholder={isPortuguese ? 'Digite sua senha novamente' : 'Enter your password again'}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            name="password2"
          />
            {confirmPasswordErrorMessage && (
          <div className="text-red-500">
              <p>{confirmPasswordErrorMessage}</p>
          </div>
        )}
        </div>

        <div className="flex flex-col mb-4 gap-y-3">
          <label htmlFor="question" className="text-lg font-bold text-white">
            {isPortuguese ? 'Pergunta secreta:' : 'Secret question:'}
          </label>
          <select className="p-2 rounded" onChange={handleSelecaoChange} name="question">
            <option value="父亲姓名">
              {isPortuguese ? 'Selecione a pergunta' : 'Select the question'}
            </option>
            <option value="父亲姓名">
              {isPortuguese ? 'Nome do pai' : "Father's name"}
            </option>
            <option value="母亲姓名">
              {isPortuguese ? 'Nome da Mãe' : "Mother's name"}
            </option>
            <option value="最爱的人名称">
              {isPortuguese ? 'Nome da pessoa favorita' : "Favorite person's name"}
            </option>
            <option value="第一款网络游戏">
              {isPortuguese ? 'Seu primeiro jogo online' : "Your first online game"}
            </option>
          </select>
        </div>

        <div className="flex flex-col mb-4 gap-y-3">
          <label htmlFor="answer" className="text-lg font-bold text-white"> 
            {isPortuguese ? 'Resposta secreta:' : 'Secret answer:'}
          </label>
          <input
            type="text"
            className="p-2 rounded"
            value={answer}
            placeholder={isPortuguese ? "Digite a sua resposta" : "Enter your answer"}
            onChange={handleAnswerChange}
            required
            name="answer"
          />
          {answerErrorMessages.length > 0 && (
            <div className="text-red-500">
              {answerErrorMessages.map((message, index) => (
                <p key={index}>{message}</p>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col mb-4 gap-y-3">
          <ReCAPTCHA
            sitekey={siteKey}
            onChange={handleRecaptchaChange}
            ref={recaptchaRef}
          />
        </div>
        <button className="px-10 py-3 mt-4 font-bold text-white duration-150 ease-in-out bg-red-600 rounded hover:scale-95"> 
          {isPortuguese ? 'Registrar' : 'Register'}
        </button>
        <p className={`${error ? 'block' : 'hidden'} mt-5 text-xl font-bold text-red-700 drop-shadow-lg`}>
          {isPortuguese ? 'Ocorreu um erro, revise seus dados e tente novamente.' : 'An error occurred, please review your data and try again.'}
        </p>
        <p className={`${alreadyExistMessage ? 'block' : 'hidden'} mt-5 text-xl font-bold text-red-700 drop-shadow-lg`}>
          {isPortuguese ? 'Esse login já existe, tente novamente.' : 'This login already exists, try again.'}
        </p>
        <p className={`${validationCodeMessage ? 'block' : 'hidden'} mt-5 text-xl font-bold text-red-700 drop-shadow-lg`}>
          {isPortuguese ? 'Captcha inválido, atualize a página e tente novamente.' : 'Captcha invalid, update the page and try again.'}
        </p>
        <p className={`${emptyCodeMessage ? 'block' : 'hidden'} mt-5 text-xl font-bold text-red-700 drop-shadow-lg`}>
          {isPortuguese ? 'O CAPTCHA não pode ficar vazio, resolva o captcha e tente novamente.' : 'The verification code cannot be empty, update the page and try again.'}
        </p>
        <p className={`${emptyQuestionMessage ? 'block' : 'hidden'} mt-5 text-xl font-bold text-red-700 drop-shadow-lg`}>
          {isPortuguese ? 'A pergunta secreta não pode ficar vazia, selecione uma pergunta e digite a sua resposta.' : 'The secret question cannot be empty, select a question and enter your answer.'}
        </p>
      </form>
    </main>
  )
}