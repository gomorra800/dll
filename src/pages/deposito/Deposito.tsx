import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, ChevronDown, Shield } from 'lucide-react';

interface DepositoProps {
  user: any;
  userBalance: number;
  onUpdateBalance: (newBalance: number) => void;
  onBackToHome: () => void;
}

const Deposito: React.FC<DepositoProps> = ({ user, userBalance, onUpdateBalance, onBackToHome }) => {
  const [selectedValue, setSelectedValue] = useState<number | null>(60);
  const [customValue, setCustomValue] = useState<string>('60');

  const predefinedValues = [
    { value: 30, label: 'R$ 30,00', badge: '+Querido' },
    { value: 60, label: 'R$ 60,00', badge: '+Querido', recommended: true },
    { value: 120, label: 'R$ 120,00', badge: 'Recomendado' },
    { value: 240, label: 'R$ 240,00', badge: '+Chances' },
    { value: 300, label: 'R$ 300,00', badge: '+Chances' },
    { value: 600, label: 'R$ 600,00', badge: '+Chances' }
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
      <header className="border-b border-gray-700 px-6 py-4" style={{ backgroundColor: '#0e1015' }}>
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
          {/* Banner */}
          {/* Deposit Form */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center text-white mb-8">
              Digite ou selecione o valor
            </h2>

            {/* Payment Method Info */}
            <div className="flex items-center justify-center space-x-2 p-4 rounded-lg border border-green-500/30" style={{ backgroundColor: '#111219' }}>
              <Shield className="w-5 h-5 text-green-500" />
              <span className="text-green-400 font-medium">Método de pagamento seguro</span>
            </div>

            {/* Predefined Values Grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {predefinedValues.map((item) => (
                <button
                  key={item.value}
                  onClick={() => handleValueSelect(item.value)}
                  className={`relative p-4 rounded-lg font-bold text-lg transition-all duration-200 ${
                    selectedValue === item.value
                      ? 'bg-green-500 text-white'
                      : 'text-white hover:bg-gray-700'
                  }`}
                  style={selectedValue !== item.value ? { backgroundColor: '#111219' } : {}}
                >
                  {item.recommended && (
                    <div className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                      Recomendado
                    </div>
                  )}
                  <div className="mb-2">{item.label}</div>
                  <div className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full inline-block">
                    {item.badge}
                  </div>
                </button>
              ))}
            </div>

            {/* Custom Value Input */}
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-4">
                <span className="text-white text-lg">R$</span>
                <input
                  type="number"
                  value={customValue}
                  onChange={handleCustomValueChange}
                  min="30"
                  max="5000"
                  className="bg-transparent text-white text-2xl font-bold text-center border-none outline-none w-32"
                  placeholder="60"
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
              className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-4 rounded-lg font-bold text-lg flex items-center justify-center space-x-2 transition-colors"
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