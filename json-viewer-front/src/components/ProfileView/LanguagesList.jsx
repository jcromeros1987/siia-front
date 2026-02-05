// src/components/ProfileView/LanguagesList.jsx
import React from 'react';

export default function LanguagesList({ items = [] }) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-slate-800 uppercase tracking-wider mb-2">
        Idiomas
      </h3>
      {items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {items.map((lang, i) => (
            <div key={i} className="text-sm">
              <p className="text-[#192C38]">{lang.idioma}</p>
              <p className="text-[#082C3B] text-xs">{lang.nivel}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-[#082C3B] text-sm italic">No hay idiomas</p>
      )}
    </div>
  );
}