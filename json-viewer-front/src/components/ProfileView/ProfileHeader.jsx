import React from 'react';

export default function ProfileHeader({ data }) {
  const nombramiento = data?.nombramiento_vigente || {};

  return (
    <div className="mb-8 flex flex-col sm:flex-row gap-6">
      {data?.fotografia && (
        <img
          src={data.fotografia}
          alt={data.nombre || 'Fotografía de perfil'}
          className="w-24 h-24 rounded-full object-cover border border-gray-200"
        />
      )}
      <div>
        <h1 className="text-3xl font-medium text-[#192C38] mb-1">
          {data?.nombre || 'Nombre Completo'}
        </h1>
        <p className="text-sm text-[#082C3B]">
          {nombramiento.descripcion || data?.titulo_academico || ''}
        </p>
        <p className="text-sm text-[#082C3B]">
          {data?.entidad_adscripcion || nombramiento.entidad || ''}
        </p>
        {data?.cvu && (
          <p className="text-xs text-gray-500 mt-2">CVU {data.cvu}</p>
        )}
      </div>
    </div>
  );
}
