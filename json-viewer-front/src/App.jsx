// src/App.jsx
import React, { useRef, useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import Navbar from './components/Navbar';
import PerfilHeader from './components/PerfilHeader';
import TabsPerfil from './components/TabsPerfil';
import CVUUpload from './components/CVUUpload';
import Footer from './components/Footer';
import Graficos from './components/Graficos';
import { PublicacionesSection } from './components/PublicacionesSection';
import useJsonProfile from './hooks/useJsonProfile';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
  
  body {
    font-family: 'Inter', -apple-system, sans-serif;
    font-weight: 400;
    line-height: 1.6;
    color: #192C38;
  }
  
  h1, h2, h3 {
    font-weight: 600;
    letter-spacing: -0.025em;
    color: #192C38;
  }
`;

export default function App() {
  const [activeTab, setActiveTab] = useState('siia');
  const { perfil, error, nombreArchivo, loadFile, reset } = useJsonProfile();
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    loadFile(file);
    event.target.value = '';
  };

  return (
    <>
      <GlobalStyle />
      <div className="min-h-screen bg-gray-50 text-[#192C38]">
        <Navbar />
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex border-b border-gray-200 mb-8">
            <button
              onClick={() => setActiveTab('siia')}
              className={`px-5 py-3 font-medium text-sm focus:outline-none transition-colors ${
                activeTab === 'siia'
                  ? 'text-[#192C38] border-b-2 border-gray-900 font-semibold'
                  : 'text-[#082C3B] hover:text-gray-700 hover:bg-gray-100 rounded-t-lg'
              }`}
            >
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Perfil Académico SIIA
              </span>
            </button>
            <button
              onClick={() => setActiveTab('secihti')}
              className={`px-5 py-3 font-medium text-sm focus:outline-none transition-colors ${
                activeTab === 'secihti'
                  ? 'text-[#192C38] border-b-2 border-gray-900 font-semibold'
                  : 'text-[#082C3B] hover:text-gray-700 hover:bg-gray-100 rounded-t-lg'
              }`}
            >
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                CVU SECIHTI
              </span>
            </button>
          </div>

          {activeTab === 'secihti' ? (
            <CVUUpload />
          ) : (
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-[#192C38]">Datos del perfil</p>
                  <p className="text-xs text-[#082C3B] mt-1">
                    {nombreArchivo
                      ? `Cargado desde ${nombreArchivo}`
                      : 'Mostrando el JSON de ejemplo. Puedes cargar otro archivo con la misma estructura.'}
                  </p>
                  {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="/perfil-siia.ejemplo.json"
                    download="perfil-siia.ejemplo.json"
                    className="px-3 py-2 text-sm text-[#082C3B] hover:text-[#192C38]"
                  >
                    Descargar ejemplo
                  </a>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json,application/json"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg text-[#192C38] hover:bg-gray-50"
                  >
                    Cargar JSON
                  </button>
                  {nombreArchivo && (
                    <button
                      type="button"
                      onClick={reset}
                      className="px-3 py-2 text-sm text-blue-700 hover:text-blue-900"
                    >
                      Restaurar ejemplo
                    </button>
                  )}
                </div>
              </div>

              <PerfilHeader perfil={perfil} />
              <PublicacionesSection perfil={perfil} />
              <TabsPerfil perfil={perfil} />
              <Graficos perfil={perfil} />
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}
