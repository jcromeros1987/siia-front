// src/components/ProfileView/DataTables.jsx
import React from 'react';
import PropTypes from 'prop-types';

// Badges embedded here
const SecihtiBadge = ({ className = '' }) => (
  <span className={`bg-[#3D543F] text-white text-xs px-2 py-1 rounded-md flex items-center w-fit ${className}`}>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
    </svg>
    SECIHTI
  </span>
);

const SiiaBadge = ({ className = '' }) => (
  <span className={`bg-blue-800 text-white text-xs px-2 py-1 rounded-md flex items-center w-fit ${className}`}>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 9V5h2v4h4v2h-4v4H9v-4H5V9h4z" />
    </svg>
    SIIA
  </span>
);

export function PublicationsTable({ publications }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 mb-6">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr>
            {['#','Título','Autores','Año','Revista','Citas WoS','Citas Scopus'].map(h => (
              <th key={h} className="px-4 py-2 text-left font-medium text-[#082C3B] uppercase tracking-wider">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {publications.map((pub, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="px-4 py-2">{idx + 1}</td>
              <td className="px-4 py-2 font-medium text-[#192C38]">{pub.titulo}</td>
              <td className="px-4 py-2 text-[#082C3B]">{pub.autores}</td>
              <td className="px-4 py-2 text-[#082C3B]">{pub.año}</td>
              <td className="px-4 py-2 text-[#082C3B]">{pub.revista}</td>
              <td className="px-4 py-2 text-[#082C3B]">{pub.citas_wos ?? 0}</td>
              <td className="px-4 py-2 text-[#082C3B]">{pub.citas_scopus ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

PublicationsTable.propTypes = {
  publications: PropTypes.array.isRequired,
};

export function TeachingTable({ teaching }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 mb-6">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr>
            {['#','Facultad','Nivel','Curso','Periodo','Estudiantes','Fuentes'].map(h => (
              <th key={h} className="px-4 py-2 text-left font-medium text-[#082C3B] uppercase tracking-wider">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {teaching.map((t, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="px-4 py-2">{idx + 1}</td>
              <td className="px-4 py-2 text-[#192C38]">{t.faculty}</td>
              <td className="px-4 py-2 text-[#082C3B]">{t.level}</td>
              <td className="px-4 py-2 text-[#192C38] flex items-center gap-2">
                <span>{t.course}</span>
                <div className="flex gap-1">
                  {t.sources?.includes('SIIA') && <SiiaBadge />}
                  {t.sources?.includes('SECIHTI') && <SecihtiBadge />}
                </div>
              </td>
              <td className="px-4 py-2 text-[#082C3B]">{t.period}</td>
              <td className="px-4 py-2 text-[#082C3B]">{t.students}</td>
              <td className="px-4 py-2 text-[#082C3B]">{(t.sources || []).join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

TeachingTable.propTypes = {
  teaching: PropTypes.array.isRequired,
};
