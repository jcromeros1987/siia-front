import React, { useState } from 'react';
const SecihtiBadge = ({ className = '' }) => (
  <span className={`bg-[#3D543F] text-white text-xs px-2 py-1 rounded-md flex items-center w-fit ${className}`}>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
    </svg>
    SECIHTI
  </span>
);

export default function TabsPerfil() {
  const [activeTab, setActiveTab] = useState('investigacion');

  const tabs = [
    { id: 'investigacion', label: 'Investigación' },
    { id: 'nombramientos', label: 'Nombramientos' },
    { id: 'reconocimientos', label: 'Reconocimientos' },
  ];
  const logros = [
    {
      nombre: "Medalla Alfonso Caso",
      institucion: "UNAM",
      año: "2024",
      descripcion: "Mejor alumno del Programa de Posgrado de la generación 2018, a nivel Maestría"
    },
    {
      nombre: "Premio Nacional de Ciencias de Datos",
      institucion: "Tecnológico de Monterrey",
      año: "2021",
      descripcion: "Sistema de detección de COVID-19 mediante análisis de imágenes médicas"
    },
    {
      nombre: "Reconocimiento a Egresados Distinguidos",
      institucion: "UNAM",
      año: "2017",
      descripcion: "Los primeros tres lugares de mayor promedio de la generación 2011-2015"
    },
    {
      nombre: "Primer Lugar en Predicción de Falla - Concurso Nacional de Puentes de Madera XIII",
      institucion: "UNAM",
      año: "2013",
      descripcion: "Determinar la falla de un puente de madera mediante cálculo de esfuerzo infinitesimales"
    },
    {
      nombre: "Primer Lugar de Concurso Nacional de Puentes de Madera XI",
      institucion: "UNAM",
      año: "2011",
      descripcion: "Diseño y construcción de puentes de madera, a eficiencia y carga masiva"
    }
  ];

  return (
    <section className="bg-white border border-gray-200 mb-6">
      <div className="border-b border-gray-200">
        <nav className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-[#3D543F] text-[#192C38]'
                  : 'border-transparent text-[#082C3B] hover:text-slate-800 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6">
        {activeTab === 'investigacion' && (
          <div>
            <h3 className="text-sm font-semibold text-slate-800 mb-4">LÍNEAS DE INVESTIGACIÓN</h3>
            <div className="space-y-4">
              {[
                {
                  title: 'Mecánica de Suelos Avanzada',
                  desc: 'Estudio del comportamiento de suelos bajo condiciones extremas y desarrollo de nuevos métodos de análisis geotécnico.'
                },
                {
                  title: 'Ingeniería Sísmica',
                  desc: 'Análisis y diseño de estructuras resistentes a sismos, con enfoque en sistemas de aislamiento sísmico.'
                }
              ].map((line, i) => (
                <div key={i} className="border-l border-gray-200 pl-3">
                  <h4 className="font-medium text-[#192C38]">{line.title}</h4>
                  <p className="text-sm text-[#082C3B] mt-1">{line.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'nombramientos' && (
          <div>
            <h3 className="text-sm font-semibold text-slate-800 mb-4">NOMBRAMIENTOS</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-medium text-[#082C3B] mb-2">VIGENTE</h4>
                <p className="font-medium text-[#192C38]">Profesor Asignatura A No Definitivo</p>
                <p className="text-sm text-[#082C3B]">Facultad de Ingeniería</p>
                <p className="text-xs text-gray-400 mt-1">Desde 16-08-2024</p>
              </div>

              <div>
                <h4 className="text-xs font-medium text-[#082C3B] mb-2">ANTERIORES</h4>
                <ul className="space-y-4">
                  <li className="border-t border-gray-100 pt-4">
                    <p className="font-medium text-[#192C38]">Profesor Asignatura A TP No Definitivo</p>
                    <p className="text-sm text-[#082C3B]">Facultad de Ingeniería</p>
                    <p className="text-xs text-gray-400 mt-1">16-10-2023 – 15-08-2024</p>
                  </li>
                  <li className="border-t border-gray-100 pt-4">
                    <p className="font-medium text-[#192C38]">Ayudante Profesor B TP No Definitivo</p>
                    <p className="text-sm text-[#082C3B]">Facultad de Ciencias</p>
                    <p className="text-xs text-gray-400 mt-1">16-10-2022 – 31-07-2023</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}



        {activeTab === 'reconocimientos' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-semibold text-slate-800">RECONOCIMIENTOS</h3>
              <SecihtiBadge />
            </div>
            
            {logros.length > 0 ? (
              <div className="space-y-4">
                {logros.map((logro, index) => (
                  <div key={index} className="border-l border-[#3D543F] pl-3 relative">
                    <div className="absolute -left-1 top-3 w-2 h-2 bg-[#3D543F] rounded-full"></div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-[#192C38]">{logro.nombre}</h4>
                        <div className="flex items-center mt-1 space-x-2">
                          <p className="text-sm text-[#082C3B]">{logro.institucion}</p>
                          <SecihtiBadge className="!py-0.5 !text-[11px]" />
                        </div>
                      </div>
                      <span className="bg-gray-50 text-[#082C3B] text-xs px-2 py-1 rounded">{logro.año}</span>
                    </div>
                    <p className="text-sm text-[#082C3B] mt-2">{logro.descripcion}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400 border border-gray-200 rounded-lg">
                <p className="text-sm">NO CUENTA CON RECONOCIMIENTOS</p>
                <div className="mt-3 flex justify-center">
                  <SecihtiBadge />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}