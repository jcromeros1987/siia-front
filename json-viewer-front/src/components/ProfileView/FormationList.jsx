// src/components/ProfileView/FormationList.jsx
import React from 'react';

export default function FormationList({ items = [] }) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-slate-800 uppercase tracking-wider mb-2">
        Formación Académica
      </h3>
      {items.length > 0 ? (
        items.map((f, i) => (
          <div key={i} className="border-l border-gray-300 pl-3 py-1">
            <p className="font-medium text-[#192C38] text-sm">{f.nivel}</p>
            <p className="text-[#082C3B] text-sm">{f.titulo}</p>
            <p className="text-[#082C3B] text-xs">
              {f.institucion} — {f.fecha}
            </p>
          </div>
        ))
      ) : (
        <p className="text-[#082C3B] text-sm italic">No hay información</p>
      )}
    </div>
  );
}