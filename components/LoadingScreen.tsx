
import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black">
      <div className="relative w-24 h-24 mb-6">
        <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
      <div className="text-primary font-black uppercase tracking-[0.4em] text-xs animate-pulse">Iniciando Ecosistema MitZay</div>
    </div>
  );
};

export default LoadingScreen;
