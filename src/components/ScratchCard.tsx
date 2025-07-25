import React, { useRef, useEffect, useState } from 'react';

interface ScratchCardProps {
  width: number;
  height: number;
  scratchArea: number; // Porcentagem da área que precisa ser raspada para revelar
  onComplete: () => void;
  children: React.ReactNode;
}

const ScratchCard: React.FC<ScratchCardProps> = ({ 
  width, 
  height, 
  scratchArea, 
  onComplete, 
  children 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Criar a camada raspável
    ctx.fillStyle = '#c0c0c0';
    ctx.fillRect(0, 0, width, height);

    // Adicionar textura de raspadinha
    ctx.fillStyle = '#a0a0a0';
    for (let i = 0; i < 50; i++) {
      ctx.fillRect(
        Math.random() * width,
        Math.random() * height,
        Math.random() * 3 + 1,
        Math.random() * 3 + 1
      );
    }

    // Adicionar texto "RASPE AQUI"
    ctx.fillStyle = '#666';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('RASPE AQUI', width / 2, height / 2);
  }, [width, height]);

  const getEventPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fill();
  };

  const checkScratchArea = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) {
        transparentPixels++;
      }
    }

    const totalPixels = width * height;
    const scratchedPercentage = (transparentPixels / totalPixels) * 100;

    if (scratchedPercentage > scratchArea && !isCompleted) {
      setIsCompleted(true);
      onComplete();
    }
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsScratching(true);
    const { x, y } = getEventPos(e);
    scratch(x, y);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isScratching) return;
    e.preventDefault();
    const { x, y } = getEventPos(e);
    scratch(x, y);
    checkScratchArea();
  };

  const handleEnd = () => {
    setIsScratching(false);
  };

  return (
    <div className="relative" style={{ width, height }}>
      {/* Conteúdo por baixo da raspadinha */}
      <div className="absolute inset-0">
        {children}
      </div>
      
      {/* Canvas da raspadinha */}
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="absolute inset-0 cursor-pointer select-none"
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
        style={{ touchAction: 'none' }}
      />
    </div>
  );
};

export default ScratchCard;