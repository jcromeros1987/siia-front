import { useCallback, useState } from 'react';
import perfilDefault from '../data/perfilSiia.json';
import { normalizePerfilSiia } from '../utils/perfilSiia';

export default function useJsonProfile(defaultProfile = perfilDefault) {
  const [perfil, setPerfil] = useState(() => normalizePerfilSiia(defaultProfile));
  const [error, setError] = useState('');
  const [nombreArchivo, setNombreArchivo] = useState('');

  const loadFile = useCallback(async (file) => {
    setError('');
    if (!file) return false;

    const isJson = file.type === 'application/json' || file.name.toLowerCase().endsWith('.json');
    if (!isJson) {
      setError('Selecciona un archivo JSON válido');
      return false;
    }

    try {
      const parsed = JSON.parse(await file.text());
      setPerfil(normalizePerfilSiia(parsed));
      setNombreArchivo(file.name);
      return true;
    } catch {
      setError('El archivo no contiene JSON válido');
      return false;
    }
  }, []);

  const reset = useCallback(() => {
    setPerfil(normalizePerfilSiia(defaultProfile));
    setNombreArchivo('');
    setError('');
  }, [defaultProfile]);

  return { perfil, error, nombreArchivo, loadFile, reset };
}
