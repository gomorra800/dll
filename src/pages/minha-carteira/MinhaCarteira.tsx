import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, ChevronDown, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MinhaCarteiraProps {
  user: any;
  userBalance: number;
  onUpdateBalance: (newBalance: number) => void;
  onBackToHome: () => void;
}

const MinhaCarteira: React.FC<MinhaCarteiraProps> = ({ user, userBalance, onUpdateBalance, onBackToHome }) => {
  const [activeTab, setActiveTab] = useState('todos');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();

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
    navigate('/deposito');
  };

  const handleSacar = () => {
    navigate('/saque');
  };

  const handleFazerDeposito = () => {
    navigate('/deposito');
  };

  const handleSolicitarSaque = () => {
    navigate('/saque');
  };

  const handleProfileClick = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleLogout = () => {
    onBackToHome();
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