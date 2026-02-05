import React from 'react';

// IdentificadoresTab.jsx
export function IdentificadoresTab() {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-xs text-[#082C3B] mb-2">Firmas</h4>
        <div className="flex flex-wrap gap-2">
          {["Ledesma L.", "Ledesma, Leonardo", "Ledesma-Dominguez L."].map(firma => (
            <span 
              key={firma} 
              className="bg-gray-50 px-3 py-1 rounded text-sm text-slate-800 border border-gray-200"
            >
              {firma}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-xs text-[#082C3B] mb-2">ID's SCOPUS</h4>
          <div className="flex flex-wrap gap-2">
            <span className="bg-gray-50 px-3 py-1 rounded text-sm text-slate-800 border border-gray-200">
              58993330900
            </span>
            <span className="bg-gray-50 px-3 py-1 rounded text-sm text-slate-800 border border-gray-200">
              57204166249
            </span>
          </div>
        </div>

        <div>
          <h4 className="text-xs text-[#082C3B] mb-2">ORCID</h4>
          <span className="bg-gray-50 px-3 py-1 rounded text-sm text-slate-800 border border-gray-200">
            0000-0002-5374-3954
          </span>
        </div>
      </div>
    </div>
  );
}