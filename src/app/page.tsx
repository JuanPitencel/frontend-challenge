"use client"
import React, { useState, useEffect } from 'react';
import './globals.css';
import ModalForm from './components/ModalForm';

const About: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [h1Text, setH1Text] = useState("I'm Angela Smith");
  const [paragraphText, setParagraphText] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis varius nisl non magna consectetur, nec fringilla nisi faucibus.');
  const [imageSrc, setImageSrc] = useState('/images/image 32.png');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedH1Text = localStorage.getItem('h1Text');
    if (savedH1Text) setH1Text(savedH1Text);

    const savedParagraphText = localStorage.getItem('paragraphText');
    if (savedParagraphText) setParagraphText(savedParagraphText);

    const savedImageSrc = localStorage.getItem('imageSrc');
    if (savedImageSrc) setImageSrc(savedImageSrc);

    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) setDarkMode(JSON.parse(savedDarkMode));
  }, []);

  const handleMenuClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDarkModeChange = (newDarkMode: boolean) => {
    setDarkMode(newDarkMode);
  };
  let imageSrcFromLocalStorage = ''; 
  if (typeof window !== 'undefined') { 
    const savedImageSrc = localStorage.getItem('imageSrc') || ''; 
    imageSrcFromLocalStorage = savedImageSrc ? savedImageSrc : ''; 
  }
  

  return (
    <div className={`items-center justify-center h-screen pb-64 ${darkMode ? 'bg-slate-600' : ''}`}>
      <div className="relative container mx-auto px-4 py-10 w-full sm:gap-16 md:w-[1440px] md:h-[900px] md:px-64 md:py-72 md:gap-8 flex items-center justify-center">
        <div className="absolute mt-3 mr-2 top-0 right-0 md:mr-20 md:mt-5 cursor-pointer" onClick={handleMenuClick}>
          <img src="/images/Menu.png" alt="Menu" />
        </div>
        <div className="relative w-full h-full gap-32 md:w-[1296px] md:h-[772px] sm:h-[547px] flex items-center justify-center">
          <div className="w-full h-full md:h-[740px] gap-30 md:w-[1296px] sm:w-[369px] md:flex md:justify-between md:items-center">
            {/* Columna izquierda Desktop */}
            <div className="flex flex-col items-center justify-center md:w-[593px] w-full mx-auto md:h-[286px] sm:h-[136px] gap-[16px md:gap-16] sm:gap-[24px] text-center md:text-left ">
              <div className="gap-32">
                <div className="w-full h-[200px] gap-24px">
                  <div className="w-full h-[80px] sm:h-[64px] gap-8px md:w-[593px] md:h-[80px] md:gap-8px ">
                    <h2 className="text-xs md:text-sm font-sans mb-2 font-extralight ">
                      ABOUT — PERSONAL
                    </h2>
                    <div className="flex flex-col md:items-left ">
                      <h1 className="text-center md:text-left w-full">
                        <div className="md:inline-block">
                          <span className="text-3xl md:text-5xl font-normal font-sans">¡Hello!</span>
                          <span className="text-3xl md:text-5xl font-sans ml-1 font-semibold">{h1Text}</span>
                        </div>
                      </h1>
                    </div>
                  </div>
                  <div className="mt-8">
                    <p className="mb-4 md:mt-3 text-base font-inter md:font-inter font-light text-center md:text-left">
                      {paragraphText}
                    </p>
                  </div>
                  <button className="hidden md:block bg-black hover:bg-hover text-white font-bold py-2 px-4 mt-4 md:mt-0 md:mr-8 w-full h-14 md:w-40 md:h-14 md:gap-8 rounded-lg">
                    Get Started
                  </button>
                </div>
              </div>
            </div>
            {/* Columna derecha Desktop */}
            <div className="md:flex md:flex-col md:justify-center md:items-center md:w-[700px] md:h-[820px] md:top-40 md:left-697px">
              <div className="w-full h-full md:w-[673px] md:h-[740px] flex justify-center items-center">
              <img
                className={`max-w-full max-h-full md:w-[673px] md:h-[740px] sm:h-[309px] ${
                imageSrc && imageSrcFromLocalStorage ? 'rounded-full' : '' }`}
                style={{ borderRadius: imageSrc && imageSrcFromLocalStorage ? '30% 15% 30% 15%' : ''}}
                src={imageSrc || '/images/default-image.png'}
                alt="Angela Smith"
              />
            </div>
              <button className="md:hidden bg-black text-white font-bold py-2 px-4 rounded-lg mt-4 mb-4 mx-auto w-full h-14 flex items-center justify-center">
                <span>Get Started</span>
                <img src="/images/Vector.svg" alt="Arrow" className="ml-2" />
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 flex justify-center w-full ">
          <img className="cursor-pointer" src="/images/Icon.svg" alt="Tu icono" />
        </div>
      </div>
      {isModalOpen && <ModalForm onClose={handleCloseModal} onDarkModeChange={handleDarkModeChange} />}
      <div className="sm:hidden w-full bottom-0 left-0 sticky">
        <img src="/images/Safari.png" alt="Barra de Safari" />
      </div>
    </div>
  );
};

export default About;
