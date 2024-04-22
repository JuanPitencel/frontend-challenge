import React, { useState, useEffect } from 'react';
import '../globals.css';

interface ModalFormProps {
  onClose: () => void;
  onDarkModeChange: (newDarkMode: boolean) => void; 
}

const ModalForm: React.FC<ModalFormProps> = ({ onClose, onDarkModeChange }) => {
  const [h1Text, setH1Text] = useState('');
  const [paragraphText, setParagraphText] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const handleSave = () => {
    // Guardar los datos en el localStorage para la practicidad del ejemplo
    localStorage.setItem('h1Text', h1Text);
    localStorage.setItem('paragraphText', paragraphText);
    localStorage.setItem('imageSrc', imageSrc);
    localStorage.setItem('darkMode', JSON.stringify(darkMode));

    window.location.reload();
    onClose();
  };

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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result?.toString();
        setImageSrc(imageData || ''); // Guarda la imagen como Base64
      };
      reader.readAsDataURL(file); 
    }
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    // llama funcion callback desde "about",  para enviarle data hacia el componente padre
    onDarkModeChange(newDarkMode);
  };

  const restoreDefaultTemplate = () => {
    localStorage.removeItem('h1Text');
    localStorage.removeItem('paragraphText');
    localStorage.removeItem('imageSrc');
    localStorage.removeItem('darkMode');
    window.location.reload();
  };
  

  return (
    <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 ${darkMode ? 'dark' : ''}`}>
      <div className={`bg-white p-8 rounded-lg ${darkMode ? 'dark' : ''}`}>
        <h2 className={`text-xl font-bold mb-4 text-center ${darkMode ? 'text-white bg-gray-800 ' : 'text-black'}`}>Edit your template</h2>
        <input
          type="text"
          placeholder="Fill your text after ¡Hello!"
          value={h1Text}
          onChange={(e) => setH1Text(e.target.value)}
          className={`border border-gray-300 rounded px-4 py-2 mb-4 block w-full ${darkMode ? 'text-white bg-gray-800' : 'text-black'}`}
        />
        <textarea
          placeholder="Fill your description"
          value={paragraphText}
          onChange={(e) => setParagraphText(e.target.value)}
          className={`border border-gray-300 rounded px-4 py-2 mb-4 block w-full ${darkMode ? 'text-white bg-gray-800' : 'text-black'}`}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className={`border border-gray-300 rounded px-4 py-2 mb-4 block w-full ${darkMode ? ' bg-gray-800' : ''}`}
        />
        <div className={`border flex justify-end mb-4 h-8 ${darkMode ? 'text-white bg-gray-800' : ''}`}>
          <span className="mr-2">Dark Mode</span>
          <label className="flex items-center cursor-pointer">
           <input
           type="checkbox"
           className="toggle-checkbox sr-only"
           checked={darkMode}
           onChange={toggleDarkMode}
          />
          <div className="toggle-label relative w-10 h-6 bg-gray-300 rounded-full shadow-inner">
           <div className="toggle-dot absolute w-6 h-6 bg-gray-800 rounded-full shadow inset-y-0 left-0"></div>
          </div>
         </label>
        </div>
        <div className="flex justify-end mb-4">
          <button className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold px-4 py-2 mr-2 rounded ${darkMode ? 'text-white bg-gray-800' : ''}`} onClick={onClose}>
            Cancel
          </button>
          <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded ${darkMode ? 'text-white' : ''}`} onClick={handleSave}>
            Save
          </button>
        </div>
        <div className="flex justify-center">
          <button className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold px-4 py-2 rounded ${darkMode ? 'text-white bg-gray-800' : ''}`} onClick={restoreDefaultTemplate}>
           Restore Default Template
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalForm;
