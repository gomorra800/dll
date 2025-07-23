import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, ChevronDown, Plus, Minus } from 'lucide-react';

interface MinhaCarteiraProps {
  user: any;
  userBalance: number;
  onUpdateBalance: (newBalance: number) => void;
  onBackToHome: () => void;
}

const MinhaCarteira: React.FC<MinhaCarteiraProps> = ({ user, userBalance, onUpdateBalance, onBackToHome }) => {
  const [activeTab, setActiveTab] = useState('todos');

  // Função para obter as iniciais do nome
  const getInitials = (name: string) => {
    if (!name) return 'U';
    const names = name.trim().split(' ');
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  const handleDepositar = () => {
    // Navegar para página de depósito (pode ser implementado depois)
    console.log('Navegar para depósito');
  };

  const handleSacar = () => {
    // Implementar lógica de saque
    console.log('Implementar saque');
  };

  const handleFazerDeposito = () => {
    // Navegar para página de depósito
    console.log('Fazer depósito');
  };

  const handleSolicitarSaque = () => {
    // Implementar solicitação de saque
    console.log('Solicitar saque');
  };

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
              onClick={handleDepositar}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium"
            >
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
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <h1 className="text-white text-2xl font-bold mb-8">Minha Carteira</h1>

          {/* Balance Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Saldo Total */}
            <div className="p-6 rounded-lg" style={{ backgroundColor: '#111219' }}>
              <div className="mb-4">
                <h3 className="text-gray-400 text-sm mb-2">Saldo Total</h3>
                <p className="text-white text-2xl font-bold">R$ 0,00</p>
              </div>
            </div>

            {/* Saldo Padrão */}
            <div className="p-6 rounded-lg" style={{ backgroundColor: '#111219' }}>
              <div className="mb-4">
                <h3 className="text-gray-400 text-sm mb-2">Saldo Padrão</h3>
                <p className="text-white text-2xl font-bold">R$ 0,00</p>
                <p className="text-gray-500 text-xs mt-1">Disponível para compras de raspadinhas</p>
              </div>
            </div>

            {/* Premiações */}
            <div className="p-6 rounded-lg" style={{ backgroundColor: '#111219' }}>
              <div className="mb-4">
                <h3 className="text-gray-400 text-sm mb-2">Premiações</h3>
                <p className="text-white text-2xl font-bold">R$ 0,00</p>
                <p className="text-gray-500 text-xs mt-1">Disponível para saque e compras</p>
              </div>
            </div>

            {/* Saldo Bônus */}
            <div className="p-6 rounded-lg" style={{ backgroundColor: '#111219' }}>
              <div className="mb-4">
                <h3 className="text-gray-400 text-sm mb-2">Saldo Bônus</h3>
                <p className="text-white text-2xl font-bold">R$ 0,00</p>
                <p className="text-gray-500 text-xs mt-1">Promoções ativas</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mb-8">
            <button 
              onClick={handleDepositar}
              className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium"
            >
              <Plus className="w-5 h-5" />
              <span>Depositar</span>
            </button>
            <button 
              onClick={handleSacar}
              className="flex items-center space-x-2 text-white px-6 py-3 rounded-lg font-medium border border-gray-600 hover:bg-gray-700"
            >
              <Minus className="w-5 h-5" />
              <span>Sacar</span>
            </button>
          </div>

          {/* Transaction History Section */}
          <div className="rounded-lg p-6" style={{ backgroundColor: '#111219' }}>
            <div className="mb-6">
              <h2 className="text-white text-xl font-bold mb-2">Histórico de Transações</h2>
              <p className="text-gray-400 text-sm">Visualize seu histórico de depósitos e saques</p>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 mb-6">
              <button 
                onClick={() => setActiveTab('todos')}
                className={`px-4 py-2 rounded font-medium text-sm ${
                  activeTab === 'todos' 
                    ? 'bg-gray-700 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Todos
              </button>
              <button 
                onClick={() => setActiveTab('depositos')}
                className={`px-4 py-2 rounded font-medium text-sm ${
                  activeTab === 'depositos' 
                    ? 'bg-gray-700 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Depósitos
              </button>
              <button 
                onClick={() => setActiveTab('saques')}
                className={`px-4 py-2 rounded font-medium text-sm ${
                  activeTab === 'saques' 
                    ? 'bg-gray-700 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Saques
              </button>
            </div>

            {/* Empty State */}
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg mb-6">Nenhuma transação encontrada</p>
              
              <div className="flex justify-center space-x-4">
                <button 
                  onClick={handleFazerDeposito}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium"
                >
                  Fazer Depósito
                </button>
                <button 
                  onClick={handleSolicitarSaque}
                  className="text-white px-6 py-3 rounded-lg font-medium border border-gray-600 hover:bg-gray-700"
                >
                  Solicitar Saque
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinhaCarteira;