// src/components/ProfileView/ProfileHeader.jsx
import React from 'react';

export default function ProfileHeader({ data }) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-medium text-[#192C38] mb-1">
        {data?.nombre || "Nombre Completo"}
      </h1>
      <p className="text-sm text-[#082C3B]">
        {data?.nombramiento_vigente?.descripcion || "Título/Posición"}
      </p>
      <p className="text-sm text-[#082C3B]">
        {data?.entidad_adscripcion || "Institución"}
      </p>
    </div>
  );
} 

