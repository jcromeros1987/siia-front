// src/hooks/useCVULoader.js
import { useState } from 'react';

export default function useCVULoader(hardcodedJSON) {
  const [perfil, setPerfil] = useState(null);
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
      // Simulación más rápida del procesamiento
      const steps = [
        { progress: 30, message: 'Validando archivo...' },
        { progress: 60, message: 'Procesando datos...' },
        { progress: 90, message: 'Generando vista...' },
        { progress: 100, message: '¡Listo!' }
      ];

      for (const step of steps) {
        await new Promise(r => setTimeout(r, 500));
        setProgreso(step.progress);
        setMensaje(step.message);
      }

      // Guardar en localStorage
      localStorage.setItem('cvuProfile', JSON.stringify(hardcodedJSON));
      setPerfil(hardcodedJSON);
      return true;
      
    } catch (err) {
      setError('Error al procesar el archivo');
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