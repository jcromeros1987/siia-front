import React from 'react';
export default function Publicaciones({ perfil = {} }) {
  const firmas = perfil.firmas || [];
  const scopusIds = perfil.scopus_ids || [];
  const orcid = perfil.orcid || '';

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold text-blue-700">Firmas</h3>
        <div className="flex flex-wrap gap-2 text-sm">
          {firmas.map(firma => (
            <span key={firma} className="bg-gray-100 px-2 py-1 rounded">{firma}</span>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-blue-700">IDs SCOPUS</h3>
        <ul className="list-disc list-inside text-sm">
          {scopusIds.map(id => (
            <li key={id}>{id}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-blue-700">ORCID</h3>
        {orcid && (
          <p className="text-sm bg-green-50 px-3 py-1 inline-block rounded">
            {orcid}
          </p>
        )}
      </div>
    </div>
  );
}
