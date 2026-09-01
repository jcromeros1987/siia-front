import React from 'react';

export default function Nombramientos({ perfil = {} }) {
  const vigente = perfil.nombramientos?.vigente || perfil.nombramiento_vigente || {};
  const puesto = vigente.puesto || vigente.descripcion || '';
  const entidad = vigente.entidad || perfil.entidad || '';

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-blue-700">Nombramientos Vigentes</h3>
      {puesto ? (
        <ul className="list-disc list-inside text-sm text-slate-800">
          <li>
            {puesto}{entidad ? ` — ${entidad}` : ''}
            {vigente.desde && (
              <>
                <br />
                Desde {vigente.desde}
              </>
            )}
          </li>
        </ul>
      ) : (
        <p className="text-sm text-gray-400">Sin nombramiento vigente</p>
      )}
    </div>
  );
}
