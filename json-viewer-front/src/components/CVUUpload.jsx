// src/components/CVUUpload.jsx
import React, { useState, useEffect } from 'react';
import useCVULoader from '../hooks/useCVULoader';
import FileUploader from './FileUploader';
import ProgressBar from './ProgressBar';
import ProfileView from './ProfileView/ProfileView';
import Notification from './Notification';
import hardcodedJSON from './data/hardcodedJSON';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

export default function CVUUpload() {
  const [showProfile, setShowProfile] = useState(false);
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
  } = useCVULoader(hardcodedJSON);
  
  const [notification, setNotification] = useState(null);

  // Verificar localStorage al cargar
  useEffect(() => {
    const savedProfile = localStorage.getItem('cvuProfile');
    setShowProfile(!!savedProfile);
  }, []);

  const handleStartLoad = async () => {
    const success = await startLoad();
    if (success) {
      setNotification({
        type: 'success',
        message: 'Perfil cargado correctamente',
        duration: 3000
      });
      setShowProfile(true);
    }
  };

  const handleReset = () => {
    resetProfile();
    setShowProfile(false);
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

      {showProfile ? (
        <>
          <div className="flex justify-end mb-4">
            <button
              onClick={handleReset}
              className="flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              <ArrowPathIcon className="h-4 w-4 mr-1" />
              Cargar nuevo CVU
            </button>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <ProfileView perfil={perfil || JSON.parse(localStorage.getItem('cvuProfile'))} />
          </div>
        </>
      ) : (
        <>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <h2 className="text-2xl font-light text-[#192C38] mb-2">
              Cargar CVU Académico
            </h2>
            <p className="text-[#082C3B] mb-6">
              Sube tu archivo JSON para generar una vista previa de tu perfil académico
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