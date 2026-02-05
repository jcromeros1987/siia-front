// src/components/ProfileView/ProfessionalTrayectoria.jsx
import React from 'react';

export default function ProfessionalTrayectoria({ items = [] }) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-slate-800 uppercase tracking-wider mb-2">
        Trayectoria Profesional
      </h3>
      {items.length > 0 ? (
        items.map((t, i) => (
          <div key={i} className="border-l border-gray-300 pl-3 py-1">
            <p className="font-medium text-[#192C38] text-sm">{t.puesto}</p>
            <p className="text-[#082C3B] text-sm">{t.institucion}</p>
            <p className="text-[#082C3B] text-xs">
              {t.fecha_inicio} – {t.fecha_fin}
            </p>
          </div>
        ))
      ) : (
        <p className="text-[#082C3B] text-sm italic">No hay información</p>
      )}
    </div>
  );
}