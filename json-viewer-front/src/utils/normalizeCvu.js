function asList(value) {
  return Array.isArray(value) ? value : [];
}

function nameOf(value) {
  if (value == null || value === '') return '';
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  if (typeof value === 'object') {
    return value.nombre || value.descripcion || value.titulo || '';
  }
  return '';
}

function yearOf(value) {
  if (value == null || value === '') return '';
  if (typeof value === 'number') return value;
  const match = String(value).match(/(\d{4})/);
  return match ? Number(match[1]) : String(value);
}

function joinName(...parts) {
  return parts.map((part) => String(part || '').trim()).filter(Boolean).join(' ');
}

export function isSecihtiPerfilCompleto(raw) {
  return Boolean(raw && typeof raw === 'object' && (raw.perfil?.principal || raw.aportaciones));
}

function mapArticulo(item = {}) {
  const autores = asList(item.autores)
    .map((autor) => (typeof autor === 'string' ? autor : joinName(autor.nombre, autor.primerApellido, autor.segundoApellido) || nameOf(autor)))
    .filter(Boolean);

  return {
    titulo: item.titulo || item.nombre || '',
    autores: autores.length ? autores : item.autores,
    año: yearOf(item.anio || item.año || item.anioPublicacion || item.fechaPublicacion || item.fecha),
    revista: nameOf(item.revista) || item.nombreRevista || item.libro || '',
    editorial: nameOf(item.editorial),
    doi: item.doi || '',
    citas: item.citas ?? item.citadoPor ?? 0,
    tipo: nameOf(item.tipo) || 'Artículo científico',
    rol: nameOf(item.rol),
    producto_principal: Boolean(item.productoPrincipal),
    url: item.url || item.documento?.uri || '',
    fuente: [item.doi && `DOI: ${item.doi}`, item.wosId && `WoS-id: ${item.wosId}`, item.scopusId && `Scopus-id: ${item.scopusId}`]
      .filter(Boolean)
      .join(' · '),
    citas_wos: item.citasWos ?? item.citas_wos ?? 0,
    citas_scopus: item.citasScopus ?? item.citas_scopus ?? 0,
  };
}

function mapFormacion(item = {}) {
  return {
    nivel: nameOf(item.nivelEscolaridad) || item.nivel || '',
    titulo: item.titulo || '',
    institucion: nameOf(item.institucion) || '',
    fecha: item.fechaObtencion || item.fecha || '',
    cedula: item.cedulaProfesional || item.cedula || '',
    tesis: item.tesis || '',
    opcion_titulacion: nameOf(item.opcionTitulacion),
    estatus: nameOf(item.estatus),
    apoyo_conacyt: Boolean(item.apoyoConacyt),
    programa: item.programa || '',
  };
}

function mapTrayectoria(item = {}) {
  return {
    puesto: item.nombramiento || item.puesto || '',
    institucion: nameOf(item.institucion) || '',
    fecha_inicio: item.fechaInicio || item.fecha_inicio || '',
    fecha_fin: item.esActual ? 'Presente' : (item.fechaFin || item.fecha_fin || ''),
    descripcion: item.logros || item.descripcion || '',
    identificador: item.identificadorInstitucion || '',
    es_actual: Boolean(item.esActual),
    es_principal: Boolean(item.esPrincipal),
  };
}

function mapIdioma(item = {}) {
  return {
    idioma: nameOf(item.nombre) || item.idioma || '',
    nivel: nameOf(item.dominio) || item.nivel || '',
    conversacion: nameOf(item.conversacion),
    lectura: nameOf(item.lectura),
    escritura: nameOf(item.escritura),
    certificacion: item.esCertificado ? 'Certificado' : '',
  };
}

function mapDesarrollo(item = {}) {
  return {
    nombre: item.nombre || item.titulo || '',
    tipo: nameOf(item.tipo),
    descripcion: item.descripcion || '',
    rol: nameOf(item.rol),
    periodo: [item.fechaInicioPeriodo || item.fechaInicio, item.fechaFinPeriodo || item.fechaFin]
      .filter(Boolean)
      .join(' – '),
    url: item.url || item.documento?.uri || '',
  };
}

