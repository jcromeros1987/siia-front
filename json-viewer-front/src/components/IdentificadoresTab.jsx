import React from 'react';

export function IdentificadoresTab({ firmas = [], scopusIds = [], orcid = '' }) {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-xs text-[#082C3B] mb-2">Firmas</h4>
        <div className="flex flex-wrap gap-2">
          {firmas.length > 0 ? firmas.map(firma => (
            <span
              key={firma}
              className="bg-gray-50 px-3 py-1 rounded text-sm text-slate-800 border border-gray-200"
            >
              {firma}
            </span>
          )) : (
            <p className="text-sm text-gray-400">Sin firmas registradas</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-xs text-[#082C3B] mb-2">ID's SCOPUS</h4>
          <div className="flex flex-wrap gap-2">
            {scopusIds.length > 0 ? scopusIds.map(id => (
              <span
                key={id}
                className="bg-gray-50 px-3 py-1 rounded text-sm text-slate-800 border border-gray-200"
              >
                {id}
              </span>
            )) : (
              <p className="text-sm text-gray-400">Sin IDs Scopus</p>
            )}
          </div>
        </div>

        <div>
          <h4 className="text-xs text-[#082C3B] mb-2">ORCID</h4>
          {orcid ? (
            <span className="bg-gray-50 px-3 py-1 rounded text-sm text-slate-800 border border-gray-200">
              {orcid}
            </span>
          ) : (
            <p className="text-sm text-gray-400">Sin ORCID</p>
          )}
        </div>
      </div>
    </div>
  );
}
