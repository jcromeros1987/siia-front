// src/components/ProfileView/DataTabs.jsx
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { FiBarChart2, FiList } from 'react-icons/fi';
import { PublicationsChart, TeachingChart } from './DataCharts';
import { PublicationsTable, TeachingTable } from './DataTables';

export default function DataTabs({ publications = [], teaching = [] }) {
  const [activeTab, setActiveTab] = useState('Documentos');
  const [viewMode, setViewMode] = useState({ Documentos: 'chart', Docencia: 'chart' });

  const tabLabels = {
    Documentos: `Documentos indexados (${publications.length})`,
    Docencia: `Docencia Impartida (${teaching.length})`,
  };

  const handleViewToggle = (tab, mode) => {
    setViewMode(prev => ({ ...prev, [tab]: mode }));
  };

  return (
    <section className="bg-white border border-gray-200 mb-6">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-[#192C38] mb-4 border-b border-gray-200 pb-2">
          DATOS DE PRODUCCIÓN
        </h2>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {Object.keys(tabLabels).map(key => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-6 py-3 -mb-px font-medium text-sm focus:outline-none relative transition-colors ${
                activeTab === key 
                  ? 'text-[#192C38] border-b-2 border-gray-900' 
                  : 'text-[#082C3B] hover:text-gray-700'
              }`}>
              {tabLabels[key]}
            </button>
          ))}
        </div>

        {/* Content & Toggle */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-semibold text-[#192C38] uppercase tracking-wider">
              {activeTab === 'Documentos' ? 'Citas por publicación' : 'Cursos por año'}
            </h3>
            <div className="inline-flex rounded-md shadow-sm border border-gray-300">
              <button
                onClick={() => handleViewToggle(activeTab, 'chart')}
                className={`px-3 py-1.5 text-sm font-medium flex items-center ${
                  viewMode[activeTab] === 'chart'
                    ? 'bg-gray-200 text-[#192C38]'
                    : 'bg-white text-[#082C3B] hover:bg-gray-50'
                }`}>
                <FiBarChart2 className="mr-2" /> Gráfico
              </button>
              <button
                onClick={() => handleViewToggle(activeTab, 'table')}
                className={`px-3 py-1.5 text-sm font-medium flex items-center border-l border-gray-300 ${
                  viewMode[activeTab] === 'table'
                    ? 'bg-gray-200 text-[#192C38]'
                    : 'bg-white text-[#082C3B] hover:bg-gray-50'
                }`}>
                <FiList className="mr-2" /> Tabla
              </button>
            </div>
          </div>

          {/* Render based on activeTab & viewMode */}
          {activeTab === 'Documentos' ? (
            viewMode.Documentos === 'chart' ? (
              <PublicationsChart
                citationData={publications.map((p, i) => ({ name: `#${i+1}`, WoS: p.citas_wos, Scopus: p.citas_scopus }))}
                colors={{ WoS: '#4b5563', Scopus: '#6b7280' }}
              />
            ) : (
              <PublicationsTable publications={publications} />
            )
          ) : (
            viewMode.Docencia === 'chart' ? (
              <TeachingChart
                teachChartData={(() => Object.entries(
                  teaching.reduce((a, t) => { a[t.year] = (a[t.year]||0)+1; return a; }, {})
                ).map(([year,count]) => ({ year, count })) )()}
                color="#6b7280"
              />
            ) : (
              <TeachingTable teaching={teaching} />
            )
          )}
        </div>
      </div>
    </section>
  );
}

DataTabs.propTypes = {
  publications: PropTypes.arrayOf(PropTypes.shape({ citas_wos: PropTypes.number, citas_scopus: PropTypes.number })).isRequired,
  teaching: PropTypes.array.isRequired,
};