function mapPropiedad(item = {}) {
  return {
    titulo: item.titulo || item.nombre || '',
    tipo: nameOf(item.tipo),
    estado: nameOf(item.estado),
    año: yearOf(item.anio || item.año || item.fecha),
    numero_solicitud: item.numeroSolicitud || item.numero_solicitud || '',
    resumen: item.resumen || item.descripcion || '',
    url: item.url || item.documento?.uri || '',
  };
}

function mapCurso(item = {}) {
  return {
    nombre: item.nombre || item.titulo || item.curso || '',
    institucion: nameOf(item.institucion),
    periodo: item.periodo || [item.fechaInicio, item.fechaFin].filter(Boolean).join(' – '),
    horas: item.horas,
    nivel: nameOf(item.nivel),
    año: yearOf(item.anio || item.año || item.fechaInicio),
    faculty: nameOf(item.institucion),
    level: nameOf(item.nivel),
    course: item.nombre || item.titulo || item.curso || '',
    period: item.periodo || [item.fechaInicio, item.fechaFin].filter(Boolean).join(' – '),
    students: item.estudiantes ?? item.students ?? 0,
    year: yearOf(item.anio || item.año || item.fechaInicio),
    sources: ['SECIHTI'],
  };
}

function mapCongreso(item = {}) {
  return {
    nombre: item.nombre || item.titulo || nameOf(item.evento) || '',
    pais: nameOf(item.pais),
    año: yearOf(item.anio || item.año || item.fecha),
    participacion: nameOf(item.participacion) || nameOf(item.tipo),
    titulo_trabajo: item.tituloTrabajo || item.titulo || '',
  };
}

function mapFormacionContinua(item = {}) {
  return {
    nombre: item.nombre || item.titulo || '',
    tipo: nameOf(item.tipo),
    horas: item.horas,
    institucion: nameOf(item.institucion),
    año: yearOf(item.anio || item.año || item.fechaInicio || item.fecha),
  };
}

function mapEvaluacion(item = {}) {
  return {
    tipo: nameOf(item.tipo) || 'Evaluación',
    institucion: nameOf(item.institucion),
    revista: nameOf(item.revista),
    articulo: item.articulo || item.titulo || '',
    fecha: item.fecha || item.fechaInicio || '',
    cargo: nameOf(item.cargo) || nameOf(item.rol),
  };
}

function mapEstancia(item = {}) {
  return {
    institucion: nameOf(item.institucion),
    pais: nameOf(item.pais),
    tipo: nameOf(item.tipo),
    periodo: item.periodo || [item.fechaInicio, item.fechaFin].filter(Boolean).join(' – '),
    logros: item.logros || item.descripcion || '',
  };
}

function mapProyecto(item = {}) {
  return {
    titulo: item.titulo || item.nombre || '',
    descripcion: item.descripcion || '',
    fecha_inicio: item.fechaInicioPeriodo || item.fechaInicio || '',
    fecha_fin: item.fechaFinPeriodo || item.fechaFin || '',
    producto_principal: Boolean(item.productoPrincipal),
    url: item.documento?.uri || item.url || '',
  };
}

function pickNombramientoVigente(trayectoria, institucionFallback) {
  const actual = trayectoria.find((item) => item.es_actual)
    || trayectoria.find((item) => item.es_principal)
    || trayectoria[0];

  if (!actual) {
    return {
      descripcion: '',
      entidad: institucionFallback,
      desde: '',
    };
  }

  return {
    descripcion: actual.puesto,
    entidad: actual.institucion || institucionFallback,
    desde: actual.fecha_inicio,
  };
}

