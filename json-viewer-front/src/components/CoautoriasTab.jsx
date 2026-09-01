import React from 'react';

export function CoautoriasTab({ entidades = [] }) {
  return (
    <div>
      <h4 className="text-xs text-[#082C3B] mb-2">Entidades UNAM</h4>
      {entidades.length > 0 ? (
        <ul className="space-y-2">
          {entidades.map((entidad, index) => (
            <li
              key={`${entidad}-${index}`}
              className="text-sm text-slate-800 pb-2 border-b border-gray-100 last:border-b-0"
            >
              {entidad}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-400">Sin coautorías con entidades UNAM</p>
      )}
    </div>
  );
}
