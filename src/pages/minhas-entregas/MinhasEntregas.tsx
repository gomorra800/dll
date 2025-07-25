import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, ChevronDown, Filter, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MinhasEntregasProps {
  user: any;
  userBalance: number;
  onUpdateBalance: (newBalance: number) => void;
  onBackToHome: () => void;
}

const MinhasEntregas: React.FC<MinhasEntregasProps> = ({ user, userBalance, onUpdateBalance, onBackToHome }) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('Todos');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const navigate = useNavigate();

  const statusOptions = [
    'Todos',
    'Solicitado',
    'Aguardando Envio',
    'Enviado',
    'Entregue',
    'Cancelado',
    'Recusado'
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

  const handleProfileClick = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleLogout = () => {
    onBackToHome();
  };

  const handleStatusSelect = (status: string) => {
    setSelectedStatus(status);
    setShowStatusDropdown(false);
  };

  const handleLimpar = () => {
    setSelectedStatus('Todos');
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
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-white text-3xl font-bold mb-2">Minhas Entregas</h1>
            <p className="text-gray-400 text-base">Acompanhe o status das suas solicitações de entrega</p>
          </div>

          {/* Filter Section */}
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <Filter className="w-5 h-5 text-white" />
              <span className="text-white font-medium text-lg">Filtrar por Status</span>
            </div>

            <div className="flex items-center justify-between">
              {/* Status Dropdown - Ocupa todo espaço horizontal */}
              <div className="relative flex-1 mr-6">
                <button
                  onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                  className="flex items-center justify-between w-full px-6 py-2 text-white rounded-lg border border-gray-600 hover:border-gray-500 focus:outline-none text-base"
                  style={{ backgroundColor: '#111219' }}
                >
                  <span>{selectedStatus}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${showStatusDropdown ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {showStatusDropdown && (
                  <>
                    {/* Overlay */}
                    <div 
                      className="fixed inset-0 z-30" 
                      onClick={() => setShowStatusDropdown(false)}
                    />
                    
                    {/* Dropdown Content */}
                    <div className="absolute top-full left-0 w-full mt-1 rounded-lg border border-gray-600 shadow-lg z-40" style={{ backgroundColor: '#111219' }}>
                      {statusOptions.map((status) => (
                        <button
                          key={status}
                          onClick={() => handleStatusSelect(status)}
                          className={`w-full px-6 py-3 text-left hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg text-base ${
                            selectedStatus === status ? 'text-green-400' : 'text-white'
                          }`}
                        >
                          {status}
                          {selectedStatus === status && (
                            <span className="float-right">✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Buttons */}
              <div className="flex items-center space-x-4">
                {/* Filter Button */}
                <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg font-medium text-sm">
                  Filtrar
                </button>

                {/* Limpar Button */}
                <button 
                  onClick={handleLimpar}
                  className="text-gray-400 hover:text-white px-3 py-1.5 font-medium text-sm"
                >
                  Limpar
                </button>
              </div>
            </div>
          </div>

          {/* Empty State */}
          <div className="text-center py-32">
            <div className="w-32 h-32 mx-auto mb-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#1a1d24' }}>
              <Package className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="text-white text-2xl font-bold mb-4">Nenhuma entrega encontrada</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Você ainda não possui solicitações de entrega. Ganhe prêmios nas raspadinhas para solicitar entregas!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinhasEntregas;