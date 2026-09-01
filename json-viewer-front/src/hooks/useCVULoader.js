import { useState } from 'react';
import { normalizeProfile } from '../utils/normalizeCvu';

function readStoredProfile() {
  try {
    const saved = localStorage.getItem('cvuProfile');
    return saved ? normalizeProfile(JSON.parse(saved)) : null;
  } catch {
    return null;
  }
}

export default function useCVULoader() {
  const [perfil, setPerfil] = useState(readStoredProfile);
  const [archivo, setArchivo] = useState(null);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [mensaje, setMensaje] = useState('');

  const selectFile = file => {
    setError('');
    if (!file) return setArchivo(null);

    if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
      setError('Por favor, selecciona un archivo JSON válido');
      return setArchivo(null);
    }

    setArchivo(file);
  };

  const startLoad = async () => {
    if (!archivo) {
      setError('Por favor, selecciona un archivo primero');
      return false;
    }

    setCargando(true);
    setProgreso(0);
    setMensaje('Iniciando procesamiento...');

    try {
      const steps = [
        { progress: 30, message: 'Validando archivo...' },
        { progress: 60, message: 'Procesando datos...' },
        { progress: 90, message: 'Generando vista...' },
        { progress: 100, message: '¡Listo!' }
      ];

      for (const step of steps) {
        await new Promise(r => setTimeout(r, 150));
        setProgreso(step.progress);
        setMensaje(step.message);
      }

      const parsed = JSON.parse(await archivo.text());
      const normalized = normalizeProfile(parsed);
      localStorage.setItem('cvuProfile', JSON.stringify(parsed));
      setPerfil(normalized);
      return true;
    } catch (err) {
      setError('El archivo no contiene un JSON de CVU válido');
      return false;
    } finally {
      setCargando(false);
    }
  };

  const resetProfile = () => {
    setPerfil(null);
    setArchivo(null);
    setError('');
    setProgreso(0);
    setMensaje('');
    localStorage.removeItem('cvuProfile');
  };

  return {
    perfil,
    error,
    cargando,
    progreso,
    mensaje,
    archivo,
    selectFile,
    startLoad,
    resetProfile
  };
}
