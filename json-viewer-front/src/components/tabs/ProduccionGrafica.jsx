import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, Line, ResponsiveContainer
} from 'recharts';
import { buildDocumentosIndexados, mapPublicacion } from '../../utils/perfilSiia';

export default function ProduccionGrafica({ perfil = {} }) {
  const publicaciones = (perfil.publicaciones || []).map(mapPublicacion);
  const dataGrafica = buildDocumentosIndexados(perfil);

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-blue-700 mb-2">Documentos indexados (WoS y Scopus)</h3>
        {dataGrafica.length > 0 ? (
          <div className="w-full h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataGrafica}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="año" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="wos" fill="#1d4ed8" name="WoS" />
                <Bar dataKey="scopus" fill="#3b82f6" name="Scopus" />
                <Line type="monotone" dataKey={(d) => d.wos + d.scopus} stroke="#06b6d4" name="Total" dot />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-sm text-gray-400">Sin documentos indexados para graficar</p>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-blue-700 mb-2">Lista de publicaciones</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border rounded-xl shadow">
            <thead className="bg-gray-100 text-slate-800">
              <tr>
                <th className="p-2">#</th>
                <th className="p-2 text-left">Título</th>
                <th className="p-2 text-left">Autores</th>
                <th className="p-2">Año</th>
                <th className="p-2">Revista</th>
                <th className="p-2 text-left">Fuente</th>
                <th className="p-2">WoS</th>
                <th className="p-2">Scopus</th>
              </tr>
            </thead>
            <tbody>
              {publicaciones.length > 0 ? publicaciones.map((pub, i) => (
                <tr key={i} className="border-t">
                  <td className="p-2 text-center">{i + 1}</td>
                  <td className="p-2">{pub.titulo}</td>
                  <td className="p-2">{pub.autores}</td>
                  <td className="p-2 text-center">{pub.año}</td>
                  <td className="p-2">{pub.revista}</td>
                  <td className="p-2 text-xs whitespace-pre-line">{pub.fuente}</td>
                  <td className="p-2 text-center">{pub.citas_wos}</td>
                  <td className="p-2 text-center">{pub.citas_scopus}</td>
                </tr>
              )) : (
                <tr>
                  <td className="p-4 text-center text-gray-400" colSpan={8}>
                    Sin publicaciones
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
