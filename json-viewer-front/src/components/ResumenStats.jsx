import React from 'react';

export default function ResumenStats() {
  const stats = [
    { label: 'Artículos Publicados', value: '125' },
    { label: 'Proyectos de Investigación', value: '18' },
    { label: 'Estudiantes Graduados', value: '45' },
    { label: 'Años de Experiencia', value: '25' },
  ];

  return (
    <section className="bg-white border border-gray-200 mb-6">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-[#192C38] mb-4 border-b border-gray-200 pb-2">
          RESUMEN DE ACTIVIDADES ACADÉMICAS
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center border-r border-gray-100 last:border-r-0">
              <div className="text-2xl font-bold text-[#192C38] mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-[#082C3B] uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
