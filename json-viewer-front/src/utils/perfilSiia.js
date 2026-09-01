import { normalizeProfile } from './normalizeCvu';

function asList(value) {
  return Array.isArray(value) ? value : [];
}

export function normalizePerfilSiia(raw) {
  if (Array.isArray(raw)) {
    return { publicaciones: raw };
  }

  const mapped = normalizeProfile(raw);
  const data = mapped && typeof mapped === 'object' ? mapped : {};
  const identificadores = data.identificadores && typeof data.identificadores === 'object'
    ? data.identificadores
    : {};
  const nombramientoVigente = {
    ...(data.nombramiento_vigente || {}),
  };
  const nombramientos = data.nombramientos && typeof data.nombramientos === 'object'
    ? data.nombramientos
    : {};

  return {
    ...data,
    firmas: asList(data.firmas ?? identificadores.firmas),
    scopus_ids: asList(data.scopus_ids ?? identificadores.scopus_ids),
    orcid: data.orcid ?? identificadores.orcid ?? '',
    coautorias_entidades_unam: asList(
      data.coautorias_entidades_unam ?? data.coautorias?.entidades_unam
    ),
    revistas: asList(data.revistas),
    lineas_investigacion: asList(data.lineas_investigacion),
    nombramiento_vigente: nombramientoVigente,
    nombramientos: {
      vigente: nombramientos.vigente || nombramientoVigente,
      anteriores: asList(nombramientos.anteriores),
    },
    logros: asList(data.logros),
    documentos_indexados: asList(data.documentos_indexados ?? data.dataGrafica),
    publicaciones: asList(data.publicaciones),
    docencia: asList(data.docencia ?? data.teaching),
  };
}

export function buildDocumentosIndexados(perfil) {
  const explicit = perfil?.documentos_indexados;
  if (Array.isArray(explicit) && explicit.length > 0) {
    return explicit;
  }

  const byYear = new Map();
  for (const pub of asList(perfil?.publicaciones)) {
    const year = pub.año ?? pub.anio ?? pub.year;
    if (year == null) continue;
    if (!byYear.has(year)) {
      byYear.set(year, { año: year, wos: 0, scopus: 0 });
    }
    const row = byYear.get(year);
    const fuente = String(pub.fuente || '').toLowerCase();
    if (fuente.includes('wos')) row.wos += 1;
    if (fuente.includes('scopus')) row.scopus += 1;
  }

  return [...byYear.values()].sort((a, b) => a.año - b.año);
}

export function mapPublicacion(pub = {}) {
  return {
    titulo: pub.titulo ?? '',
    autores: Array.isArray(pub.autores) ? pub.autores.join(', ') : (pub.autores ?? ''),
    año: pub.año ?? pub.anio ?? pub.year ?? '',
    revista: pub.revista ?? '',
    fuente: pub.fuente ?? '',
    citas_wos: pub.citas_wos ?? pub.citasWos ?? 0,
    citas_scopus: pub.citas_scopus ?? pub.citasScopus ?? 0,
  };
}
