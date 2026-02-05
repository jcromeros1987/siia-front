import React from 'react';

// CoautoriasTab.jsx
export function CoautoriasTab() {
    return (
      <div>
        <h4 className="text-xs text-[#082C3B] mb-2">Entidades UNAM</h4>
        <ul className="space-y-2">
          {["Instituto de Investigaciones en Matemáticas Aplicadas y en Sistemas", 
            "Facultad de Ciencias", 
            "Facultad de Ingeniería"].map((entidad, index) => (
            <li 
              key={index} 
              className="text-sm text-slate-800 pb-2 border-b border-gray-100 last:border-b-0"
            >
              {entidad}
            </li>
          ))}
        </ul>
      </div>
    );
  }