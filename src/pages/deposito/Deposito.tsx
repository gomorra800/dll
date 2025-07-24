import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, ChevronDown, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DepositoProps {
  user: any;
  userBalance: number;
  onUpdateBalance: (newBalance: number) => void;
  onBackToHome: () => void;
}

const Deposito: React.FC<DepositoProps> = ({ user, userBalance, onUpdateBalance, onBackToHome }) => {
  const [selectedValue, setSelectedValue] = useState<number | null>(60);
  const [customValue, setCustomValue] = useState<string>('60');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();

  const predefinedValues = [
    { value: 30, label: 'R$ 30,00' },
    { value: 60, label: 'R$ 60,00' },
    { value: 120, label: 'R$ 120,00' },
    { value: 240, label: 'R$ 240,00' },
    { value: 300, label: 'R$ 300,00' },
    { value: 600, label: 'R$ 600,00' }
  ];

  const handleValueSelect = (value: number) => {
    setSelectedValue(value);
    setCustomValue(value.toString());
  };

  const handleCustomValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomValue(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setSelectedValue(numValue);
    } else {
      setSelectedValue(null);
    }
  };

  const handleGeneratePix = () => {
    if (selectedValue && selectedValue >= 30) {
      // Simular depósito bem-sucedido
      onUpdateBalance(userBalance + selectedValue);
      alert(`Depósito de R$ ${selectedValue.toFixed(2).replace('.', ',')} realizado com sucesso!`);
      onBackToHome();
    } else {
      alert('Valor mínimo para depósito é R$ 30,00');
    }
  };

  const handleProfileClick = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleLogout = () => {
    onBackToHome();
  };

  // Função para obter as iniciais do nome
  const getInitials = (name: string) => {
    if (!name) return 'U';
    const names = name.trim().split(' ');
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
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
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium">
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

            <style jsx>{`
              input[type="number"]::-webkit-outer-spin-button,
              input[type="number"]::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
              }
            `}</style>
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
          {/* Banner */}
          <div className="mb-8">
            <img 
              src="/dodeposito.png" 
              alt="Banner de depósito" 
              className="w-full h-40 object-cover rounded-lg"
            />
          </div>

          {/* Deposit Form */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-center text-white mb-6">
              Digite ou selecione o valor
            </h2>

            {/* Payment Method Info */}
            <div className="flex items-center justify-center space-x-2 p-3 rounded-lg border border-green-500/30" style={{ backgroundColor: '#111219' }}>
              <Shield className="w-5 h-5 text-green-500" />
              <span className="text-green-400 font-medium text-sm">Método de pagamento seguro</span>
            </div>

            {/* Predefined Values Grid */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {predefinedValues.map((item) => (
                <button
                  key={item.value}
                  onClick={() => handleValueSelect(item.value)}
                  className={`relative p-4 rounded-lg font-normal text-sm transition-all duration-200 ${
                    selectedValue === item.value
                      ? 'bg-green-500 text-white'
                      : 'text-white hover:bg-gray-700'
                  }`}
                  style={selectedValue !== item.value ? { backgroundColor: '#111219' } : {}}
                >
                  {item.recommended && (
                    <div className="absolute -top-1 -right-1 bg-yellow-500 text-black text-xs font-bold px-1 py-0.5 rounded-full">
                      Recomendado
                    </div>
                  )}
                  <div className="mb-1">{item.label}</div>
                </button>
              ))}
            </div>

            {/* Custom Value Input */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-600" style={{ backgroundColor: '#111219' }}>
                <span className="text-white text-lg font-bold">R$</span>
                <input
                  type="number"
                  value={customValue}
                  onChange={handleCustomValueChange}
                  min="30"
                  max="5000"
                  className="bg-transparent text-white text-xl font-normal flex-1 border-none outline-none"
                  placeholder="60"
                  style={{ 
                    appearance: 'textfield',
                    MozAppearance: 'textfield'
                  }}
                />
              </div>
              
              <div className="flex justify-between text-sm text-gray-400">
                <span>Mínimo: R$ 30,00</span>
                <span>Máximo: R$ 5.000,00</span>
              </div>
            </div>

            {/* Generate PIX Button */}
            <button
              onClick={handleGeneratePix}
              disabled={!selectedValue || selectedValue < 30}
              className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-lg font-bold text-base flex items-center justify-center space-x-2 transition-colors"
            >
              <Shield className="w-5 h-5" />
              <span>Gerar PIX</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deposito;