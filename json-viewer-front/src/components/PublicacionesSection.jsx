import React from 'react';
import { IdentificadoresTab } from './IdentificadoresTab';
import { CoautoriasTab } from './CoautoriasTab';
import { RevistasTab } from './RevistasTab';

export const PublicacionesSection = () => { 
  return (
    <section className="bg-white border border-gray-200 mb-6">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-[#192C38] mb-4 border-b border-gray-200 pb-2">
          INFORMACIÓN DE PUBLICACIONES
        </h2>
        
        <div className="space-y-6">
          {/* Sección Identificadores */}
          <div className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
            <h3 className="text-sm font-semibold text-slate-800 mb-3 uppercase tracking-wider">
              Identificadores
            </h3>
            <IdentificadoresTab />
          </div>
          
          {/* Sección Coautorías */}
          <div className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
            <h3 className="text-sm font-semibold text-slate-800 mb-3 uppercase tracking-wider">
              Coautorías
            </h3>
            <CoautoriasTab />
          </div>
          
          {/* Sección Revistas */}
          <div className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
            <h3 className="text-sm font-semibold text-slate-800 mb-3 uppercase tracking-wider">
              Revistas
            </h3>
            <RevistasTab />
          </div>
        </div>
      </div>
    </section>
  );
}