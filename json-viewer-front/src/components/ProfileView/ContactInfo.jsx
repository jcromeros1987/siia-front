import React from 'react';

export default function ContactInfo({ data }) {
  const area = data?.area_conocimiento || {};
  const hasContact = data?.contacto?.correo_alternativo
    || data?.contacto?.correo_institucional
    || data?.contacto?.linkedin
    || data?.contacto?.pagina_personal;
  const hasIds = data?.cvu || data?.orcid || data?.scopus_ids?.length > 0
    || area.area || area.disciplina;

  if (!hasContact && !hasIds) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {hasContact && (
        <div>
          <h3 className="text-sm font-medium text-slate-800 uppercase tracking-wider mb-2">
            Contacto
          </h3>
          <div className="space-y-1 text-sm">
            {data?.contacto?.correo_institucional && (
              <div className="text-[#082C3B]">{data.contacto.correo_institucional}</div>
            )}
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
      )}

      {hasIds && (
        <div>
          <h3 className="text-sm font-medium text-slate-800 uppercase tracking-wider mb-2">
            Identificadores
          </h3>
          <div className="space-y-1 text-sm text-[#082C3B]">
            {data?.cvu && <div>CVU: {data.cvu}</div>}
            {data?.orcid && <div>ORCID: {data.orcid}</div>}
            {data?.scopus_ids?.length > 0 && (
              <div>Scopus: {data.scopus_ids.join(', ')}</div>
            )}
            {area.area && <div>Área: {area.area}</div>}
            {area.disciplina && <div>Disciplina: {area.disciplina}</div>}
          </div>
        </div>
      )}
    </div>
  );
}
