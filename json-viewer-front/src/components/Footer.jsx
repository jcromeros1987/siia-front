import React, { useState } from 'react';

export default function Footer() {
  const [showCreditos, setShowCreditos] = useState(false);
  const [showContacto, setShowContacto] = useState(false);

  return (
    <>
      <footer className="bg-slate-800 text-slate-200 py-8 px-0 mt-auto">
        <div className="container mx-auto px-6">
          {/* Sección principal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center mb-6">
            {/* Logo institucional */}
            <div className="flex justify-center lg:justify-start">
              <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600/30">
                <img 
                  src="./../CPESGI.png"
                  alt="Logotipo UNAM" 
                  className="h-12 w-auto object-contain filter brightness-0 invert"
                />
              </div>
            </div>
            
            {/* Enlaces de navegación */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
              <button 
                onClick={() => setShowCreditos(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-600/40 hover:border-slate-500 hover:bg-slate-700/50 transition-all text-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                Créditos
              </button>
              
              <button 
                onClick={() => setShowContacto(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-600/40 hover:border-slate-500 hover:bg-slate-700/50 transition-all text-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                Contacto
              </button>
              
              <a 
                href="https://www.planeacion.unam.mx/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-600/40 hover:border-slate-500 hover:bg-slate-700/50 transition-all text-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
                </svg>
                Planeación
              </a>
            </div>
            
            {/* Información institucional */}
            <div className="text-center lg:text-right">
              <h3 className="text-base font-semibold text-slate-100 mb-1">
                UNAM
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto lg:mx-0 lg:ml-auto">
                Coordinación de Planeación, Evaluación y Simplificación
              </p>
            </div>
          </div>
          
          {/* Línea divisoria */}
          <div className="border-t border-slate-700/50 my-4"></div>
          
          {/* Copyright */}
          <div className="text-center">
            <div className="text-xs text-slate-400">
              © {new Date().getFullYear()} SIIA - Sistema Integral de Información Académica
            </div>
          </div>
        </div>
      </footer>

      {/* Modal de Créditos */}
      {showCreditos && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[85vh] overflow-hidden shadow-xl">
            {/* Encabezado */}
            <div className="bg-slate-800 text-white p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Créditos</h3>
                    <p className="text-slate-300 text-sm">Coordinación de Planeación</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowCreditos(false)}
                  className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Cuerpo */}
            <div className="p-5 bg-slate-50 overflow-y-auto max-h-[calc(85vh-140px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Tarjetas de personal */}
                <div className="bg-white p-5 border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                      DF
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-800 text-base">
                        Flores Nieves David
                      </h4>
                      <p className="text-slate-600 text-sm mt-1">
                        Subdirector de Seguimiento Institucional
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-5 border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                      LD
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-800 text-base">
                        Ledesma Domínguez Leonardo
                      </h4>
                      <p className="text-slate-600 text-sm mt-1">
                        Coordinador de Seguimiento Institucional
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Pie del modal */}
            <div className="bg-white p-4 border-t border-slate-200 text-center">
              <div className="flex items-center justify-center gap-3">
                <img src="./../CPESGI.png" alt="Logo Institucional" className="h-8 opacity-70" />
                <div className="text-left">
                  <p className="text-sm font-medium text-slate-800">Universidad Nacional Autónoma de México</p>
                  <p className="text-xs text-slate-600">Coordinación de Planeación, Evaluación y Simplificación</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Contacto */}
      {showContacto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl w-full max-w-md max-h-[85vh] overflow-hidden shadow-xl">
            {/* Encabezado */}
            <div className="bg-slate-800 text-white p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Contacto</h3>
                    <p className="text-slate-300 text-sm">Información SIIA</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowContacto(false)}
                  className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Cuerpo */}
            <div className="p-5 bg-slate-50">
              <div className="bg-white p-5 border border-slate-200 rounded-lg space-y-4">
                <div className="text-center">
                  <h4 className="font-semibold text-slate-800 text-base mb-3">
                    Sistema Integral de Información Académica
                  </h4>
                </div>
                
                {/* Información de contacto */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-white">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Correo electrónico</p>
                      <a 
                        href="mailto:contactosiiaunam@gmail.com" 
                        className="font-semibold text-slate-800 hover:underline text-sm"
                      >
                        contactosiiaunam@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-white">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Teléfono</p>
                      <span className="font-semibold text-slate-800 text-sm">5622-2668</span>
                    </div>
                  </div>
                </div>
                
                {/* Nota importante */}
                <div className="bg-blue-50 border-l-4 border-slate-800 p-3 rounded-r-lg">
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-slate-800 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <div>
                      <p className="text-xs text-slate-700">
                        <strong className="text-slate-800">Nota:</strong> El sistema no contempla la difusión de información personal ni de medios de contacto de académicas y académicos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Pie del modal */}
            <div className="bg-white p-4 border-t border-slate-200 text-center">
              <div className="flex items-center justify-center gap-3">
                <img src="./../CPESGI.png" alt="Logo Institucional" className="h-8 opacity-70" />
                <div className="text-left">
                  <p className="text-sm font-medium text-slate-800">Universidad Nacional Autónoma de México</p>
                  <p className="text-xs text-slate-600">Coordinación de Planeación, Evaluación y Simplificación</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}