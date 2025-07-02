import { useState, useEffect } from "react";

import SidebarUsuarioConfiguracoes from "../components/SidebarUsuarioConfiguracoes";
import SidebarIntro from "../components/SidebarIntro";
import Footer from "../components/Footer";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import PropTypes from "prop-types";

// Switch customizado com Tailwind
function TailwindSwitch({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`
        ${checked ? 'bg-[#2ecc60]' : 'bg-gray-200'}
        relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none
      `}
    >
      <span
        className={`
          ${checked ? 'translate-x-6' : 'translate-x-1'}
          inline-block h-5 w-5 transform rounded-full bg-white transition-transform
        `}
      />
    </button>
  );
}

TailwindSwitch.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

// Campo de senha com botão de olho
function PasswordInput({ placeholder, ...props }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-200 pr-10"
        {...props}
      />
      <button
        type="button"
        tabIndex={-1}
        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-700"
        onClick={() => setShow((v) => !v)}
      >
        {show ? (
          // Olho aberto
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        ) : (
          // Olho fechado
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.293-3.95M6.634 6.634A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.956 9.956 0 01-4.293 5.95M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
          </svg>
        )}
      </button>
    </div>
  );
}

PasswordInput.propTypes = {
  placeholder: PropTypes.string,
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function ConfiguracoesUsuario() {
  // Usuário completo do backend
  const [usuario, setUsuario] = useState(null);
  const [postSalvos, setPostSalvos] = useState(true);
  const [compartilharLocalizacao, setCompartilharLocalizacao] = useState(true);
  const [senha1, setSenha1] = useState('');
  const [senha2, setSenha2] = useState('');
  const [senha3, setSenha3] = useState('');
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novoEmail, setNovoEmail] = useState('');

  useEffect(() => {
    async function fetchUsuarioCompleto() {
      const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));
      if (usuarioLogado?.id) {
        try {
          const token = sessionStorage.getItem("authToken");
          const res = await fetch(
            `http://localhost:3001/api/usuario/${usuarioLogado.id}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              credentials: "include",
            }
          );
          if (res.ok) {
            const data = await res.json();
            setUsuario(data);
          } else {
            setUsuario(null);
          }
        } catch {
          setUsuario(null);
        }
      } else {
        setUsuario(null);
      }
    }
    fetchUsuarioCompleto();
  }, []);

  function handleRedefinirSenha(e) {
    e.preventDefault();
    Swal.fire({
      icon: 'success',
      title: 'Senha redefinida!',
      text: 'Sua senha foi alterada com sucesso.',
      confirmButtonColor: '#22c55e'
    });
  }

  const MySwal = withReactContent(Swal);

  function handleTrocarEmail(e) {
    e.preventDefault();
    MySwal.fire({
      iconHtml: `
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="32" r="24" stroke="#FDBA74" stroke-width="6" fill="none"/>
    <rect x="30" y="18" width="4" height="22" rx="2" fill="#FDBA74"/>
    <rect x="30" y="44" width="4" height="6" rx="2" fill="#FDBA74"/>
  </svg>
    `,
      title: '',
      html: `
      <div style="margin-bottom: 16px; color: #222; font-size: 16px;">
        Enviamos um código de 6 dígitos<br>para o seu email, confirme antes de prosseguir.
      </div>
      <div id="codigo-inputs" style="display: flex; gap: 8px; justify-content: center; margin-bottom: 16px;">
        <input type="text" maxlength="1" style="width: 36px; height: 36px; text-align: center; font-size: 22px; border-radius: 8px; border: 1px solid #ccc;" />
        <input type="text" maxlength="1" style="width: 36px; height: 36px; text-align: center; font-size: 22px; border-radius: 8px; border: 1px solid #ccc;" />
        <input type="text" maxlength="1" style="width: 36px; height: 36px; text-align: center; font-size: 22px; border-radius: 8px; border: 1px solid #ccc;" />
        <input type="text" maxlength="1" style="width: 36px; height: 36px; text-align: center; font-size: 22px; border-radius: 8px; border: 1px solid #ccc;" />
        <input type="text" maxlength="1" style="width: 36px; height: 36px; text-align: center; font-size: 22px; border-radius: 8px; border: 1px solid #ccc;" />
        <input type="text" maxlength="1" style="width: 36px; height: 36px; text-align: center; font-size: 22px; border-radius: 8px; border: 1px solid #ccc;" />
      </div>
    `,
      showConfirmButton: true,
      confirmButtonText: 'Prosseguir',
      confirmButtonColor: '#22c55e',
      customClass: {
        popup: 'rounded-2xl'
      },
      preConfirm: () => {
        const inputs = Array.from(document.querySelectorAll('#codigo-inputs input'));
        const codigo = inputs.map(input => input.value).join('');
        if (codigo.length !== 6) {
          Swal.showValidationMessage('Digite os 6 dígitos do código');
          return '';
        }
        return codigo;
      }
    });
  }
  return (
    <div className="min-h-screen bg-green-50 flex flex-col pt-16">
      <div className="container mx-auto px-20 py-6 flex flex-col md:flex-row gap-20 flex-1">
        {/* Sidebar */}
        <div className="w-full md:w-1/5 flex-shrink-0">
          <div className="sticky top-20">
            {usuario ? (
              <SidebarUsuarioConfiguracoes usuario={usuario} />
            ) : (
              <SidebarIntro />
            )}
          </div>
        </div>

        {/* Conteúdo principal */}
        <main className="flex-1 flex flex-col gap-8 scroll-smooth">
          {/* Privacidade */}
          <section
            id="privacidade"
            className="bg-white scroll-mt-20 rounded-2xl shadow px-12 py-8 mb-2 w-full max-w-5xl scroll-smooth">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Privacidade</h2>
            <hr className="mb-6 border-gray-300" />
            <div className="mb-6">
              <label htmlFor="termo-politica-checkbox" className="font-semibold text-gray-700 text-base flex items-center gap-2">
                  <span>
                    <span className="text-gray-400 text-lg">●</span>
                    Termo e política de privacidade
                    {' '}
                  </span>
                </label>
              <div className="flex items-center gap-2 mt-2 ml-6 text-gray-600">
                <input id="termo-politica-checkbox" type="checkbox" checked readOnly className="accent-gray-400 w-5 h-5" />
                <span>
                  Nosso <button type="button" className="text-gray-600 underline font-medium p-0 bg-transparent border-none cursor-pointer">termo de uso</button> e <button type="button" className="text-gray-600 underline font-medium p-0 bg-transparent border-none cursor-pointer">política de privacidade</button>
                </span>
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="post-salvos-switch" className="font-semibold text-gray-700 text-base flex items-center gap-2">
                <span className="text-gray-400 text-lg">●</span>{' '}
                <span>Post salvos</span>
              </label>
              <div className="flex items-center justify-between mt-2 ml-6">
                <div>
                  <span className="text-gray-800 font-medium">
                    Exibir suas postagens salvas no seu{' '}
                    <button
                      type="button"
                      className="text-gray-600 underline font-medium bg-transparent border-none p-0 cursor-pointer"
                      aria-label="Ver perfil público"
                    >
                      perfil público
                    </button>
                  </span>
                  <p className="text-xs text-gray-500 mt-1">Ao ativar essa opção todas as postagens que você salvou ficarão visíveis ao público</p>
                </div>
                <span id="post-salvos-switch">
                  <TailwindSwitch checked={postSalvos} onChange={setPostSalvos} />
                </span>
              </div>
            </div>
            <div>
              <label htmlFor="compartilhar-localizacao-switch" className="font-semibold text-gray-700 text-base flex items-center gap-2">
                <span>
                  <span className="text-gray-400 text-lg">●</span>
                  {' '}
                  Compartilhamento de localização
                </span>
              </label>
              <div className="flex items-center justify-between mt-2 ml-6">
                <div>
                  <span className="text-gray-800 font-medium">Permitir exibição da sua cidade ou localização no <button type="button" className="text-gray-600 underline font-medium bg-transparent border-none p-0 cursor-pointer">perfil público</button></span>
                  <p className="text-xs text-gray-500 mt-1">Você pode tornar essa informação privada.</p>
                </div>
                <span id="compartilhar-localizacao-switch">
                  <TailwindSwitch checked={compartilharLocalizacao} onChange={setCompartilharLocalizacao} />
                </span>
              </div>
            </div>
          </section>

          {/* Segurança */}
          <section
            id="seguranca"
            className="bg-gray-50 scroll-mt-20 rounded-2xl shadow border border-gray-200 px-12 py-8 w-full max-w-5xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Segurança</h2>
            <hr className="mb-6 border-gray-300" />

            {/* Redefinir senha */}
            <div className="flex items-start mb-8">
              <span className="mt-1 mr-3 text-gray-400 text-lg">●</span>
              <div className="flex-1">
                <div className="font-semibold text-base text-gray-800 mb-2">Redefinir senha</div>
                <form onSubmit={handleRedefinirSenha} className="flex flex-col gap-3 max-w-md">
                  <div>
                    <label htmlFor="nova-senha-1" className="block text-gray-700 text-sm mb-1">Sua senha atual:</label>
                    <PasswordInput
                      id="nova-senha-1"
                      placeholder="Sua senha atual"
                      value={senha1}
                      onChange={e => setSenha1(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="nova-senha-2" className="block text-gray-700 text-sm mb-1">Nova senha:</label>
                    <PasswordInput
                      id="nova-senha-2"
                      placeholder="Nova senha"
                      value={senha2}
                      onChange={e => setSenha2(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="repita-nova-senha" className="block text-gray-700 text-sm mb-1">Repita sua nova senha:</label>
                    <PasswordInput
                      id="repita-nova-senha"
                      placeholder="Repita sua nova senha"
                      value={senha3}
                      onChange={e => setSenha3(e.target.value)}
                    />
                  </div>
                  {(senha1 && senha2 && senha3) && (
                    <button
                      type="submit"
                      className="self-end mt-2 bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-3xl shadow transition cursor-pointer"
                    >
                      Redefinir senha
                    </button>
                  )}
                </form>
              </div>
            </div>

            {/* Editar email */}
            <div className="flex items-start">
              <span className="mt-1 mr-3 text-gray-400 text-lg">●</span>
              <div className="flex-1">
                <div className="font-semibold text-base text-gray-800 mb-2">Editar email</div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-gray-700">
                    Email atual <span className="font-bold text-gray-800">email.do.usuario@gmail.com</span>
                  </span>
                  {/* Ícone de verificado */}
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="10" className="fill-green-500" />
                    <path className="fill-white" d="M8.6 13.2l-2.3-2.3 1-1 1.3 1.3 3.1-3.1 1 1z" />
                  </svg>
                  <span className="text-xs text-green-600 font-medium">Verificado</span>
                </div>
                <form onSubmit={handleTrocarEmail} className="flex flex-col gap-3 max-w-md">
                  <div>
                    <label htmlFor="senha-atual" className="block text-gray-700 text-sm mb-1">Sua senha atual:</label>
                    <PasswordInput
                      id="senha-atual"
                      placeholder="Sua senha atual"
                      value={senhaAtual}
                      onChange={e => setSenhaAtual(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="novo-email" className="block text-gray-700 text-sm mb-1">Novo email:</label>
                    <input
                      id="novo-email"
                      type="email"
                      placeholder="Digite o novo email"
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-200"
                      value={novoEmail}
                      onChange={e => setNovoEmail(e.target.value)}
                    />
                  </div>
                  {(senhaAtual && novoEmail) && (
                    <button
                      type="submit"
                      className="self-end mt-2 bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-3xl shadow transition cursor-pointer"
                    >
                      Trocar email
                    </button>
                  )}
                </form>
              </div>
            </div>
          </section>
        </main>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default ConfiguracoesUsuario;