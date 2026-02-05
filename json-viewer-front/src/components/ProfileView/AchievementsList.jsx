// src/components/ProfileView/AchievementsList.jsx
import React from 'react';

export default function AchievementsList({ items = [] }) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-slate-800 uppercase tracking-wider mb-2">
        Logros
      </h3>
      {items.length > 0 ? (
        items.map((l, i) => (
          <div key={i} className="border-l border-gray-300 pl-3 py-1">
            <p className="font-medium text-[#192C38] text-sm">{l.nombre}</p>
            <p className="text-[#082C3B] text-xs">
              {l.institucion} — {l.año}
            </p>
          </div>
        ))
      ) : (
        <p className="text-[#082C3B] text-sm italic">No hay logros</p>
      )}
    </div>
  );
}