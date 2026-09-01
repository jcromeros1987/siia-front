import React, { useState } from 'react';
import useCVULoader from '../hooks/useCVULoader';
import FileUploader from './FileUploader';
import ProgressBar from './ProgressBar';
import ProfileView from './ProfileView/ProfileView';
import Notification from './Notification';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

export default function CVUUpload() {
  const {
    perfil,
    archivo,
    error,
    cargando,
    progreso,
    mensaje,
    selectFile,
    startLoad,
    resetProfile
  } = useCVULoader();

  const [notification, setNotification] = useState(null);

  const handleStartLoad = async () => {
    const success = await startLoad();
    if (success) {
      setNotification({
        type: 'success',
        message: 'Perfil cargado correctamente',
        duration: 3000
      });
    }
  };

  return (
    <div className="w-full max-w-9/10 mx-auto p-6">
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
          duration={notification.duration}
        />
      )}

      {perfil ? (
        <>
          <div className="flex justify-end mb-4">
            <button
              onClick={resetProfile}
              className="flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              <ArrowPathIcon className="h-4 w-4 mr-1" />
              Cargar nuevo CVU
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <ProfileView perfil={perfil} />
          </div>
        </>
      ) : (
        <>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <h2 className="text-2xl font-light text-[#192C38] mb-2">
              Cargar CVU Académico
            </h2>
            <p className="text-[#082C3B] mb-6">
              Sube el JSON de perfil completo de SECIHTI (por ejemplo <code>perfilCompleto_*.json</code>).
            </p>

            <FileUploader
              archivo={archivo}
              error={error}
              onSelect={selectFile}
              onStart={handleStartLoad}
              disabled={cargando}
            />
          </div>

          {cargando && <ProgressBar progreso={progreso} mensaje={mensaje} />}
        </>
      )}
    </div>
  );
}
