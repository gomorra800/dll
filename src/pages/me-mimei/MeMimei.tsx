import React, { useState, useEffect } from 'react';
import { ArrowLeft, ShoppingCart, ChevronDown, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MeMimeiProps {
  user: any;
  userBalance: number;
  onUpdateBalance: (newBalance: number) => void;
  onBackToHome: () => void;
}

interface Prize {
  id: string;
  name: string;
  value: string;
  image: string;
}

const MeMimei: React.FC<MeMimeiProps> = ({ user, userBalance, onUpdateBalance, onBackToHome }) => {
  const [showInsufficientFunds, setShowInsufficientFunds] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();

  const raspadinhaPrice = 2.50;

  const prizes: Prize[] = [
    { id: '1', name: 'Kit Kerastase Cabelo', value: 'R$ 1000,00', image: '/kitkerastase.png' },
    { id: '2', name: 'Perfume Dior', value: 'R$ 500,00', image: '/perfumedior.png' },
    { id: '3', name: 'Combo Wepink', value: 'R$ 400,00', image: '/combowepink.png' },
    { id: '4', name: 'Kit de Maquiagem', value: 'R$ 200,00', image: '/kitmaquiagem.png' },
    { id: '5', name: 'Escova Alisadora', value: 'R$ 50,00', image: '/escovaalisadora.png' },
    { id: '6', name: 'BodySplash Wepink', value: 'R$ 30,00', image: '/bodysplash.png' },
    { id: '7', name: 'Mini Bolsa Shein', value: 'R$ 25,00', image: '/minibolsashein.png' },
    { id: '8', name: 'Cartão Shein - R$20', value: 'R$ 20,00', image: '/cartaoshein.png' },
    { id: '9', name: 'Removedor Cravo de Carvão', value: 'R$ 10,00', image: '/removedorcravodecarvao.png' },
    { id: '10', name: 'Cabo de Carregador', value: 'R$ 5,00', image: '/cabodecarregador.png' }
  ];

  // Função para obter as iniciais do nome
  const getInitials = (name: string) => {
    if (!name) return 'U';
    const names = name.trim().split(' ');
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  const handleBuyRaspadinha = () => {
    if (userBalance < raspadinhaPrice) {
      setShowInsufficientFunds(true);
      return;
    }

    // Deduzir o valor da raspadinha do saldo
    onUpdateBalance(userBalance - raspadinhaPrice);
    setIsPlaying(true);

    // Simular o jogo da raspadinha
    setTimeout(() => {
      // Lógica simples de premiação (pode ser ajustada)
      const random = Math.random();
      let wonPrize = null;

      if (random < 0.1) { // 10% chance de ganhar algum prêmio
        const prizeIndex = Math.floor(Math.random() * prizes.length);
        wonPrize = prizes[prizeIndex];
        const prizeValue = parseFloat(wonPrize.value.replace('R$ ', '').replace(',', '.'));
        onUpdateBalance(userBalance - raspadinhaPrice + prizeValue);
        alert(`Parabéns! Você ganhou ${wonPrize.name}!`);
      } else {
        alert('Que pena! Não foi dessa vez. Tente novamente!');
      }

      setIsPlaying(false);
    }, 3000);
  };

  const handleProfileClick = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleLogout = () => {
    onBackToHome();
  };

  // Auto-hide insufficient funds popup
  useEffect(() => {
    if (showInsufficientFunds) {
      const timer = setTimeout(() => {
        setShowInsufficientFunds(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showInsufficientFunds]);

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#0e1015' }}>
      {/* Header */}
      <header className="border-b border-gray-700 px-6 py-1" style={{ backgroundColor: '#0e1015' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={onBackToHome}
              className="text-gray-400 hover:text-white mr-4"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <img 
              src="/favi.png" 
              alt="Logo" 
              className="w-16 h-16"
            />
            <button 
              onClick={onBackToHome}
              className="text-white font-bold text-lg hover:text-green-400 transition-colors"
            >
              Raspadinhas
            </button>
          </div>
          
          {/* User Info */}
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
            <button 
              onClick={() => navigate('/carrinho')}
              className="text-gray-300 hover:text-white"
            >
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

      {/* Main Content */}
      <div className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Raspe Aqui Section */}
          <div className="text-center mb-8 p-24 rounded-lg" style={{ backgroundColor: '#111219' }}>
            <div className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#1a1d24' }}>
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-4xl font-bold text-gray-300 mb-2">RASPE AQUI!</h1>
            <p className="text-gray-400 text-sm mb-2">
              Raspe os 3 símbolos iguais e encontre
            </p>
            <p className="text-gray-400 text-sm mb-6">
              3 símbolos iguais e ganhe o prêmio!
            </p>
            <p className="text-gray-300 text-sm mb-2">
              Compre uma raspadinha para começar a jogar
            </p>
            <p className="text-gray-400 text-xs">
              Clique no botão abaixo para comprar
            </p>
          </div>

          {/* Buy Button - Outside and wider */}
          <div className="mb-8">
            <button
              onClick={handleBuyRaspadinha}
              disabled={isPlaying}
              className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-black px-6 py-2 rounded-lg font-bold text-lg flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <ShoppingBag className="w-6 h-6" />
                <span>{isPlaying ? 'Jogando...' : 'Comprar Raspadinha'}</span>
              </div>
              <span className="bg-black bg-opacity-30 px-3 py-1 rounded text-base font-bold">
                R$ 2,50
              </span>
            </button>
          </div>

          {/* Raspadinha Info */}
          <div className="flex items-center space-x-4 mb-8 p-4 rounded-lg" style={{ backgroundColor: '#111219' }}>
            <div className="flex-shrink-0 w-16 h-16">
              <img 
                src="/memimei.webp" 
                alt="Me mimei" 
                className="w-16 h-16 rounded object-cover"
              />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-white font-bold text-lg mb-1">Me mimei</h3>
              <p className="text-gray-300 text-sm">
                Shopee, shein, presentinhos... Quer se mimar mas tá muito caro? não se preocupe, é só dar uma raspad...
              </p>
            </div>
          </div>

          {/* Prizes Section */}
          <div className="mb-8">
            <h2 className="text-white font-bold text-xl mb-6 text-center">
              CONTEÚDO DESSA RASPADINHA:
            </h2>

            {/* Prizes Grid - 10 items in responsive grid */}
            <div className="grid grid-cols-4 gap-3">
              {prizes.map((prize) => (
                <div key={prize.id} className="text-center">
                  <div className="w-full h-36 mb-2 rounded-lg flex items-center justify-center p-2" style={{ backgroundColor: '#1a1d24' }}>
                    <img 
                      src={prize.image} 
                      alt={prize.name} 
                      className="w-28 h-28 object-contain"
                    />
                  </div>
                  <div className="px-1">
                    <h4 className="text-white font-medium text-xs mb-1 leading-tight">{prize.name}</h4>
                    <p className="text-gray-400 text-xs">{prize.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Insufficient Funds Popup */}
      {showInsufficientFunds && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse">
          <p className="font-medium">Saldo insuficiente.</p>
          <p className="text-sm">Você precisa de R$ 2,50 total.</p>
        </div>
      )}

      {/* Playing Overlay */}
      {isPlaying && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-xl font-bold">Raspando...</p>
            <p className="text-gray-400">Aguarde o resultado!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeMimei;