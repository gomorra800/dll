import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, ChevronDown, CreditCard, QrCode } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SaqueProps {
  user: any;
  userBalance: number;
  onUpdateBalance: (newBalance: number) => void;
  onBackToHome: () => void;
}

const Saque: React.FC<SaqueProps> = ({ user, userBalance, onUpdateBalance, onBackToHome }) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [pixKeyType, setPixKeyType] = useState('CPF');
  const [showPixKeyDropdown, setShowPixKeyDropdown] = useState(false);
  const [withdrawValue, setWithdrawValue] = useState('');
  const [cpf, setCpf] = useState('');
  const [pixKey, setPixKey] = useState('');
  const navigate = useNavigate();

  const pixKeyOptions = ['CPF', 'E-mail', 'Telefone', 'Chave Aleatória'];

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

  const handlePixKeySelect = (keyType: string) => {
    setPixKeyType(keyType);
    setShowPixKeyDropdown(false);
  };

  const handleConfirmWithdraw = () => {
    // Implementar lógica de saque
    console.log('Confirmar saque');
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
        <div className="max-w-2xl mx-auto">
          {/* Page Title */}
          <h1 className="text-white text-2xl font-bold text-center mb-12">Solicitar Saque</h1>

          {/* Saldo Disponível Card */}
          <div className="mb-8 p-6 rounded-lg border border-gray-600" style={{ backgroundColor: '#111219' }}>
            <div className="flex items-center space-x-3 mb-2">
              <CreditCard className="w-5 h-5 text-gray-400" />
              <h3 className="text-white font-medium">Saldo Disponível</h3>
            </div>
            <p className="text-gray-400 text-sm">Você tem R$ 0,00 disponível para saque</p>
          </div>

          {/* Saque via PIX Section */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <QrCode className="w-5 h-5 text-white" />
              <h2 className="text-white font-medium text-lg">Saque via PIX</h2>
            </div>
            <p className="text-gray-400 text-sm mb-6">O saque será processado em até 24-48 horas úteis</p>

            {/* Valor do Saque */}
            <div className="mb-6">
              <label className="block text-white font-medium mb-3">Valor do Saque</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">R$</span>
                <input
                  type="number"
                  value={withdrawValue}
                  onChange={(e) => setWithdrawValue(e.target.value)}
                  placeholder="Digite o valor"
                  className="w-full pl-12 pr-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  style={{ backgroundColor: '#1a1d24' }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-400 mt-2">
                <span>Mínimo: R$ 20,00</span>
                <span>Máximo: R$ 0,00</span>
              </div>
            </div>

            {/* CPF */}
            <div className="mb-6">
              <label className="block text-white font-medium mb-3">CPF</label>
              <div className="relative">
                <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  placeholder="000.000.000-00"
                  className="w-full pl-12 pr-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  style={{ backgroundColor: '#1a1d24' }}
                />
              </div>
              <p className="text-gray-400 text-sm mt-2">O CPF é necessário para processamento do saque</p>
            </div>

            {/* Tipo de Chave PIX */}
            <div className="mb-6">
              <label className="block text-white font-medium mb-3">Tipo de Chave PIX</label>
              <div className="relative">
                <button
                  onClick={() => setShowPixKeyDropdown(!showPixKeyDropdown)}
                  className="flex items-center justify-between w-full px-4 py-3 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  style={{ backgroundColor: '#1a1d24' }}
                >
                  <span>{pixKeyType}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${showPixKeyDropdown ? 'rotate-180' : ''}`} />
                </button>

                {/* PIX Key Dropdown */}
                {showPixKeyDropdown && (
                  <>
                    <div 
                      className="fixed inset-0 z-30" 
                      onClick={() => setShowPixKeyDropdown(false)}
                    />
                    <div className="absolute top-full left-0 w-full mt-1 rounded-lg shadow-lg z-40" style={{ backgroundColor: '#1a1d24' }}>
                      {pixKeyOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => handlePixKeySelect(option)}
                          className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Chave PIX */}
            <div className="mb-8">
              <label className="block text-white font-medium mb-3">Chave PIX</label>
              <div className="relative">
                <QrCode className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={pixKey}
                  onChange={(e) => setPixKey(e.target.value)}
                  placeholder="000.000.000-00"
                  className="w-full pl-12 pr-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  style={{ backgroundColor: '#1a1d24' }}
                />
              </div>
              <p className="text-gray-400 text-sm mt-2">A chave PIX deve estar no mesmo CPF da sua conta</p>
            </div>

            {/* Informações Importantes */}
            <div className="mb-8 p-4 rounded-lg" style={{ backgroundColor: '#1a1d24' }}>
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                </div>
                <h3 className="text-white font-medium">Informações Importantes</h3>
              </div>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="text-gray-500 mt-1">•</span>
                  <span>O saque será processado em até 24-48 horas úteis</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-gray-500 mt-1">•</span>
                  <span>A chave PIX deve estar no mesmo CPF da sua conta</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-gray-500 mt-1">•</span>
                  <span>Verifique os dados antes de confirmar</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-gray-500 mt-1">•</span>
                  <span>O valor será descontado do seu saldo disponível</span>
                </li>
              </ul>
            </div>

            {/* Confirmar Saque Button */}
            <button
              onClick={handleConfirmWithdraw}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-bold text-lg"
            >
              Confirmar Saque
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Saque;