import React from 'react';

export function RevistasTab({ revistas = [] }) {
  return (
    <div>
      <h4 className="text-xs text-[#082C3B] mb-3 uppercase tracking-wider">Publicaciones destacadas</h4>
      {revistas.length > 0 ? (
        <ol className="space-y-4">
          {revistas.map((pub, index) => (
            <li key={`${pub.titulo}-${index}`} className="text-sm pb-3 border-b border-gray-100 last:border-b-0">
              <p className="text-slate-800 font-medium">{pub.titulo}</p>
              <p className="text-xs text-[#082C3B] mt-1">
                {pub.pais && `${pub.pais} `}{pub.año ? `(${pub.año})` : ''}
              </p>
            </li>
          ))}
        </ol>
      ) : (
        <p className="text-sm text-gray-400">Sin revistas registradas</p>
      )}
    </div>
  );
}
