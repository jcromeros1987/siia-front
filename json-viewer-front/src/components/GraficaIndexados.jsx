import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line } from 'recharts';
import React from 'react';
import { buildDocumentosIndexados } from '../utils/perfilSiia';

export default function GraficaIndexados({ perfil = {} }) {
  const data = buildDocumentosIndexados(perfil);

  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="text-xl font-semibold text-blue-700 mb-4">Documentos indexados (WoS y Scopus)</h2>
      <div className="w-full h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="año" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="wos" fill="#1d4ed8" name="Documentos WoS" />
            <Bar dataKey="scopus" fill="#2563eb" name="Documentos Scopus" />
            <Line type="monotone" dataKey={(d) => d.wos + d.scopus} stroke="#06b6d4" name="Total" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
