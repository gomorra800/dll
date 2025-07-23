import React, { useState, useEffect, useRef } from 'react';

interface CarouselProps {
  images: string[];
  autoSlideInterval?: number;
}

const Carousel: React.FC<CarouselProps> = ({ images, autoSlideInterval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [dragStartIndex, setDragStartIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto slide functionality
  const startAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!isDragging) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }
    }, autoSlideInterval);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [images.length, autoSlideInterval, isDragging]);

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.clientX);
    setDragStartIndex(currentIndex);
    setTranslateX(0);
    stopAutoSlide();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const currentX = e.clientX;
    const diffX = currentX - startX;
    
    setTranslateX(diffX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    const containerWidth = carouselRef.current?.offsetWidth || 1;
    const threshold = containerWidth * 0.1; // 10% da largura do container
    
    if (Math.abs(translateX) > threshold) {
      if (translateX < 0) {
        // Arrastou para esquerda, vai para próximo slide
        setCurrentIndex((prev) => (prev + 1) % images.length);
      } else {
        // Arrastou para direita, vai para slide anterior
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    }
    
    setIsDragging(false);
    setTranslateX(0);
    startAutoSlide();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setDragStartIndex(currentIndex);
    setTranslateX(0);
    stopAutoSlide();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const currentX = e.touches[0].clientX;
    const diffX = currentX - startX;
    
    setTranslateX(diffX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    const containerWidth = carouselRef.current?.offsetWidth || 1;
    const threshold = containerWidth * 0.1; // 10% da largura do container
    
    if (Math.abs(translateX) > threshold) {
      if (translateX < 0) {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      } else {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    }
    
    setIsDragging(false);
    setTranslateX(0);
    startAutoSlide();
  };

  return (
    <div 
      ref={carouselRef}
      className="relative w-full h-96 overflow-hidden cursor-grab active:cursor-grabbing select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div 
        className="flex h-full transition-transform duration-300 ease-out"
        style={{ 
          transform: `translateX(${-currentIndex * 100 + (translateX / (carouselRef.current?.offsetWidth || 1)) * 100}%)`,
          transitionDuration: isDragging ? '0ms' : '400ms',
          transitionTimingFunction: isDragging ? 'linear' : 'ease-out'
        }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full h-full flex-shrink-0">
            <img
              src={image}
              alt={`Banner ${index + 1}`}
              className="w-full h-full object-cover pointer-events-none"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;