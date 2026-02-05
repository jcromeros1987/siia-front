// src/components/ProfileView/ContactInfo.jsx
import React from 'react';

export default function ContactInfo({ data }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-sm font-medium text-slate-800 uppercase tracking-wider mb-2">
          Contacto
        </h3>
        <div className="space-y-1 text-sm">
          {data?.contacto?.correo_alternativo && (
            <div className="text-[#082C3B]">{data.contacto.correo_alternativo}</div>
          )}
          {data?.contacto?.linkedin && (
            <div>
              <a
                href={data.contacto.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                LinkedIn
              </a>
            </div>
          )}
          {data?.contacto?.pagina_personal && (
            <div>
              <a
                href={data.contacto.pagina_personal}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Página personal
              </a>
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-slate-800 uppercase tracking-wider mb-2">
          Identificadores
        </h3>
        <div className="space-y-1 text-sm text-[#082C3B]">
          {data?.orcid && <div>ORCID: {data.orcid}</div>}
          {data?.scopus_ids?.length > 0 && (
            <div>Scopus: {data.scopus_ids.join(', ')}</div>
          )}
        </div>
      </div>
    </div>
  );
}