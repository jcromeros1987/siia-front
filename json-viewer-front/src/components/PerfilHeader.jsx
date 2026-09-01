import React from 'react';

const PerfilHeader = ({ perfil = {} }) => {
  const nombramiento = perfil.nombramiento_vigente || {};
  const entidad = perfil.entidad || nombramiento.entidad || '';

  return (
    <section className="bg-white border border-gray-200 mb-6">
      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="border-b border-gray-200 pb-6 mb-6">
              <h1 className="text-3xl font-bold text-[#003247] mb-2">
                {perfil.nombre || 'Nombre no disponible'}
              </h1>
              <p className="text-base text-slate-800 mb-3">
                {nombramiento.descripcion || ''}
              </p>
              {entidad && (
                <div className="text-sm text-[#082C3B] space-y-1">
                  <p><span className="font-medium">Entidad:</span> {entidad}</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-[#192C38] mb-3 uppercase tracking-wide">
                  Información Académica
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between border-b border-gray-100 pb-1">
                    <span className="text-[#082C3B]">Máximo nivel de estudios:</span>
                    <span className="font-medium">{perfil.grado_maximo_estudios || '—'}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-1">
                    <span className="text-[#082C3B]">Antigüedad UNAM:</span>
                    <span className="font-medium">{perfil.antiguedad_unam || '—'}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[#192C38] mb-3 uppercase tracking-wide">
                  Nombramiento Vigente
                </h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="font-medium text-[#192C38]">{nombramiento.descripcion || '—'}</p>
                    <p className="text-[#082C3B]">{nombramiento.entidad || entidad}</p>
                    {nombramiento.desde && (
                      <p className="text-[#082C3B] text-xs">Desde {nombramiento.desde}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerfilHeader;
