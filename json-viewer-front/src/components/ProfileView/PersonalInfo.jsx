// src/components/ProfileView/PersonalInfo.jsx
import React from 'react';

export default function PersonalInfo({ data }) {
  return (
    <div className="space-y-4">
      {data?.semblanza && (
        <div>
          <h2 className="text-sm font-medium text-slate-800 uppercase tracking-wider mb-2">
            Semblanza
          </h2>
          <p className="text-[#082C3B] text-sm leading-relaxed">
            {data.semblanza}
          </p>
        </div>
      )}
      
      {data?.intereses?.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-slate-800 uppercase tracking-wider mb-2">
            Intereses
          </h3>
          <div className="flex flex-wrap gap-1">
            {data.intereses.map((int, i) => (
              <span key={i} className="text-xs text-[#082C3B] border border-gray-200 px-2 py-1 rounded">
                {int}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}