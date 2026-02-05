// src/components/ProfileView/Evaluations.jsx
import React from 'react';

export default function Evaluations({ items = [] }) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-slate-800 uppercase tracking-wider mb-2">
        Evaluaciones
      </h3>
      {items.length > 0 ? (
        items.map((item, i) => (
          <div key={i} className="border-l border-gray-300 pl-3 py-1">
            <p className="font-medium text-[#192C38] text-sm">{item.tipo}</p>
            <p className="text-[#082C3B] text-xs">{item.institucion || item.revista}</p>
            <p className="text-[#082C3B] text-xs">{item.fecha}</p>
          </div>
        ))
      ) : (
        <p className="text-[#082C3B] text-sm italic">No hay evaluaciones</p>
      )}
    </div>
  );
}