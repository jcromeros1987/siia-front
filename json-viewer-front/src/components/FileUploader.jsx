// src/components/FileUploader.jsx
import React from 'react';
import { DocumentArrowUpIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

export default function FileUploader({ archivo, error, onSelect, onStart, disabled }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center w-full">
        <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
          error ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
        }`}>
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <DocumentArrowUpIcon className={`w-8 h-8 mb-3 ${
              error ? 'text-red-400' : 'text-gray-400'
            }`} />
            <p className={`mb-2 text-sm ${
              error ? 'text-red-500' : 'text-[#082C3B]'
            }`}>
              <span className="font-semibold">Haz clic para subir</span> o arrastra tu archivo
            </p>
            <p className={`text-xs ${
              error ? 'text-red-400' : 'text-gray-400'
            }`}>Solo archivos JSON</p>
          </div>
          <input
            type="file"
            accept=".json,application/json"
            onChange={e => onSelect(e.target.files[0])}
            disabled={disabled}
            className="hidden"
          />
        </label>
      </div>

      {archivo && (
        <div className="flex items-center justify-between bg-blue-50 rounded-lg p-3">
          <div className="flex items-center space-x-2 truncate">
            <DocumentArrowUpIcon className="flex-shrink-0 h-5 w-5 text-blue-500" />
            <span className="text-sm font-medium text-blue-700 truncate">
              {archivo.name}
            </span>
          </div>
          <span className="text-xs text-blue-500">{(archivo.size / 1024).toFixed(1)} KB</span>
        </div>
      )}

      {error && (
        <div className="flex items-center bg-red-50 border-l-4 border-red-400 p-3 rounded">
          <ExclamationCircleIcon className="h-5 w-5 text-red-400" />
          <p className="ml-2 text-sm text-red-700">{error}</p>
        </div>
      )}

      <button
        onClick={onStart}
        disabled={disabled || !archivo}
        className={`w-full py-2 px-4 rounded-lg transition-colors flex items-center justify-center ${
          disabled || !archivo
            ? 'bg-gray-200 text-[#082C3B] cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {disabled ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Procesando...
          </>
        ) : (
          'Procesar archivo CVU'
        )}
      </button>
    </div>
  );
}