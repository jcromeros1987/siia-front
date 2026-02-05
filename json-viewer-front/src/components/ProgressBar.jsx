// src/components/ProgressBar.jsx
import React from 'react';

export default function ProgressBar({ progreso, mensaje }) {
  const getProgressColor = (progress) => {
    if (progress < 30) return 'bg-blue-400';
    if (progress < 70) return 'bg-blue-500';
    return 'bg-blue-600';
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-slate-800">{mensaje}</span>
        <span className="text-sm font-medium text-blue-600">{progreso}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full transition-all duration-300 ease-out ${getProgressColor(progreso)}`}
          style={{ width: `${progreso}%` }}
        />
      </div>
    </div>
  );
}