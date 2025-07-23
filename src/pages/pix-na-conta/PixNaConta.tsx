import React, { useState, useEffect } from 'react';
import { ArrowLeft, ShoppingCart, ChevronDown, ShoppingBag } from 'lucide-react';

interface PixNaContaProps {
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

const PixNaConta: React.FC<PixNaContaProps> = ({ user, userBalance, onUpdateBalance, onBackToHome }) => {
  const [showInsufficientFunds, setShowInsufficientFunds] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const raspadinhaPrice = 0.50;

  const prizes: Prize[] = [
    { id: '1', name: '2 Mil Reais', value: 'R$ 2000,00', image: '/money-2000.png' },
    { id: '2', name: 'Mil Reais', value: 'R$ 1000,00', image: '/money-1000.png' },
    { id: '3', name: '500 Reais', value: 'R$ 500,00', image: '/money-500.png' },
    { id: '4', name: '200 Reais', value: 'R$ 200,00', image: '/money-200.png' },
    { id: '5', name: '100 Reais', value: 'R$ 100,00', image: '/money-100.png' },
    { id: '6', name: '50 Reais', value: 'R$ 50,00', image: '/money-50.png' },
    { id: '7', name: '20 Reais', value: 'R$ 20,00', image: '/money-20.png' },
    { id: '8', name: '10 Reais', value: 'R$ 10,00', image: '/money-10.png' },
    { id: '9', name: '5 Reais', value: 'R$ 5,00', image: '/money-5.png' },
    { id: '10', name: '2 Reais', value: 'R$ 2,00', image: '/money-2.png' },
    { id: '11', name: '1 Real', value: 'R$ 1,00', image: '/money-1.png' },
    { id: '12', name: '50 Centavos', value: 'R$ 0,50', image: '/money-050.png' }
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
        alert(`Parabéns! Você ganhou ${wonPrize.value}!`);
      } else {
        alert('Que pena! Não foi dessa vez. Tente novamente!');
      }

      setIsPlaying(false);
    }, 3000);
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
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium">
              Depositar
            </button>
            
            {/* Carrinho */}
            <button className="text-gray-300 hover:text-white">
              <ShoppingCart className="w-6 h-6" />
            </button>
            
            {/* Perfil do usuário */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {getInitials(user?.name)}
              </div>
              <div className="flex flex-col">
                <span className="text-white text-sm font-medium">
                  {user?.name || user?.email || 'Usuário'}
                </span>
                <span className="text-gray-400 text-xs">Ver perfil</span>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Central Area */}
          <div className="text-center mb-8">
            <div className="mb-6">
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

            {/* Buy Button */}
            <button
              onClick={handleBuyRaspadinha}
              disabled={isPlaying}
              className="bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-bold text-lg flex items-center justify-center space-x-3 mx-auto mb-8"
            >
              <ShoppingBag className="w-6 h-6" />
              <span>{isPlaying ? 'Jogando...' : 'Comprar Raspadinha'}</span>
              <span className="bg-black bg-opacity-30 px-2 py-1 rounded text-sm">
                R$ 0,50
              </span>
            </button>

            {/* Raspadinha Info */}
            <div className="flex items-center justify-center space-x-4 mb-8 p-4 rounded-lg" style={{ backgroundColor: '#111219' }}>
              <img 
                src="/pixnaconta.webp" 
                alt="PIX na conta" 
                className="w-16 h-16 rounded-lg"
              />
              <div className="text-left">
                <h3 className="text-white font-bold text-lg">PIX na conta</h3>
                <p className="text-gray-400 text-sm">
                  Raspe e receba prêmios em DINHEIRO $$$ até R$2.000 diretamente no seu PIX
                </p>
              </div>
            </div>
          </div>

          {/* Prizes Section */}
          <div className="mb-8">
            <h2 className="text-white font-bold text-xl mb-6 text-center">
              CONTEÚDO DESSA RASPADINHA:
            </h2>

            {/* Prizes Grid */}
            <div className="grid grid-cols-4 gap-4">
              {prizes.map((prize) => (
                <div key={prize.id} className="text-center">
                  <div className="w-full h-32 mb-3 rounded-lg flex items-center justify-center p-2" style={{ backgroundColor: '#1a1d24' }}>
                    {/* Placeholder for money images - you can replace with actual images */}
                    <div className="w-20 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded flex items-center justify-center text-white text-sm font-bold">
                      {prize.name.includes('Centavos') ? '¢' : 'R$'}
                    </div>
                  </div>
                  <div className="px-1">
                    <h4 className="text-white font-medium text-sm mb-1 leading-tight">{prize.name}</h4>
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
          <p className="text-sm">Você precisa de R$ 0,50 total.</p>
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

export default PixNaConta;