export function mapSecihtiToView(raw = {}) {
  const perfil = raw.perfil || {};
  const principal = perfil.principal || {};
  const aportaciones = raw.aportaciones || {};
  const area = principal.areaConocimiento || {};
  const institucion = raw.nombreInstituciónReceptora || raw.nombreInstitucionReceptora || '';

  const formacion = asList(perfil.trayectoriaAcademica).map(mapFormacion);
  const trayectoria = asList(perfil.trayectoriaProfesional).map(mapTrayectoria);
  const articulos = [
    ...asList(aportaciones.articulosCientifica),
    ...asList(aportaciones.articulosDifusion),
  ].map(mapArticulo);
  const capitulos = [
    ...asList(aportaciones.capitulosCientifica),
    ...asList(aportaciones.capitulosDifusion),
  ].map(mapArticulo);
  const nombramientoVigente = pickNombramientoVigente(trayectoria, institucion);
  const grado = perfil.nivelAcademico
    || formacion[0]?.nivel
    || '';

  return {
    cvu: perfil.cvu || '',
    nombre: joinName(perfil.titulo, principal.nombre, principal.primerApellido, principal.segundoApellido),
    fotografia: principal.fotografia?.uri || '',
    titulo_academico: perfil.titulo || '',
    nivel_academico: perfil.nivelAcademico || '',
    nombramiento_vigente: nombramientoVigente,
    entidad_adscripcion: institucion,
    entidad: institucion,
    grado_maximo_estudios: grado,
    antiguedad_unam: '',
    semblanza: principal.semblanza || '',
    intereses: asList(principal.intereses),
    habilidades: asList(principal.habilidades),
    contacto: {
      linkedin: principal.linkedin || '',
      correo_institucional: principal.correoInstitucional || principal.correo || '',
      correo_alternativo: principal.correoAlternativo || '',
      pagina_personal: principal.paginaPersonal || principal.pagina_personal || '',
    },
    area_conocimiento: {
      area: nameOf(area.area),
      campo: nameOf(area.campo),
      disciplina: nameOf(area.disciplina),
      subdisciplina: nameOf(area.subdisciplina),
    },
    formacion,
    trayectoria_profesional: trayectoria,
    idiomas: asList(perfil.idiomaLengua?.idiomas).map(mapIdioma),
    publicaciones_cientificas: articulos,
    publicaciones: articulos,
    capitulos_cientificos: capitulos,
    desarrollos_tecnologicos: asList(aportaciones.desarrolloTecnologicoInnovacion).map(mapDesarrollo),
    propiedad_intelectual: asList(aportaciones.propiedadIntelectual).map(mapPropiedad),
    cursos_impartidos: [
      ...asList(aportaciones.tutorias),
      ...asList(aportaciones.capacitaciones),
    ].map(mapCurso),
    docencia: asList(aportaciones.tutorias).map(mapCurso),
    participacion_congresos: [
      ...asList(aportaciones.memoriasCongresos),
      ...asList(aportaciones.eventosComunicacion),
    ].map(mapCongreso),
    formacion_continua: [
      ...asList(aportaciones.talleres),
      ...asList(aportaciones.seminarios),
      ...asList(aportaciones.capacitaciones),
    ].map(mapFormacionContinua),
    evaluaciones: [
      ...asList(aportaciones.dictaminacionesPublicacion),
      ...asList(aportaciones.dictaminacionesEspecializada),
      ...asList(aportaciones.evaluacionesProgramaProyecto),
      ...asList(aportaciones.jurados),
    ].map(mapEvaluacion),
    estancias: asList(aportaciones.colaboracionesInterinstitucional).map(mapEstancia),
    logros: trayectoria
      .filter((item) => item.descripcion)
      .map((item) => ({
        nombre: item.descripcion,
        institucion: item.institucion,
        año: yearOf(item.fecha_inicio),
        descripcion: item.puesto,
      })),
    proyectos_investigacion: asList(aportaciones.proyectosInvestigacion).map(mapProyecto),
    nombramientos: {
      vigente: nombramientoVigente.descripcion ? {
        puesto: nombramientoVigente.descripcion,
        entidad: nombramientoVigente.entidad,
        desde: nombramientoVigente.desde,
      } : {},
      anteriores: trayectoria
        .filter((item) => !item.es_actual)
        .map((item) => ({
          puesto: item.puesto,
          entidad: item.institucion,
          periodo: [item.fecha_inicio, item.fecha_fin].filter(Boolean).join(' – '),
        })),
    },
    lineas_investigacion: asList(principal.intereses).map((interes) => ({
      titulo: interes,
      descripcion: '',
    })),
    revistas: articulos
      .filter((item) => item.revista)
      .map((item) => ({
        titulo: item.revista,
        pais: '',
        año: String(item.año || ''),
      })),
    firmas: [],
    scopus_ids: [],
    orcid: principal.orcid || '',
    identificador_institucion: raw.identificadorInstitucion || null,
  };
}

export function normalizeProfile(raw) {
  if (Array.isArray(raw)) {
    return { publicaciones: raw, publicaciones_cientificas: raw };
  }
  if (isSecihtiPerfilCompleto(raw)) {
    return mapSecihtiToView(raw);
  }
  return raw && typeof raw === 'object' ? raw : {};
}
