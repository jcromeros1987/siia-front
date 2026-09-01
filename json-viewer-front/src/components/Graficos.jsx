import React from 'react';
import DataTabs from './DataTabs';
import ProduccionGrafica from './tabs/ProduccionGrafica';
import { mapPublicacion } from '../utils/perfilSiia';

export default function Graficos({ perfil = {} }) {
  const publications = (perfil.publicaciones || []).map(mapPublicacion);
  const teaching = perfil.docencia || [];

  return (
    <div className="py-8 space-y-8">
      <section className="bg-white border border-gray-200 mb-6">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-[#192C38] mb-4 border-b border-gray-200 pb-2">
            PRODUCCIÓN INDEXADA
          </h2>
          <ProduccionGrafica perfil={perfil} />
        </div>
      </section>

      <DataTabs
        publications={publications}
        teaching={teaching}
      />
    </div>
  );
}
