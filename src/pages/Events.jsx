import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import axios from 'axios';
import useCookieStore from '../store/cookieStore';

export const EventsPage = () => {
  const { generateCookie } = useCookieStore();

  const API_SERVER = 'https://api.rogueintl.com';
  const [imageSrc, setImageSrc] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activityTableData, setActivityTableData] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');

  const session = Cookies.get('s');

  useEffect(() => {
    generateCookie();
    gerarImagemCaptcha();
    getActivities();
  }, []);

  const gerarImagemCaptcha = async () => {
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
          const dataUri = data.dataUri;
          setImageSrc(dataUri);
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    }
  };

  const refreshCaptcha = () => {
    gerarImagemCaptcha();
  };

  const receiveReward = (giftID = '') => {
    console.log("Função ativada");
    fetch(`${API_SERVER}/api/v1/rint/activity/receive`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sx: session,
        giftID,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          getActivities();
        } else {
          Swal.fire('Oops', 'Requer login', 'info');
        }
      })
      .catch((err) => {
        Swal.fire('Erro', 'Algo de errado aconteceu', err);
      });
  };

  const getActivities = (page = 1) => {
    if (session) {
      setActivityTableData('');
      setCurrentPage(page);
      fetch(`${API_SERVER}/api/v1/rint/activity`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sx: session,
          p: page,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.data.includes('need login') || data.data.includes('未登录')) {
            setIsDialogOpen(true);
            setIsLoggedIn(false);
          } else {
            setIsLoggedIn(true);
          }
  
          const tableData = data.data
            .replaceAll('未登录', 'Requer login')
            .replaceAll('need login', 'Requer login');
          setActivityTableData(tableData);
          setPageCount(data.count);
  
          setTimeout(() => {
            document.querySelectorAll('.btn-outline-primary').forEach(function (btn) {
              btn.addEventListener('click', function () {
                let giftID = btn.getAttribute('giftid');
                receiveReward(giftID?.toString());
              });
            });
      
            document.querySelectorAll('.btn-secondary').forEach(function (btn) {
              btn.addEventListener('click', function () {
                let couponID = btn.getAttribute('couponid');
                if (couponID) {
                  var oInput = document.createElement('input');
                  oInput.value = couponID;
                  document.body.appendChild(oInput);
                  oInput.select();
                  document.execCommand('Copy');
                  oInput.className = 'oInput';
                  oInput.style.display = 'none';
                  Swal.fire('Sucesso', 'Seu código foi copiado!', 'success');
                }
              });
            });
          }, 2000)
        })
        .catch((err) => {
          Swal.fire('Erro', 'Algo de errado aconteceu', err);
        });
    }
  };

  const login = () => {
    if (session) {
      fetch(`${API_SERVER}/api/v1/rint/activity/login`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sx: session,
          account,
          password,
          vcode: captcha,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
            switch (data.message) {
              case 'Login Complete': {
                setIsLoggedIn(true);
                setIsDialogOpen(false);
                getActivities();
                Swal.fire('Bem-vindo', 'Login realizado com sucesso', 'success');
                setAccount('');
                setPassword('');
                setCaptcha('');
                break;
              }
              case 'the account not exist': {
                Swal.fire('Erro', 'Algo de errado aconteceu, revise seus dados', 'info');
                gerarImagemCaptcha();
                break;
              }
              case 'the password cannot be empty': {
                Swal.fire('Erro', 'Sua senha não pode ser vazia', 'info');
                gerarImagemCaptcha();
                break;
              }
              case 'account cannot be empty': {
                Swal.fire('Erro', 'Sua login não pode ser vazio', 'info');
                gerarImagemCaptcha();
                break;
              }
              case 'the verification code is incorrectly entered': {
                Swal.fire('Erro', 'Código de segurança incorreto', 'info');
                gerarImagemCaptcha();
                break;
              }
              case 'the verification code cannot be empty': {
                Swal.fire('Erro', 'Código de segurança não pode ser vazio', 'info');
                gerarImagemCaptcha();
                break;
              }
            }
        })
        .catch((err) => {
          Swal.fire('Erro', 'Algo de errado aconteceu', err);
        });
    }
  };

  const logout = () => {
    fetch(`${API_SERVER}/api/v1/rint/activity/logout`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sx: session,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setIsLoggedIn(false);
          getActivities();
        } else {
          setIsLoggedIn(true);
        }

        Swal.fire('Até logo', 'Você foi deslogado', 'info');
      })
      .catch((err) => {
        Swal.fire('Erro', 'Algo de errado aconteceu', err);
      });
  };

  const accountControl = () => {
    if (isLoggedIn) {
      logout();
    } else {
      setIsDialogOpen(true);
    }
  };

  return (
    <main className="w-full min-h-screen py-10 bg-center bg-no-repeat bg-cover bg-zinc-800 sm:bg-fixed">

      <div className={`${isDialogOpen ? 'block' : 'hidden'}`}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="w-full max-w-sm p-5 bg-white rounded" >
            <h2 className="mb-2 text-2xl font-semibold">Login</h2>
            <hr className="my-2" />

            <div className="mt-4">
              <div>
                <label htmlFor="username" className="text-sm font-medium text-black">Login</label>

                <div className="relative mt-1">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    maxLength="14"
                    required
                    minLength="6"
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                    className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                    placeholder="Digite seu login"
                  />
                </div>
              </div>

              <div className='mt-3'>
                <label htmlFor="password" className="text-sm font-medium text-black">Senha</label>
                <div className="relative mt-1">
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                    placeholder="Digite sua senha"
                  />
                </div>
              </div>

              <div className="mt-5">
                <div className="relative py-3">
                  <img
                    src={imageSrc}
                    alt="captcha"
                    onClick={refreshCaptcha}
                    style={{ border: '2px solid black' }}
                  />
                </div>
                <label htmlFor="captcha" className="text-sm font-medium text-black">Código de segurança:</label>

                <div className="relative mt-1">
                  <input
                    type="text"
                    id="captcha"
                    name="captcha"
                    value={captcha}
                    onChange={(e) => setCaptcha(e.target.value)}
                    className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                    placeholder="Digite o código de segurança"
                  />
                </div>
              </div>

              <div className="grid mt-[1rem]">
                <button
                  onClick={login}
                  className="block w-full py-2 text-sm font-medium text-white bg-red-600 rounded shadow col-12 hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                >
                  Login
                </button>
              </div>
            </div>

            <button
              onClick={() => setIsDialogOpen(false)}
              className="block w-1/2 py-2 mt-12 text-sm font-medium text-white bg-gray-600 rounded shadow md:px-12 hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    
      <article className="mx-2 bg-zinc-900 sm:mx-10 lg:mx-60 rounded-2xl ring ring-white sm:p-6 lg:p-8">
      <div className="flex items-start sm:gap-8">
        <div className="text-white">
          <button
            className={`btn bg-red-600 m-3 p-4 rounded`}
            onClick={accountControl}
          >
            {isLoggedIn ? `${account} Logout` : 'Faça o login para resgatar suas recompensas'}
          </button>

          <div className="grid mt-5">
            <div className="flex grid-cols-12 gap-2 py-5 md:grid">
              <b className="mx-3 md:mx-0">Página: </b>
              {Array.from({ length: pageCount + 1 }, (_, i) => (
                <button
                  key={i}
                  className={`btn ${
                    i === currentPage ? 'bg-red-600' : ''
                  } border rounded block w-1/3 mx-2 md:w-full md:mx-0`}
                  onClick={() => getActivities(i)}
                >
                  {i}
                </button>
              )).slice(1)}
            </div>
            <table id="event" dangerouslySetInnerHTML={{ __html: activityTableData }}></table>
            <div className="flex grid-cols-12 gap-2 py-5 md:grid">
            <b className="mx-3 md:mx-0">Página: </b>
              {Array.from({ length: pageCount + 1 }, (_, i) => (
                <button
                  key={i}
                  className={`btn ${
                    i === currentPage ? 'bg-red-600' : ''
                  } border rounded block w-1/3 mx-2 md:w-full md:mx-0`}
                  onClick={() => getActivities(i)}
                >
                  {i}
                </button>
              )).slice(1)}
            </div>
          </div>
        </div>
      </div>
      </article>

    </main>
    
  )
}