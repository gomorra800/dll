import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ArrowRight, Dice1, User, LogIn, X, Phone, Mail, Lock, ShoppingCart, ChevronDown } from 'lucide-react';
import Carousel from './components/Carousel';
import Deposito from './pages/deposito/Deposito';
import PixNaConta from './pages/pix-na-conta/PixNaConta';
import SonhoDeConsumo from './pages/sonho-de-consumo/SonhoDeConsumo';
import MeMimei from './pages/me-mimei/MeMimei';
import SuperPremios from './pages/super-premios/SuperPremios';
import MinhaCarteira from './pages/minha-carteira/MinhaCarteira';
import MinhasEntregas from './pages/minhas-entregas/MinhasEntregas';

function HomePage() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = React.useState(false);
  const [modalType, setModalType] = React.useState('login'); // 'login' or 'register'
  const [registrationStep, setRegistrationStep] = React.useState(1); // 1 or 2
  const [registrationData, setRegistrationData] = React.useState({ name: '', phone: '' });
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [loginMethod, setLoginMethod] = React.useState('email'); // 'email' or 'phone'
  const [activeCategory, setActiveCategory] = React.useState('destaque');
  const [userBalance, setUserBalance] = React.useState(0.00); // Saldo inicial zerado
  const [showProfileDropdown, setShowProfileDropdown] = React.useState(false);

  const bannerImages = [
    '/1752257991.webp',
    '/1752257985.webp',
    '/1752257977.webp'
  ];

  const handleRegisterStepOne = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const stepOneData = {
      name: formData.get('name'),
      phone: formData.get('phone')
    };
    
    setRegistrationData(stepOneData);
    setRegistrationStep(2);
  };

  const handleRegisterStepTwo = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    
    // Validar senha
    if (password.length < 7) {
      alert('A senha deve ter pelo menos 7 caracteres');
      return;
    }
    
    if (password !== confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }
    
    // Criar conta completa
    const userData = {
      ...registrationData,
      email,
      password
    };
    
    setUser(userData);
    setIsLoggedIn(true);
    setShowModal(false);
    navigate('/deposito');
    setRegistrationStep(1);
    setRegistrationData({ name: '', phone: '' });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {
      email: formData.get('email'),
      password: formData.get('password')
    };
    
    // Simular login
    setUser(userData);
    setIsLoggedIn(true);
    setShowModal(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setUserBalance(0.00);
    setShowProfileDropdown(false);
    navigate('/');
  };

  const handleProfileClick = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleBackToStepOne = () => {
    setRegistrationStep(1);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setRegistrationStep(1);
    setRegistrationData({ name: '', phone: '' });
  };

  // Função para obter as iniciais do nome
  const getInitials = (name) => {
    if (!name) return 'U';
    const names = name.trim().split(' ');
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  const handleRaspadinhaClick = (raspadinhaId: string) => {
    if (!isLoggedIn) {
      setShowModal(true);
      setModalType('login');
      return;
    }
    navigate(`/raspadinha${raspadinhaId}/`);
  };

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#0e1015' }}>
      {/* Header */}
      <header className="border-b border-gray-700 px-6 py-1" style={{ backgroundColor: '#0e1015' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img 
              src="/favi.png" 
              alt="Logo" 
             className="w-16 h-16"
            />
            <button 
              onClick={() => window.location.href = '/'}
              className="text-white font-bold text-lg hover:text-green-400 transition-colors"
            >
              Raspadinhas
            </button>
          </div>
          
          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-6">
                {/* Saldo */}
                <div className="text-white font-medium">
                  R$ {userBalance.toFixed(2).replace('.', ',')}
                </div>
                
                {/* Botão Depositar */}
                <button 
                  onClick={() => navigate('/deposito')}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium"
                >
                  Depositar
                </button>
                
                {/* Carrinho */}
                <button className="text-gray-300 hover:text-white">
                  <ShoppingCart className="w-6 h-6" />
                </button>
                
                {/* Perfil do usuário */}
                <div className="relative flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {getInitials(user?.name)}
                  </div>
                  <div 
                    className="flex flex-col cursor-pointer"
                    onClick={handleProfileClick}
                  >
                    <span className="text-white text-sm font-medium">
                      {user?.name || user?.email || 'Usuário'}
                    </span>
                    <span className="text-gray-400 text-xs">Ver perfil</span>
                  </div>
                  <button onClick={handleProfileClick}>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${showProfileDropdown ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => {
                    setShowModal(true);
                    setModalType('register');
                    setRegistrationStep(1);
                  }}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white"
                >
                  <User className="w-5 h-5" />
                  <span>Cadastrar</span>
                </button>
                <button 
                  onClick={() => {
                    setShowModal(true);
                    setModalType('login');
                  }}
                  className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-medium"
                >
                  <LogIn className="w-5 h-5" />
                  <span>Entrar</span>
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Profile Dropdown */}
      {showProfileDropdown && (
        <>
          {/* Overlay para fechar dropdown */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowProfileDropdown(false)}
          />
          
          {/* Dropdown Menu */}
          <div className="fixed top-20 right-6 w-64 rounded-lg shadow-lg z-50 transition-all duration-200 ease-out" style={{ backgroundColor: '#111219' }}>
            <div className="p-2">
              {/* Minha Carteira */}
              <button
                onClick={() => {
                  navigate('/carteira');
                  setShowProfileDropdown(false);
                }}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors text-left"
              >
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/>
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-white font-medium text-sm">Minha Carteira</div>
                  <div className="text-gray-400 text-xs">Visualizar saldos e histórico</div>
                </div>
              </button>
              
              {/* Minhas Entregas */}
              <button
                onClick={() => {
                 navigate('/entregas');
                  navigate('/entregas');
                  setShowProfileDropdown(false);
                }}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors text-left"
              >
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-white font-medium text-sm">Minhas Entregas</div>
                  <div className="text-gray-400 text-xs">Acompanhar status das entregas</div>
                </div>
              </button>
              
              {/* Sair da Conta */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-red-600 transition-colors text-left"
              >
                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-white font-medium text-sm">Sair da Conta</div>
                  <div className="text-gray-400 text-xs">Encerrar sessão atual</div>
                </div>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Main Banner Area */}
      <div className="pt-4">
        <Carousel images={bannerImages} autoSlideInterval={5000} />
      </div>

      {/* Categories */}
      <div className="px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex space-x-2 mb-8">
            <button 
              onClick={() => setActiveCategory('destaque')}
              className={`px-4 py-2 rounded font-medium text-sm ${
                activeCategory === 'destaque' 
                  ? 'bg-green-500 text-white' 
                  : 'text-gray-300 hover:text-white'
              }`}
              style={activeCategory !== 'destaque' ? { backgroundColor: '#14161c' } : {}}
            >
              Destaque
            </button>
            <button 
              onClick={() => setActiveCategory('pix')}
              className={`px-4 py-2 rounded font-medium text-sm ${
                activeCategory === 'pix' 
                  ? 'bg-green-500 text-white' 
                  : 'text-gray-300 hover:text-white'
              }`}
              style={activeCategory !== 'pix' ? { backgroundColor: '#14161c' } : {}}
            >
              PIX na Conta
            </button>
            <button 
              onClick={() => setActiveCategory('eletronico')}
              className={`px-4 py-2 rounded font-medium text-sm ${
                activeCategory === 'eletronico' 
                  ? 'bg-green-500 text-white' 
                  : 'text-gray-300 hover:text-white'
              }`}
              style={activeCategory !== 'eletronico' ? { backgroundColor: '#14161c' } : {}}
            >
              Eletrônico
            </button>
            <button 
              onClick={() => setActiveCategory('veiculo')}
              className={`px-4 py-2 rounded font-medium text-sm ${
                activeCategory === 'veiculo' 
                  ? 'bg-green-500 text-white' 
                  : 'text-gray-300 hover:text-white'
              }`}
              style={activeCategory !== 'veiculo' ? { backgroundColor: '#14161c' } : {}}
            >
              Veículo
            </button>
            <button 
              onClick={() => setActiveCategory('cosmeticos')}
              className={`px-4 py-2 rounded font-medium text-sm ${
                activeCategory === 'cosmeticos' 
                  ? 'bg-green-500 text-white' 
                  : 'text-gray-300 hover:text-white'
              }`}
              style={activeCategory !== 'cosmeticos' ? { backgroundColor: '#14161c' } : {}}
            >
              Cosméticos
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* PIX na conta Card */}
            {(activeCategory === 'destaque' || activeCategory === 'pix') && (
            <div className="rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer" style={{ backgroundColor: '#111219' }}>
              <div className="relative h-24 overflow-hidden">
                <img 
                  src="/pixnaconta.webp" 
                  alt="PIX na conta" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-green-500 text-white text-sm font-bold px-2 py-1 rounded">
                  R$ 0,50
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-bold text-base mb-1 text-white">PIX na conta</h3>
                <p className="text-yellow-400 font-bold text-xs mb-2">PRÊMIOS ATÉ R$ 2000,00</p>
                <p className="text-gray-400 text-xs mb-3 leading-tight">
                  Raspe e receba prêmios em DINHEIRO $$$ até R$2.000 diretamente no seu PIX
                </p>
                <button 
                  onClick={() => handleRaspadinhaClick('1')}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded font-medium flex items-center justify-center space-x-2 text-sm"
                >
                  <span>Jogar Raspadinha</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            )}

            {/* Sonho de Consumo Card */}
            {(activeCategory === 'destaque' || activeCategory === 'eletronico') && (
            <div className="rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer" style={{ backgroundColor: '#111219' }}>
              <div className="relative h-24 overflow-hidden">
                <img 
                  src="/sonhodeconsumo.webp" 
                  alt="Sonho de Consumo" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-green-500 text-white text-sm font-bold px-2 py-1 rounded">
                  R$ 2,00
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-bold text-base mb-1 text-white">Sonho de Consumo 😍</h3>
                <p className="text-yellow-400 font-bold text-xs mb-2">PRÊMIOS ATÉ R$ 5000,00</p>
                <p className="text-gray-400 text-xs mb-3 leading-tight">
                  Eletro, eletrônicos e componentes, receba prêmios exclusivos de alto valor agregado, o...
                </p>
                <button 
                  onClick={() => handleRaspadinhaClick('2')}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded font-medium flex items-center justify-center space-x-2 text-sm"
                >
                  <span>Jogar Raspadinha</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            )}

            {/* Me mimei Card */}
            {(activeCategory === 'destaque' || activeCategory === 'cosmeticos') && (
            <div className="rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer" style={{ backgroundColor: '#111219' }}>
              <div className="relative h-24 overflow-hidden">
                <img 
                  src="/memimei.webp" 
                  alt="Me mimei" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-green-500 text-white text-sm font-bold px-2 py-1 rounded">
                  R$ 2,50
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-bold text-base mb-1 text-white">Me mimei</h3>
                <p className="text-yellow-400 font-bold text-xs mb-2">PRÊMIOS ATÉ R$ 1000,00</p>
                <p className="text-gray-400 text-xs mb-3 leading-tight">
                  Shopee, shein, presentinhos... Quer se mimar mas tá muito caro? não se preocupe, é só dar...
                </p>
                <button 
                  onClick={() => handleRaspadinhaClick('3')}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded font-medium flex items-center justify-center space-x-2 text-sm"
                >
                  <span>Jogar Raspadinha</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            )}

            {/* Super Prêmios Card */}
            {(activeCategory === 'destaque' || activeCategory === 'veiculo') && (
            <div className="rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer" style={{ backgroundColor: '#111219' }}>
              <div className="relative h-24 overflow-hidden">
                <img 
                  src="/superpremios.webp" 
                  alt="Super Prêmios" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-green-500 text-white text-sm font-bold px-2 py-1 rounded">
                  R$ 5,00
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-bold text-base mb-1 text-white">Super Prêmios</h3>
                <p className="text-yellow-400 font-bold text-xs mb-2">PRÊMIOS ATÉ R$ 20000,00</p>
                <p className="text-gray-400 text-xs mb-3 leading-tight">
                  Cansado de ficar a pé? Essa sua chance de sair motorizado, prêmios de até R$20.000
                </p>
                <button 
                  onClick={() => handleRaspadinhaClick('4')}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded font-medium flex items-center justify-center space-x-2 text-sm"
                >
                  <span>Jogar Raspadinha</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 px-6 py-8" style={{ backgroundColor: '#0e1015' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="md:col-span-2">
              <p className="text-gray-400 text-sm mb-4">
                Raspou, levou! É a maior e melhor plataforma de raspadinhas do Brasil
              </p>
              <p className="text-gray-500 text-xs">
                © 2025 Raspou, levou!. Todos os direitos reservados.
              </p>
            </div>

            {/* Links Column 1 */}
          </div>

          {/* Bottom Links */}
          <div className="mt-8 pt-8 border-t border-gray-800">
            <div className="flex flex-wrap gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white">Termos de Uso</a>
              <a href="#" className="text-gray-400 hover:text-white">Política de Privacidade</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="rounded-lg p-8 w-full max-w-lg mx-4 relative" style={{ backgroundColor: '#0e1015' }}>
            <button 
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="text-center mb-8">
              <div className="flex justify-center space-x-8 mb-6">
                <button 
                  onClick={() => setModalType('login')}
                  className={`pb-2 ${modalType === 'login' ? 'text-white border-b-2 border-green-500' : 'text-gray-400'}`}
                >
                  Conecte-se
                </button>
                <button 
                  onClick={() => {
                    setModalType('register');
                    setRegistrationStep(1);
                  }}
                  className={`pb-2 ${modalType === 'register' ? 'text-white border-b-2 border-green-500' : 'text-gray-400'}`}
                >
                  Inscrever-se
                </button>
              </div>
            </div>
            
            {modalType === 'register' && registrationStep === 1 && (
              <div className="text-center mb-8">
                <p className="text-gray-300 text-lg">Crie sua conta gratuita. Vamos começar?</p>
              </div>
            )}
            
            {modalType === 'register' && registrationStep === 2 && (
              <div className="text-center mb-8">
                <p className="text-gray-300 text-lg">Finalize seu cadastro</p>
              </div>
            )}
            
            {modalType === 'login' && (
              <div className="text-center mb-8">
                <p className="text-gray-300 text-lg">Acesse sua conta com suas credenciais</p>
              </div>
            )}

            {modalType === 'register' && registrationStep === 1 && (
              <form onSubmit={handleRegisterStepOne} className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Nome completo"
                    required
                    defaultValue={registrationData.name}
                    className="w-full text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    style={{ backgroundColor: '#2a2d35' }}
                  />
                </div>
                
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Telefone"
                    required
                    defaultValue={registrationData.phone}
                    className="w-full text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    style={{ backgroundColor: '#2a2d35' }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium flex items-center justify-center space-x-2"
                >
                  <span>Continuar</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            )}

            {modalType === 'register' && registrationStep === 2 && (
              <form onSubmit={handleRegisterStepTwo} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    required
                    className="w-full text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    style={{ backgroundColor: '#2a2d35' }}
                  />
                </div>
                
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Senha"
                    required
                    minLength="7"
                    className="w-full text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    style={{ backgroundColor: '#2a2d35' }}
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirmar senha"
                    required
                    minLength="7"
                    className="w-full text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    style={{ backgroundColor: '#2a2d35' }}
                  />
                </div>

                <div className="flex items-start space-x-3 py-2">
                  <input 
                    type="checkbox" 
                    id="terms"
                    required
                    className="mt-1 w-4 h-4 text-green-500 bg-gray-700 border-gray-600 rounded focus:ring-green-500"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-300">
                    Tenho mais de 18 anos de idade e aceito os{' '}
                    <span className="text-green-400 hover:text-green-300 cursor-pointer">Termos</span>
                    {' '}e{' '}
                    <span className="text-green-400 hover:text-green-300 cursor-pointer">Políticas de Privacidade</span>
                  </label>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={handleBackToStepOne}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-medium flex items-center justify-center space-x-2"
                  >
                    <ArrowRight className="w-5 h-5 rotate-180" />
                    <span>Voltar</span>
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium"
                  >
                    Criar conta
                  </button>
                </div>
              </form>
            )}

            {modalType === 'login' && (
              <>
                <div className="flex mb-6">
                  <button
                    onClick={() => setLoginMethod('email')}
                    className={`flex-1 py-2 px-4 rounded-l-lg font-medium ${
                      loginMethod === 'email' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-600 text-gray-300'
                    }`}
                  >
                    E-mail
                  </button>
                  <button
                    onClick={() => setLoginMethod('phone')}
                    className={`flex-1 py-2 px-4 rounded-r-lg font-medium ${
                      loginMethod === 'phone' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-600 text-gray-300'
                    }`}
                  >
                    Telefone
                  </button>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={loginMethod === 'email' ? 'email' : 'tel'}
                      name="email"
                      placeholder={loginMethod === 'email' ? 'E-mail' : 'Telefone'}
                      required
                      className="w-full text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      style={{ backgroundColor: '#2a2d35' }}
                    />
                  </div>
                  
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="password"
                      name="password"
                      placeholder="Digite sua senha"
                      required
                      className="w-full text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      style={{ backgroundColor: '#2a2d35' }}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-gray-400 text-sm">Lembrar de mim</span>
                    </label>
                    <button type="button" className="text-green-400 hover:text-green-300 text-sm">
                      Esqueceu sua senha?
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium"
                  >
                    Entrar
                  </button>
                </form>
              </>
            )}

            <div className="text-center mt-6">
              {modalType === 'register' && registrationStep === 1 && (
                <>
                  <span className="text-gray-400">Já tem uma conta? </span>
                  <button 
                    onClick={() => setModalType('login')}
                    className="text-green-400 hover:text-green-300"
                  >
                    Conecte-se
                  </button>
                </>
              )}
              
              {modalType === 'register' && registrationStep === 2 && (
                <>
                  <span className="text-gray-400">Já tem uma conta? </span>
                  <button 
                    onClick={() => setModalType('login')}
                    className="text-green-400 hover:text-green-300"
                  >
                    Conecte-se
                  </button>
                </>
              )}
              
              {modalType === 'login' && (
                <>
                  <span className="text-gray-400">Ainda não tem uma conta? </span>
                  <button 
                    onClick={() => {
                      setModalType('register');
                      setRegistrationStep(1);
                    }}
                    className="text-green-400 hover:text-green-300"
                  >
                    Criar uma conta grátis
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DepositoPage() {
  const navigate = useNavigate();
  const [user] = React.useState({ name: 'João Pessoa' }); // Simulando usuário logado
  const [userBalance, setUserBalance] = React.useState(0.00);

  const handleUpdateBalance = (newBalance: number) => {
    setUserBalance(newBalance);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <Deposito 
      user={user}
      userBalance={userBalance}
      onUpdateBalance={handleUpdateBalance}
      onBackToHome={handleBackToHome}
    />
  );
}

function PixNaContaPage() {
  const navigate = useNavigate();
  const [user] = React.useState({ name: 'João Pessoa' }); // Simulando usuário logado
  const [userBalance, setUserBalance] = React.useState(0.00);

  const handleUpdateBalance = (newBalance: number) => {
    setUserBalance(newBalance);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <PixNaConta 
      user={user}
      userBalance={userBalance}
      onUpdateBalance={handleUpdateBalance}
      onBackToHome={handleBackToHome}
    />
  );
}

function SonhoDeConsumoPage() {
  const navigate = useNavigate();
  const [user] = React.useState({ name: 'João Pessoa' }); // Simulando usuário logado
  const [userBalance, setUserBalance] = React.useState(0.00);

  const handleUpdateBalance = (newBalance: number) => {
    setUserBalance(newBalance);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <SonhoDeConsumo 
      user={user}
      userBalance={userBalance}
      onUpdateBalance={handleUpdateBalance}
      onBackToHome={handleBackToHome}
    />
  );
}

function MeMimeiPage() {
  const navigate = useNavigate();
  const [user] = React.useState({ name: 'João Pessoa' }); // Simulando usuário logado
  const [userBalance, setUserBalance] = React.useState(0.00);

  const handleUpdateBalance = (newBalance: number) => {
    setUserBalance(newBalance);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <MeMimei 
      user={user}
      userBalance={userBalance}
      onUpdateBalance={handleUpdateBalance}
      onBackToHome={handleBackToHome}
    />
  );
}

function SuperPremiosPage() {
  const navigate = useNavigate();
  const [user] = React.useState({ name: 'João Pessoa' }); // Simulando usuário logado
  const [userBalance, setUserBalance] = React.useState(0.00);

  const handleUpdateBalance = (newBalance: number) => {
    setUserBalance(newBalance);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <SuperPremios 
      user={user}
      userBalance={userBalance}
      onUpdateBalance={handleUpdateBalance}
      onBackToHome={handleBackToHome}
    />
  );
}

function MinhaCarteiraPage() {
  const navigate = useNavigate();
  const [user] = React.useState({ name: 'João Pessoa' }); // Simulando usuário logado
  const [userBalance, setUserBalance] = React.useState(0.00);

  const handleUpdateBalance = (newBalance: number) => {
    setUserBalance(newBalance);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <MinhaCarteira 
      user={user}
      userBalance={userBalance}
      onUpdateBalance={handleUpdateBalance}
      onBackToHome={handleBackToHome}
    />
  );
}

function MinhasEntregasPage() {
  const navigate = useNavigate();
  const [user] = React.useState({ name: 'João Pessoa' }); // Simulando usuário logado
  const [userBalance, setUserBalance] = React.useState(0.00);

  const handleUpdateBalance = (newBalance: number) => {
    setUserBalance(newBalance);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <MinhasEntregas 
      user={user}
      userBalance={userBalance}
      onUpdateBalance={handleUpdateBalance}
      onBackToHome={handleBackToHome}
    />
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/deposito" element={<DepositoPage />} />
        <Route path="/carteira" element={<MinhaCarteiraPage />} />
        <Route path="/entregas" element={<MinhasEntregasPage />} />
        <Route path="/raspadinha1/" element={<PixNaContaPage />} />
        <Route path="/raspadinha2/" element={<SonhoDeConsumoPage />} />
        <Route path="/raspadinha3/" element={<MeMimeiPage />} />
        <Route path="/raspadinha4/" element={<SuperPremiosPage />} />
      </Routes>
    </Router>
  );
}

export default App;