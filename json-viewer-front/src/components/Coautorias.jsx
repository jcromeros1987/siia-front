import React from 'react';

export default function Coautorias() {
    return (
      <div className="bg-white p-4 shadow rounded space-y-4">
        <h2 className="text-xl font-semibold text-blue-700">Coautorías y Publicaciones</h2>
  
        <div>
          <h3 className="font-semibold mb-1">Coautorías con entidades de la UNAM</h3>
          <ul className="list-disc list-inside text-sm">
            <li>Instituto de Geofísica</li>
            <li>Instituto de Geografía</li>
            <li>Instituto de Ciencias del Mar y Limnología</li>
            <li>Facultad de Ciencias</li>
            <li>Facultad de Ingeniería</li>
          </ul>
        </div>
  
        <div>
          <h3 className="font-semibold mb-1">Revistas en las que ha publicado (6):</h3>
          <ol className="list-decimal list-inside text-sm">
            <li>Indian Journal of Geo-Marine Sciences, India (2023)</li>
            <li>JOURNAL OF COASTAL CONSERVATION, Países Bajos (2020)</li>
            <li>JOURNAL OF ENVIRONMENTAL MANAGEMENT, Reino Unido (2021, 2022, 2023)</li>
            <li>JOURNAL OF VOLCANOLOGY AND GEOTHERMAL RESEARCH, Países Bajos (2010)</li>
            <li>Lecture Notes In Networks And Systems, Suiza (2024)</li>
            <li>REMOTE SENSING APPLICATIONS–SOCIETY AND ENVIRONMENT, Países Bajos (2024)</li>
          </ol>
        </div>
      </div>
    );
  }
  